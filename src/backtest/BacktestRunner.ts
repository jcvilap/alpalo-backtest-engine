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
import { Strategy } from '../lib/types';

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

/**
 * BacktestRunner - Orchestrates backtesting using the new architecture
 */
export class BacktestRunner {
    private dataFeed: DataFeed;
    private broker: Broker;
    private params: StrategyParams;
    private portfolioManager: PortfolioManager;
    private strategy?: Strategy;

    /**
     * Create a new BacktestRunner
     *
     * @param dataFeed - Data feed implementation
     * @param broker - Broker implementation
     * @param params - Strategy parameters
     * @param strategy - Optional custom strategy (if not provided, uses default StrategyController)
     */
    constructor(dataFeed: DataFeed, broker: Broker, params: StrategyParams, strategy?: Strategy) {
        this.dataFeed = dataFeed;
        this.broker = broker;
        this.params = params;
        this.strategy = strategy;
        this.portfolioManager = new PortfolioManager();
    }

    /**
     * Run the backtest
     *
     * @param config - Backtest configuration
     * @returns Backtest results with trades, equity curve, and metrics
     */
    async run(config: BacktestConfig): Promise<BacktestResult> {
        const trades: Trade[] = [];
        const equityCurve: { date: string; equity: number; benchmark: number; benchmarkTQQQ: number }[] = [];

        // Get available date range
        const { firstDate, lastDate } = this.dataFeed.getAvailableDateRange();

        // Fetch all data for the period
        const qqqData = await this.dataFeed.getHistoricalData('QQQ', firstDate, lastDate);
        const tqqqData = await this.dataFeed.getHistoricalData('TQQQ', firstDate, lastDate);

        console.log('[BACKTEST RUNNER] Setup:', {
            initialCapital: config.initialCapital,
            qqqDataLength: qqqData.length,
            dateRange: { first: firstDate, last: lastDate },
            displayFrom: config.displayFrom,
            warmupPeriod: this.params.maPeriods.long
        });

        // Setup benchmark tracking
        const initialBenchmarkPrice = qqqData[0]?.close || 1;
        const benchmarkShares = config.initialCapital / initialBenchmarkPrice;

        const tqqqMap = new Map(tqqqData.map(d => [d.date, d]));
        const initialTQQQPrice = tqqqMap.get(qqqData[0]?.date)?.close || 1;
        const benchmarkTQQQShares = config.initialCapital / initialTQQQPrice;

        let currentPosition: Trade | null = null;

        // Phase 1: Warmup (strategy in cash, track benchmarks only)
        for (let i = 0; i < this.params.maPeriods.long && i < qqqData.length; i++) {
            const date = qqqData[i].date;
            const tqqqCandle = tqqqMap.get(date);

            if (!tqqqCandle) continue;

            const benchmarkEquity = benchmarkShares * qqqData[i].close;
            const benchmarkTQQQEquity = benchmarkTQQQShares * tqqqCandle.close;

            const benchmarkPct = ((benchmarkEquity - config.initialCapital) / config.initialCapital) * 100;
            const benchmarkTQQQPct = ((benchmarkTQQQEquity - config.initialCapital) / config.initialCapital) * 100;

            // Strategy is in cash (0% return)
            equityCurve.push({ date, equity: 0, benchmark: benchmarkPct, benchmarkTQQQ: benchmarkTQQQPct });
        }

        // Phase 2: Trading
        for (let i = this.params.maPeriods.long; i < qqqData.length; i++) {
            const date = qqqData[i].date;

            // Get market snapshot
            const snapshot = await this.dataFeed.getSnapshotForDate(date);
            if (!snapshot) continue;

            // Update broker with current prices
            if (this.broker instanceof BacktestBroker) {
                this.broker.updatePrices(snapshot.prices);
            }

            // Get portfolio state
            const portfolio = await this.broker.getPortfolioState();

            // Run strategy engine - use custom strategy if provided, otherwise use default
            const decision = this.strategy
                ? this.strategy.analyze(snapshot.qqqHistory)
                : runStrategy(snapshot, portfolio, this.params);

            // Calculate orders using PortfolioManager
            const currentPos = portfolio.position;
            const orders = this.portfolioManager.calculateOrders(
                decision,
                currentPos,
                portfolio.totalEquity,
                snapshot.prices
            );

            // Execute orders and track trades
            if (orders.length > 0) {
                const results = await this.broker.placeOrders(orders);

                // Track trades (convert orders to trades)
                for (const result of results) {
                    if (result.success && result.order.side === 'SELL' && currentPosition) {
                        // Record completed trade
                        const trade: Trade = {
                            ...currentPosition,
                            exitDate: date,
                            exitPrice: result.fillPrice,
                            shares: result.filledShares,
                            pnl: (result.fillPrice - currentPosition.entryPrice) * result.filledShares,
                            returnPct: ((result.fillPrice - currentPosition.entryPrice) / currentPosition.entryPrice) * 100,
                            daysHeld: Math.round((toNYDate(date).getTime() - toNYDate(currentPosition.entryDate).getTime()) / (1000 * 60 * 60 * 24))
                        };
                        trade.portfolioReturnPct = (trade.returnPct! * (trade.positionSizePct || 0)) / 100;
                        trades.push(trade);

                        // Check if position is fully closed
                        const updatedPortfolio = await this.broker.getPortfolioState();
                        if (!updatedPortfolio.position || updatedPortfolio.position.shares === 0) {
                            currentPosition = null;
                        } else {
                            currentPosition.shares = updatedPortfolio.position.shares;
                        }
                    } else if (result.success && result.order.side === 'BUY') {
                        // Update or create current position
                        const updatedPortfolio = await this.broker.getPortfolioState();
                        if (updatedPortfolio.position) {
                            const cost = result.filledShares * result.fillPrice;
                            const newPosition: Trade = {
                                entryDate: currentPosition?.entryDate || date,
                                symbol: result.order.symbol,
                                side: 'LONG',
                                entryPrice: updatedPortfolio.position.avgEntryPrice,
                                shares: updatedPortfolio.position.shares,
                                positionSizePct: (cost / portfolio.totalEquity) * 100
                            };
                            currentPosition = newPosition;
                        }
                    }
                }
            }

            // Calculate equity for this period
            const updatedPortfolio = await this.broker.getPortfolioState();
            const benchmarkEquity = benchmarkShares * qqqData[i].close;
            const tqqqCandle = tqqqMap.get(date);
            const benchmarkTQQQEquity = tqqqCandle ? benchmarkTQQQShares * tqqqCandle.close : 0;

            const equityPct = ((updatedPortfolio.totalEquity - config.initialCapital) / config.initialCapital) * 100;
            const benchmarkPct = ((benchmarkEquity - config.initialCapital) / config.initialCapital) * 100;
            const benchmarkTQQQPct = ((benchmarkTQQQEquity - config.initialCapital) / config.initialCapital) * 100;

            equityCurve.push({ date, equity: equityPct, benchmark: benchmarkPct, benchmarkTQQQ: benchmarkTQQQPct });
        }

        // Close final position if any
        if (currentPosition) {
            const lastDate = qqqData[qqqData.length - 1].date;
            const snapshot = await this.dataFeed.getSnapshotForDate(lastDate);

            if (snapshot) {
                const exitPrice = snapshot.prices[currentPosition.symbol];

                const trade: Trade = {
                    ...currentPosition,
                    exitDate: lastDate,
                    exitPrice: exitPrice,
                    pnl: (exitPrice - currentPosition.entryPrice) * currentPosition.shares,
                    returnPct: ((exitPrice - currentPosition.entryPrice) / currentPosition.entryPrice) * 100,
                    daysHeld: Math.round((toNYDate(lastDate).getTime() - toNYDate(currentPosition.entryDate).getTime()) / (1000 * 60 * 60 * 24))
                };
                trade.portfolioReturnPct = (trade.returnPct! * (trade.positionSizePct || 0)) / 100;
                trades.push(trade);
            }
        }

        // Filter and rebase results if displayFrom is provided
        let finalTrades = trades;
        let finalEquityCurve = equityCurve;

        if (config.displayFrom) {
            const displayDate = toNYDate(config.displayFrom);

            // Filter trades
            finalTrades = trades.filter(t => {
                const exitDate = t.exitDate ? toNYDate(t.exitDate) : getNYNow();
                return exitDate >= displayDate;
            });

            // Filter and rebase equity curve
            const startIndex = equityCurve.findIndex(d => toNYDate(d.date) >= displayDate);

            if (startIndex !== -1) {
                const basePoint = equityCurve[startIndex];

                const baseEquityMult = 1 + (basePoint.equity / 100);
                const baseBenchmarkMult = 1 + (basePoint.benchmark / 100);
                const baseTQQQMult = 1 + (basePoint.benchmarkTQQQ / 100);

                finalEquityCurve = equityCurve.slice(startIndex).map(d => {
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

                if (finalEquityCurve.length > 0 && finalEquityCurve[0].date > config.displayFrom) {
                    finalEquityCurve.unshift({
                        date: config.displayFrom,
                        equity: 0,
                        benchmark: 0,
                        benchmarkTQQQ: 0
                    });
                }
            } else {
                finalEquityCurve = [];
            }
        }

        return {
            trades: finalTrades,
            equityCurve: finalEquityCurve,
            metrics: this.calculateMetrics(finalEquityCurve, finalTrades)
        };
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
