import { StrategyController } from '../strategy/strategyController';
import { OHLC } from '../types';

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

    run(qqqData: OHLC[], tqqqData: OHLC[], sqqqData: OHLC[]): BacktestResult {
        let cash = this.initialCapital;
        let shares = 0;
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


        // Iterate over NDX data (the driver)
        for (let i = 250; i < qqqData.length; i++) {
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

                    const entryTime = new Date(currentPosition.entryDate).getTime();
                    const exitTime = new Date(date).getTime();
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

                const entryTime = new Date(currentPosition.entryDate).getTime();
                const exitTime = new Date(lastDate).getTime();
                currentPosition.daysHeld = Math.round((exitTime - entryTime) / (1000 * 60 * 60 * 24));

                trades.push(currentPosition);
            }
        }

        return {
            trades,
            equityCurve,
            metrics: this.calculateMetrics(equityCurve, trades)
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
