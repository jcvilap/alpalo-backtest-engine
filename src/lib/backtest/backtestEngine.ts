import { StrategyController } from '../strategy/strategyController';
import { OHLC } from '../types';
import { toNYDate, getNYNow } from '../utils/dateUtils';

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
    private initialCapital: number;

    constructor(initialCapital: number = 10000) {
        this.strategyController = new StrategyController();
        this.initialCapital = initialCapital;
    }

    run(qqqData: OHLC[], tqqqData: OHLC[], sqqqData: OHLC[], displayFrom?: string): BacktestResult {
        let cash = this.initialCapital;
        let shares = 0;
        let currentPosition: Trade | null = null;
        const trades: Trade[] = [];
        const equityCurve: { date: string; equity: number; benchmark: number; benchmarkTQQQ: number }[] = [];

        const displayDate = displayFrom ? toNYDate(displayFrom) : undefined;

        // Determine the first index we should start tracking equity from. We always allow the
        // strategy to "warm up" on at least 250 days of data for indicator calculations.
        const warmupStart = 250;
        const displayStartIndex = displayDate
            ? Math.max(warmupStart, qqqData.findIndex(d => toNYDate(d.date) >= displayDate))
            : warmupStart;

        const startIndex = displayStartIndex === -1 ? warmupStart : displayStartIndex;
        const startDate = qqqData[startIndex]?.date;

        // Benchmark tracking (NDX)
        const initialBenchmarkPrice = startDate ? qqqData[startIndex].close : qqqData[0]?.close || 1;
        const benchmarkShares = this.initialCapital / initialBenchmarkPrice;

        // Benchmark tracking (TQQQ)
        // We need to align TQQQ data with NDX data dates
        const tqqqMap = new Map(tqqqData.map(d => [d.date, d]));
        const sqqqMap = new Map(sqqqData.map(d => [d.date, d]));

        const initialTQQQPrice = startDate ? (tqqqMap.get(startDate)?.close || 1) : tqqqMap.get(qqqData[0]?.date)?.close || 1;
        const benchmarkTQQQShares = this.initialCapital / initialTQQQPrice;


        // Iterate over NDX data (the driver)
        for (let i = startIndex; i < qqqData.length; i++) {
            const date = qqqData[i].date;
            const qqqSlice = qqqData.slice(0, i + 1);

            // Get current prices for tradeable assets
            const tqqqCandle = tqqqMap.get(date);
            const sqqqCandle = sqqqMap.get(date);

            if (!tqqqCandle || !sqqqCandle) continue; // Skip if missing data

            const signal = this.strategyController.analyze(qqqSlice);

            // Execute Signal
            if (signal.action === 'BUY') {
                const targetSymbol = signal.symbol; // TQQQ or SQQQ
                const targetPrice = targetSymbol === 'TQQQ' ? tqqqCandle.close : sqqqCandle.close;

                if (currentPosition && currentPosition.symbol !== targetSymbol) {
                    // Close current
                    const exitPrice = currentPosition.symbol === 'TQQQ' ? tqqqCandle.close : sqqqCandle.close;

                    currentPosition.exitDate = date;
                    currentPosition.exitPrice = exitPrice;
                    currentPosition.pnl = (currentPosition.exitPrice - currentPosition.entryPrice) * currentPosition.shares;
                    currentPosition.returnPct = ((currentPosition.exitPrice - currentPosition.entryPrice) / currentPosition.entryPrice) * 100;
                    currentPosition.portfolioReturnPct = (currentPosition.returnPct * (currentPosition.positionSizePct || 0)) / 100;

                    const entryTime = toNYDate(currentPosition.entryDate).getTime();
                    const exitTime = toNYDate(date).getTime();
                    currentPosition.daysHeld = Math.round((exitTime - entryTime) / (1000 * 60 * 60 * 24));

                    cash += currentPosition.exitPrice * currentPosition.shares;
                    trades.push(currentPosition);
                    currentPosition = null;
                    shares = 0;
                }

                if (!currentPosition) {
                    // Open new position
                    const totalEquityAtEntry = cash;
                    const amountToInvest = cash;
                    shares = Math.floor(amountToInvest / targetPrice);
                    const actualInvestment = shares * targetPrice;
                    cash -= actualInvestment;

                    // Calculate position size percentage
                    let positionSizePct = 100; // Default to 100%
                    if (totalEquityAtEntry > 0 && actualInvestment > 0) {
                        positionSizePct = (actualInvestment / totalEquityAtEntry) * 100;
                    }

                    currentPosition = {
                        entryDate: date,
                        symbol: targetSymbol,
                        side: 'LONG',
                        entryPrice: targetPrice,
                        shares: shares,
                        positionSizePct: positionSizePct
                    };
                }
            }

            // Calculate Equity
            let positionValue = 0;
            if (currentPosition) {
                const currentPrice = currentPosition.symbol === 'TQQQ' ? tqqqCandle.close : sqqqCandle.close;
                positionValue = currentPosition.shares * currentPrice;
            }
            const totalEquity = cash + positionValue;

            // Benchmark Equity (NDX)
            const benchmarkEquity = benchmarkShares * qqqData[i].close;

            // Benchmark Equity (TQQQ)
            const benchmarkTQQQEquity = benchmarkTQQQShares * tqqqCandle.close;

            // Normalize to Percentage Change
            const equityPct = ((totalEquity - this.initialCapital) / this.initialCapital) * 100;
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

                currentPosition.exitDate = lastDate;
                currentPosition.exitPrice = exitPrice;
                currentPosition.pnl = (currentPosition.exitPrice - currentPosition.entryPrice) * currentPosition.shares;
                currentPosition.returnPct = ((currentPosition.exitPrice - currentPosition.entryPrice) / currentPosition.entryPrice) * 100;
                currentPosition.portfolioReturnPct = (currentPosition.returnPct * (currentPosition.positionSizePct || 0)) / 100;

                const entryTime = toNYDate(currentPosition.entryDate).getTime();
                const exitTime = toNYDate(lastDate).getTime();
                currentPosition.daysHeld = Math.round((exitTime - entryTime) / (1000 * 60 * 60 * 24));

                trades.push(currentPosition);
            }
        }

        // Filter and Re-base results if displayFrom is provided
        let finalTrades = trades;
        let finalEquityCurve = equityCurve;

        if (displayFrom && displayDate) {
            // Filter trades to only include those that were ENTERED after the display date
            // Using exitDate here caused long-held trades that started years earlier to
            // bleed into shorter ranges (10YR/12YR/etc.), making all long-range presets
            // show identical results. Entry date correctly scopes trades to the range.
            finalTrades = trades.filter(t => {
                const entryDate = toNYDate(t.entryDate);
                return entryDate >= displayDate;
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

                // Ensure we start at 0 if the first point isn't exactly 0 (it should be 0 by definition of re-basing, but good to be safe)
                // Actually, the first point in the slice will be exactly 0 after re-basing.
                // But if the slice starts AFTER displayFrom (e.g. gap in data), we might want to prepend a 0 point at displayFrom.
                if (finalEquityCurve.length > 0 && finalEquityCurve[0].date > displayFrom) {
                    const padDates = qqqData.filter(d => {
                        const dDate = toNYDate(d.date);
                        return dDate >= displayDate && dDate < toNYDate(finalEquityCurve[0].date);
                    });

                    const padPoints = padDates.map(d => ({
                        date: d.date,
                        equity: 0,
                        benchmark: 0,
                        benchmarkTQQQ: 0
                    }));

                    if (padPoints.length === 0) {
                        padPoints.push({
                            date: displayFrom,
                            equity: 0,
                            benchmark: 0,
                            benchmarkTQQQ: 0
                        });
                    }

                    finalEquityCurve = [...padPoints, ...finalEquityCurve];
                }
            } else {
                // No data after display date? Return empty or just what we have if it's close?
                // If we have no data after display date, return empty
                finalEquityCurve = [];
            }
        }

        return {
            trades: finalTrades,
            equityCurve: finalEquityCurve,
            metrics: this.calculateMetrics(finalEquityCurve, finalTrades, displayDate ?? toNYDate(startDate ?? qqqData[0].date))
        };
    }

    private calculateMetrics(
        equityCurve: { date: string; equity: number; benchmark: number; benchmarkTQQQ: number }[],
        trades: Trade[],
        rangeStartDate?: Date
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

        const metricStartDate = rangeStartDate ?? toNYDate(equityCurve[0].date);
        const metricEndDate = toNYDate(equityCurve[equityCurve.length - 1].date);
        const elapsedDays = Math.max(1, Math.round((metricEndDate.getTime() - metricStartDate.getTime()) / (1000 * 60 * 60 * 24)));
        const elapsedYears = Math.max(elapsedDays / 365, equityCurve.length / 252);
        const totalDays = Math.max(equityCurve.length, Math.round(elapsedYears * 252));
        const months = elapsedYears * 12;

        const strategyMetrics = this.getMetrics(equityCurve.map(d => ({ date: d.date, value: d.equity })), elapsedYears);
        const benchmarkMetrics = this.getMetrics(equityCurve.map(d => ({ date: d.date, value: d.benchmark })), elapsedYears);
        const benchmarkTQQQMetrics = this.getMetrics(equityCurve.map(d => ({ date: d.date, value: d.benchmarkTQQQ })), elapsedYears);

        const avgTrades = {
            daily: totalDays > 0 ? trades.length / totalDays : 0,
            monthly: months > 0 ? trades.length / months : 0,
            annually: elapsedYears > 0 ? trades.length / elapsedYears : 0
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

    private getMetrics(data: { date: string; value: number }[], elapsedYears?: number) {
        if (data.length === 0) return { totalReturn: 0, cagr: 0, maxDrawdown: 0, sharpeRatio: 0 };

        // Data is in percentage change (e.g., 0, 5.5, -2.1)
        // Convert back to absolute multiplier for CAGR calculation
        const startVal = 1 + (data[0].value / 100);
        const endVal = 1 + (data[data.length - 1].value / 100);

        const totalReturn = (endVal - startVal) / startVal;

        const years = elapsedYears ?? (data.length / 252);
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
