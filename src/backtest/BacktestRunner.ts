/**
 * BacktestRunner Orchestration Layer
 *
 * Orchestrates backtesting by coordinating the strategy engine, data feed, and broker.
 * This replaces the monolithic BacktestEngine with a clean separation of concerns.
 *
 * The runner:
 * 1. Iterates through the backtest period
 * 2. Fetches market snapshots from the data feed
 * 3. Gets portfolio state from the broker
 * 4. Calls the strategy engine to get decisions
 * 5. Converts decisions to orders using PortfolioManager
 * 6. Executes orders via the broker
 * 7. Tracks equity curve and trades
 */

import { DataFeed } from '../ports/DataFeed';
import { Broker } from '../ports/Broker';
import { runStrategy } from '../strategy/engine';
import { StrategyParams } from '../strategy/types';
import { PortfolioManager } from '../lib/trade/PortfolioManager';
import { BacktestResult, Trade } from '../lib/backtest/backtestEngine';
import { toNYDate, getNYNow } from '../lib/utils/dateUtils';
import { BacktestBroker } from './BacktestBroker';

/**
 * Backtest configuration
 */
export interface BacktestConfig {
    /** Start date for trading (after warmup) */
    startDate: string;

    /** End date for trading */
    endDate: string;

    /** Initial capital */
    initialCapital: number;

    /** Display start date (for filtering results) */
    displayFrom?: string;
}

export interface StrategyRunConfig {
    name: string;
    broker: Broker;
    params: StrategyParams;
    strategyFunction?: (snapshot: MarketSnapshot, portfolio: PortfolioState, params: StrategyParams) => StrategyDecision;
}

import { MarketSnapshot, PortfolioState, StrategyDecision } from '../strategy/types';

/**
 * BacktestRunner - Orchestrates backtesting using the new architecture
 */
export class BacktestRunner {
    private dataFeed: DataFeed;
    private broker: Broker;
    private params: StrategyParams;
    private portfolioManager: PortfolioManager;
    private strategyFunction: (snapshot: MarketSnapshot, portfolio: PortfolioState, params: StrategyParams) => StrategyDecision;

    /**
     * Create a new BacktestRunner
     *
     * @param dataFeed - Data feed implementation
     * @param broker - Broker implementation
     * @param params - Strategy parameters
     * @param strategyFunction - Strategy function to execute (defaults to current strategy if not provided)
     */
    constructor(
        dataFeed: DataFeed,
        broker: Broker,
        params: StrategyParams,
        strategyFunction?: (snapshot: MarketSnapshot, portfolio: PortfolioState, params: StrategyParams) => StrategyDecision
    ) {
        this.dataFeed = dataFeed;
        this.broker = broker;
        this.params = params;
        this.portfolioManager = new PortfolioManager();
        // Default to the imported runStrategy for backward compatibility, 
        // but allow injection for multi-strategy support
        this.strategyFunction = strategyFunction || runStrategy;
    }

    /**
     * Run the backtest
     *
     * @param config - Backtest configuration
     * @returns Backtest results with trades, equity curve, and metrics
     */
    async run(config: BacktestConfig): Promise<BacktestResult> {
        const results = await this.runMultiple(config, [{
            name: 'default',
            broker: this.broker,
            params: this.params,
            strategyFunction: this.strategyFunction
        }]);

        return results['default'];
    }

