import { StrategyController } from '../strategy/strategyController';
import { OHLC } from '../types';
import { toNYDate, getNYNow } from '../utils/dateUtils';
import { PortfolioManager } from '../trade/PortfolioManager';
import { Position, Order } from '../trade/types';

export interface Trade {
    entryDate: string;
    exitDate?: string;
    symbol: string;
    side: 'LONG' | 'SHORT';
    entryPrice: number;
    exitPrice?: number;
    shares: number;
    pnl?: number;
    returnPct?: number;
    daysHeld?: number;
    positionSizePct?: number; // Percentage of portfolio allocated to this trade
    portfolioReturnPct?: number; // Return contribution to the entire portfolio
}

export interface BacktestResult {
    trades: Trade[];
    equityCurve: { date: string; equity: number; benchmark: number; benchmarkTQQQ: number }[];
    metrics: {
        totalReturn: number;
        cagr: number;
        maxDrawdown: number;
        sharpeRatio: number;
        avgTrades: {
            daily: number;
            monthly: number;
            annually: number;
        };
        winRate: {
            wins: number;
            losses: number;
            winPct: number;
        };
        avgPositionSize: number; // Average % of portfolio per trade
        benchmark: {
            totalReturn: number;
            cagr: number;
            maxDrawdown: number;
            sharpeRatio: number;
        };
        benchmarkTQQQ: {
            totalReturn: number;
            cagr: number;
            maxDrawdown: number;
            sharpeRatio: number;
        };
    };
}

export class BacktestEngine {
    private strategyController: StrategyController;
    private portfolioManager: PortfolioManager;
    private initialCapital: number;

    constructor(initialCapital: number = 1_000_000) {
        this.strategyController = new StrategyController();
        this.portfolioManager = new PortfolioManager();
        this.initialCapital = initialCapital;
    }

