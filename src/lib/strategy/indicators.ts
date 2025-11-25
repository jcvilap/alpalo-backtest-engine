import { OHLC } from '../types';

export class Indicators {
    static simpleMovingAverage(data: OHLC[], period: number): number[] {
        if (data.length < period) {
            return [];
        }

        const sma: number[] = [];
        for (let i = period - 1; i < data.length; i++) {
            const sum = data.slice(i - period + 1, i + 1).reduce((acc, candle) => acc + candle.close, 0);
            sma.push(sum / period);
        }
        return sma;
    }

    static rateOfChange(data: OHLC[], period: number): number[] {
        if (data.length < period) {
            return [];
        }

        const roc: number[] = [];
        for (let i = period; i < data.length; i++) {
            const current = data[i].close;
            const prev = data[i - period].close;
            roc.push(((current - prev) / prev) * 100);
        }
        return roc;
    }

    static rollingStdDev(data: OHLC[], period: number): number[] {
        if (data.length < period) {
            return [];
        }

        const std: number[] = [];

        for (let i = period - 1; i < data.length; i++) {
            const window = data.slice(i - period + 1, i + 1).map(candle => candle.close);
            const mean = window.reduce((acc, val) => acc + val, 0) / period;
            const variance = window.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / period;
            std.push(Math.sqrt(variance));
        }

        return std;
    }

    /**
     * Calculates the percentage slope of a moving average over a lookback window.
     * Returns null when there is not enough data to compute the slope.
     */
    static movingAverageSlope(ma: number[], lookback: number): number | null {
        if (ma.length < lookback + 1) return null;

        const current = ma[ma.length - 1];
        const past = ma[ma.length - 1 - lookback];

        if (past === 0) return null;

        return ((current - past) / past) * 100;
    }
}