    async runMultiple(config: BacktestConfig, strategies: StrategyRunConfig[]): Promise<Record<string, BacktestResult>> {
        if (strategies.length === 0) {
            return {};
        }

        const { firstDate, lastDate } = this.dataFeed.getAvailableDateRange();

        const qqqData = await this.dataFeed.getHistoricalData('QQQ', firstDate, lastDate);
        const tqqqData = await this.dataFeed.getHistoricalData('TQQQ', firstDate, lastDate);

        const initialBenchmarkPrice = qqqData[0]?.close || 1;
        const benchmarkShares = config.initialCapital / initialBenchmarkPrice;

        const tqqqMap = new Map(tqqqData.map(d => [d.date, d]));
        const initialTQQQPrice = tqqqMap.get(qqqData[0]?.date)?.close || 1;
        const benchmarkTQQQShares = config.initialCapital / initialTQQQPrice;

        const contexts = strategies.map(strategy => ({
            name: strategy.name,
            broker: strategy.broker,
            params: strategy.params,
            strategyFunction: strategy.strategyFunction || runStrategy,
            portfolioManager: new PortfolioManager(),
            trades: [] as Trade[],
            equityCurve: [] as { date: string; equity: number; benchmark: number; benchmarkTQQQ: number }[],
            currentPosition: null as Trade | null
        }));

        const warmupPeriod = Math.max(...contexts.map(c => c.params.maPeriods.long));

        for (let i = 0; i < warmupPeriod && i < qqqData.length; i++) {
            const date = qqqData[i].date;
            const tqqqCandle = tqqqMap.get(date);

            if (!tqqqCandle) continue;

            const benchmarkEquity = benchmarkShares * qqqData[i].close;
            const benchmarkTQQQEquity = benchmarkTQQQShares * tqqqCandle.close;

            const benchmarkPct = ((benchmarkEquity - config.initialCapital) / config.initialCapital) * 100;
            const benchmarkTQQQPct = ((benchmarkTQQQEquity - config.initialCapital) / config.initialCapital) * 100;

            for (const context of contexts) {
                context.equityCurve.push({ date, equity: 0, benchmark: benchmarkPct, benchmarkTQQQ: benchmarkTQQQPct });
            }
        }

        for (let i = warmupPeriod; i < qqqData.length; i++) {
            const date = qqqData[i].date;

            const snapshot = await this.dataFeed.getSnapshotForDate(date);
            if (!snapshot) continue;

            const benchmarkEquity = benchmarkShares * qqqData[i].close;
            const tqqqCandle = tqqqMap.get(date);
            const benchmarkTQQQEquity = tqqqCandle ? benchmarkTQQQShares * tqqqCandle.close : 0;

            const benchmarkPct = ((benchmarkEquity - config.initialCapital) / config.initialCapital) * 100;
            const benchmarkTQQQPct = ((benchmarkTQQQEquity - config.initialCapital) / config.initialCapital) * 100;

            for (const context of contexts) {
                const broker = context.broker;

                if (broker instanceof BacktestBroker) {
                    broker.updatePrices(snapshot.prices);
                }

                const portfolio = await broker.getPortfolioState();
                const decision = context.strategyFunction(snapshot, portfolio, context.params);

                const orders = context.portfolioManager.calculateOrders(
                    decision,
                    portfolio.position,
                    portfolio.totalEquity,
                    snapshot.prices
                );

                if (orders.length > 0) {
                    const results = await broker.placeOrders(orders);

                    for (const result of results) {
                        if (result.success && result.order.side === 'SELL' && context.currentPosition) {
                            const trade: Trade = {
                                ...context.currentPosition,
                                exitDate: date,
                                exitPrice: result.fillPrice,
                                shares: result.filledShares,
                                pnl: (result.fillPrice - context.currentPosition.entryPrice) * result.filledShares,
                                returnPct: ((result.fillPrice - context.currentPosition.entryPrice) / context.currentPosition.entryPrice) * 100,
                                daysHeld: Math.round((toNYDate(date).getTime() - toNYDate(context.currentPosition.entryDate).getTime()) / (1000 * 60 * 60 * 24))
                            };
                            trade.portfolioReturnPct = (trade.returnPct! * (trade.positionSizePct || 0)) / 100;
                            context.trades.push(trade);

                            const updatedPortfolio = await broker.getPortfolioState();
                            if (!updatedPortfolio.position || updatedPortfolio.position.shares === 0) {
                                context.currentPosition = null;
                            } else {
                                context.currentPosition.shares = updatedPortfolio.position.shares;
                            }
                        } else if (result.success && result.order.side === 'BUY') {
                            const updatedPortfolio = await broker.getPortfolioState();
                            if (updatedPortfolio.position) {
                                const cost = result.filledShares * result.fillPrice;
                                const newPosition: Trade = {
                                    entryDate: context.currentPosition?.entryDate || date,
                                    symbol: result.order.symbol,
                                    side: 'LONG',
                                    entryPrice: updatedPortfolio.position.avgEntryPrice,
                                    shares: updatedPortfolio.position.shares,
                                    positionSizePct: (cost / portfolio.totalEquity) * 100
                                };
                                context.currentPosition = newPosition;
                            }
                        }
                    }
                }

                const updatedPortfolio = await broker.getPortfolioState();
                const equityPct = ((updatedPortfolio.totalEquity - config.initialCapital) / config.initialCapital) * 100;

                context.equityCurve.push({
                    date,
                    equity: equityPct,
                    benchmark: benchmarkPct,
                    benchmarkTQQQ: benchmarkTQQQPct
                });
            }
        }

        const results: Record<string, BacktestResult> = {};

        for (const context of contexts) {
            if (context.currentPosition) {
                const lastDate = qqqData[qqqData.length - 1].date;
                const snapshot = await this.dataFeed.getSnapshotForDate(lastDate);

                if (snapshot) {
                    const exitPrice = snapshot.prices[context.currentPosition.symbol];

                    const trade: Trade = {
                        ...context.currentPosition,
                        exitDate: lastDate,
                        exitPrice: exitPrice,
                        pnl: (exitPrice - context.currentPosition.entryPrice) * context.currentPosition.shares,
                        returnPct: ((exitPrice - context.currentPosition.entryPrice) / context.currentPosition.entryPrice) * 100,
                        daysHeld: Math.round((toNYDate(lastDate).getTime() - toNYDate(context.currentPosition.entryDate).getTime()) / (1000 * 60 * 60 * 24))
                    };
                    trade.portfolioReturnPct = (trade.returnPct! * (trade.positionSizePct || 0)) / 100;
                    context.trades.push(trade);
                }
            }

            const { finalEquityCurve, finalTrades } = this.applyDisplayFrom(context.equityCurve, context.trades, config);

            results[context.name] = {
                trades: finalTrades,
                equityCurve: finalEquityCurve,
                metrics: this.calculateMetrics(finalEquityCurve, finalTrades)
            };
        }

        return results;
    }