    run(qqqData: OHLC[], tqqqData: OHLC[], sqqqData: OHLC[], displayFrom?: string): BacktestResult {
        let cash = this.initialCapital;
        let currentPosition: Trade | null = null;
        const trades: Trade[] = [];
        const equityCurve: { date: string; equity: number; benchmark: number; benchmarkTQQQ: number }[] = [];

        // Benchmark tracking (NDX)
        const initialBenchmarkPrice = qqqData[0]?.close || 1;
        const benchmarkShares = this.initialCapital / initialBenchmarkPrice;

        // Benchmark tracking (TQQQ)
        // We need to align TQQQ data with NDX data dates
        const tqqqMap = new Map(tqqqData.map(d => [d.date, d]));
        const sqqqMap = new Map(sqqqData.map(d => [d.date, d]));

        const initialTQQQPrice = tqqqMap.get(qqqData[0]?.date)?.close || 1;
        const benchmarkTQQQShares = this.initialCapital / initialTQQQPrice;

        console.log('[BACKTEST ENGINE] Setup:', {
            initialCapital: this.initialCapital,
            qqqDataLength: qqqData.length,
            tqqqMapSize: tqqqMap.size,
            sqqqMapSize: sqqqMap.size,
            qqqDateRange: qqqData.length > 0 ? { first: qqqData[0].date, last: qqqData[qqqData.length - 1].date } : null,
            displayFrom,
            warmupPeriod: 200,
            tradingStartDate: qqqData.length > 200 ? qqqData[200].date : null
        });

        // Iterate over NDX data (the driver)
        // 1. Warmup Phase (Strategy in Cash, Benchmark tracking)
        for (let i = 0; i < 200; i++) {
            if (!qqqData[i]) continue;

            const date = qqqData[i].date;
            const tqqqCandle = tqqqMap.get(date);

            if (!tqqqCandle) continue;

            const benchmarkEquity = benchmarkShares * qqqData[i].close;
            const benchmarkTQQQEquity = benchmarkTQQQShares * tqqqCandle.close;

            const benchmarkPct = ((benchmarkEquity - this.initialCapital) / this.initialCapital) * 100;
            const benchmarkTQQQPct = ((benchmarkTQQQEquity - this.initialCapital) / this.initialCapital) * 100;

            // Strategy is in Cash (0% return)
            equityCurve.push({ date, equity: 0, benchmark: benchmarkPct, benchmarkTQQQ: benchmarkTQQQPct });
        }

        // 2. Trading Phase
        for (let i = 200; i < qqqData.length; i++) {
            const date = qqqData[i].date;
            const qqqSlice = qqqData.slice(0, i + 1);

            // Get current prices for tradeable assets
            const tqqqCandle = tqqqMap.get(date);
            const sqqqCandle = sqqqMap.get(date);

            if (!tqqqCandle || !sqqqCandle) continue; // Skip if missing data

            const signal = this.strategyController.analyze(qqqSlice);

            // Calculate current equity before acting
            const currentPrice = currentPosition
                ? (currentPosition.symbol === 'TQQQ' ? tqqqCandle.close : sqqqCandle.close)
                : 0;
            let positionValue: number = currentPosition ? currentPosition.shares * currentPrice : 0;
            let totalEquity = cash + positionValue;

            // Prepare inputs for PortfolioManager
            const currentPos: Position | null = currentPosition ? {
                symbol: currentPosition.symbol,
                shares: currentPosition.shares,
                avgEntryPrice: currentPosition.entryPrice
            } : null;

            const prices: Record<string, number> = {
                'TQQQ': tqqqCandle.close,
                'SQQQ': sqqqCandle.close
            };

            // Get Orders
            const orders = this.portfolioManager.calculateOrders(signal, currentPos, totalEquity, prices);

            // Execute Orders
            for (const order of orders) {
                const price = prices[order.symbol];

                if (order.side === 'BUY') {
                    const cost = order.shares * price;
                    if (cash >= cost) { // Basic check
                        cash -= cost;

                        if (currentPosition && currentPosition.symbol === order.symbol) {
                            // Add to existing
                            const totalShares = currentPosition.shares + order.shares;
                            const avgPrice = ((currentPosition.shares * currentPosition.entryPrice) + (order.shares * price)) / totalShares;
                            currentPosition.shares = totalShares;
                            currentPosition.entryPrice = avgPrice;
                        } else {
                            // New position
                            currentPosition = {
                                entryDate: date,
                                symbol: order.symbol,
                                side: 'LONG',
                                entryPrice: price,
                                shares: order.shares,
                                positionSizePct: (cost / totalEquity) * 100 // Estimate
                            };
                        }
                    }
                } else if (order.side === 'SELL') {
                    if (currentPosition && currentPosition.symbol === order.symbol) {
                        const sellShares = Math.min(order.shares, currentPosition.shares);
                        const proceeds = sellShares * price;
                        cash += proceeds;

                        // Record Trade
                        const trade: Trade = {
                            ...currentPosition,
                            exitDate: date,
                            exitPrice: price,
                            shares: sellShares,
                            pnl: (price - currentPosition.entryPrice) * sellShares,
                            returnPct: ((price - currentPosition.entryPrice) / currentPosition.entryPrice) * 100,
                            // Recalculate days held
                            daysHeld: Math.round((toNYDate(date).getTime() - toNYDate(currentPosition.entryDate).getTime()) / (1000 * 60 * 60 * 24))
                        };
                        trade.portfolioReturnPct = (trade.returnPct! * (trade.positionSizePct || 0)) / 100; // Approx
                        trades.push(trade);

                        // Update remaining position
                        currentPosition.shares -= sellShares;
                        if (currentPosition.shares <= 0) {
                            currentPosition = null;
                        }
                    }
                }
            }

            // Recalculate Equity after trades
            if (currentPosition) {
                const updatedPrice = currentPosition.symbol === 'TQQQ' ? tqqqCandle.close : sqqqCandle.close;
                positionValue = currentPosition.shares * updatedPrice;
            } else {
                positionValue = 0;
            }
            const totalEquityAfterTrades = cash + positionValue;

            // Benchmark Equity (NDX)
            const benchmarkEquity = benchmarkShares * qqqData[i].close;

            // Benchmark Equity (TQQQ)
            const benchmarkTQQQEquity = benchmarkTQQQShares * tqqqCandle.close;

            // Normalize to Percentage Change
            const equityPct = ((totalEquityAfterTrades - this.initialCapital) / this.initialCapital) * 100;
            const benchmarkPct = ((benchmarkEquity - this.initialCapital) / this.initialCapital) * 100;
            const benchmarkTQQQPct = ((benchmarkTQQQEquity - this.initialCapital) / this.initialCapital) * 100;

            equityCurve.push({ date, equity: equityPct, benchmark: benchmarkPct, benchmarkTQQQ: benchmarkTQQQPct });
        }

        // Close final position
        if (currentPosition) {
            const lastDate = qqqData[qqqData.length - 1].date;
            const tqqqLast = tqqqMap.get(lastDate);
            const sqqqLast = sqqqMap.get(lastDate);

            if (tqqqLast && sqqqLast) {
                const exitPrice = currentPosition.symbol === 'TQQQ' ? tqqqLast.close : sqqqLast.close;

                // Manually close for final reporting
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

                cash += currentPosition.shares * exitPrice;
                currentPosition = null;
            }
        }

        // Filter and Re-base results if displayFrom is provided
        let finalTrades = trades;
        let finalEquityCurve = equityCurve;

        console.log('[BACKTEST ENGINE] Before displayFrom filter:', {
            totalTrades: trades.length,
            equityCurveLength: equityCurve.length,
            displayFrom
        });

        if (displayFrom) {
            const displayDate = toNYDate(displayFrom);

            // Filter trades that exited after the display date
            finalTrades = trades.filter(t => {
                const exitDate = t.exitDate ? toNYDate(t.exitDate) : getNYNow();
                return exitDate >= displayDate;
            });

            // Filter equity curve
            const startIndex = equityCurve.findIndex(d => toNYDate(d.date) >= displayDate);

            if (startIndex !== -1) {
                const basePoint = equityCurve[startIndex];

                // Calculate re-basing factors (convert percentages back to multipliers)
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

                if (finalEquityCurve.length > 0 && finalEquityCurve[0].date > displayFrom) {
                    finalEquityCurve.unshift({
                        date: displayFrom,
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

    private calculateMetrics(equityCurve: { date: string; equity: number; benchmark: number; benchmarkTQQQ: number }[], trades: Trade[]) {
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

        // Calculate win/loss stats
        const wins = trades.filter(t => (t.returnPct || 0) > 0).length;
        const losses = trades.filter(t => (t.returnPct || 0) < 0).length;
        const winRate = {
            wins,
            losses,
            winPct: trades.length > 0 ? (wins / trades.length) * 100 : 0
        };

        // Calculate average position size
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

    private getMetrics(data: { date: string; value: number }[]) {
        if (data.length === 0) return { totalReturn: 0, cagr: 0, maxDrawdown: 0, sharpeRatio: 0 };

        // Data is in percentage change (e.g., 0, 5.5, -2.1)
        // Convert back to absolute multiplier for CAGR calculation
        const startVal = 1 + (data[0].value / 100);
        const endVal = 1 + (data[data.length - 1].value / 100);

        const totalReturn = (endVal - startVal) / startVal;

        const years = data.length / 252;
        const cagr = years > 0 ? Math.pow(endVal / startVal, 1 / years) - 1 : 0;

        let maxPeak = -Infinity;
        let maxDd = 0;

        // Drawdown calculation
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
