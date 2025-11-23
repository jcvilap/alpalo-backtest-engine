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

    static averageTrueRange(data: OHLC[], period: number): number[] {
        if (data.length === 0) {
            return [];
        }

        const atr: number[] = [];
        const trueRange: number[] = [];

        for (let i = 0; i < data.length; i++) {
            const current = data[i];
            const prevClose = i > 0 ? data[i - 1].close : current.close;
            const tr = Math.max(
                current.high - current.low,
                Math.abs(current.high - prevClose),
                Math.abs(current.low - prevClose)
            );

            trueRange.push(tr);

            if (i + 1 < period) {
                atr.push(Number.NaN);
                continue;
            }

            const window = trueRange.slice(i + 1 - period, i + 1);
            const avg = window.reduce((sum, val) => sum + val, 0) / period;
            atr.push(avg);
        }

        return atr;
    }
}