    private applyDisplayFrom(
        equityCurve: { date: string; equity: number; benchmark: number; benchmarkTQQQ: number }[],
        trades: Trade[],
        config: BacktestConfig
    ) {
        if (!config.displayFrom) {
            return { finalEquityCurve: equityCurve, finalTrades: trades };
        }

        const displayDate = toNYDate(config.displayFrom);

        const filteredTrades = trades.filter(t => {
            const exitDate = t.exitDate ? toNYDate(t.exitDate) : getNYNow();
            return exitDate >= displayDate;
        });

        const startIndex = equityCurve.findIndex(d => toNYDate(d.date) >= displayDate);

        if (startIndex === -1) {
            return { finalEquityCurve: [], finalTrades: filteredTrades };
        }

        const basePoint = equityCurve[startIndex];

        const baseEquityMult = 1 + (basePoint.equity / 100);
        const baseBenchmarkMult = 1 + (basePoint.benchmark / 100);
        const baseTQQQMult = 1 + (basePoint.benchmarkTQQQ / 100);

        const rebasedEquity = equityCurve.slice(startIndex).map(d => {
            const currentEquityMult = 1 + (d.equity / 100);
            const currentBenchmarkMult = 1 + (d.benchmark / 100);
            const currentTQQQMult = 1 + (d.benchmarkTQQQ / 100);

            return {
                date: d.date,
                equity: ((currentEquityMult / baseEquityMult) - 1) * 100,
                benchmark: ((currentBenchmarkMult / baseBenchmarkMult) - 1) * 100,
                benchmarkTQQQ: ((currentTQQQMult / baseTQQQMult) - 1) * 100
            };
        });

        if (rebasedEquity.length > 0 && rebasedEquity[0].date > config.displayFrom) {
            rebasedEquity.unshift({
                date: config.displayFrom,
                equity: 0,
                benchmark: 0,
                benchmarkTQQQ: 0
            });
        }

        return { finalEquityCurve: rebasedEquity, finalTrades: filteredTrades };
    }

    /**
     * Calculate performance metrics
     */
    private calculateMetrics(
        equityCurve: { date: string; equity: number; benchmark: number; benchmarkTQQQ: number }[],
        trades: Trade[]
    ) {
        if (equityCurve.length === 0) {
            const empty = { totalReturn: 0, cagr: 0, maxDrawdown: 0, sharpeRatio: 0 };
            return {
                ...empty,
                avgTrades: { daily: 0, monthly: 0, annually: 0 },
                winRate: { wins: 0, losses: 0, winPct: 0 },
                avgPositionSize: 0,
                benchmark: empty,
                benchmarkTQQQ: empty
            };
        }

        const strategyMetrics = this.getMetrics(equityCurve.map(d => ({ date: d.date, value: d.equity })));
        const benchmarkMetrics = this.getMetrics(equityCurve.map(d => ({ date: d.date, value: d.benchmark })));
        const benchmarkTQQQMetrics = this.getMetrics(equityCurve.map(d => ({ date: d.date, value: d.benchmarkTQQQ })));

        const totalDays = equityCurve.length;
        const years = totalDays / 252;
        const months = years * 12;

        const avgTrades = {
            daily: totalDays > 0 ? trades.length / totalDays : 0,
            monthly: months > 0 ? trades.length / months : 0,
            annually: years > 0 ? trades.length / years : 0
        };

        const wins = trades.filter(t => (t.returnPct || 0) > 0).length;
        const losses = trades.filter(t => (t.returnPct || 0) < 0).length;
        const winRate = {
            wins,
            losses,
            winPct: trades.length > 0 ? (wins / trades.length) * 100 : 0
        };

        const avgPositionSize = trades.length > 0
            ? trades.reduce((sum, t) => sum + (t.positionSizePct || 0), 0) / trades.length
            : 0;

        return {
            ...strategyMetrics,
            avgTrades,
            winRate,
            avgPositionSize,
            benchmark: benchmarkMetrics,
            benchmarkTQQQ: benchmarkTQQQMetrics
        };
    }

    /**
     * Calculate metrics for a single series
     */
    private getMetrics(data: { date: string; value: number }[]) {
        if (data.length === 0) return { totalReturn: 0, cagr: 0, maxDrawdown: 0, sharpeRatio: 0 };

        const startVal = 1 + (data[0].value / 100);
        const endVal = 1 + (data[data.length - 1].value / 100);

        const totalReturn = (endVal - startVal) / startVal;

        const years = data.length / 252;
        const cagr = years > 0 ? Math.pow(endVal / startVal, 1 / years) - 1 : 0;

        let maxPeak = -Infinity;
        let maxDd = 0;

        for (const point of data) {
            const currentEquity = 100 * (1 + point.value / 100);
            if (currentEquity > maxPeak) maxPeak = currentEquity;
            const dd = (maxPeak - currentEquity) / maxPeak;
            if (dd > maxDd) maxDd = dd;
        }

        return {
            totalReturn: totalReturn * 100,
            cagr: cagr * 100,
            maxDrawdown: maxDd * 100,
            sharpeRatio: 0
        };
    }
}
