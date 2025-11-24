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

    static movingAverageSlope(data: OHLC[], period: number, lookback: number = 20): number[] {
        if (data.length < period + lookback) {
            return [];
        }

        const ma = this.simpleMovingAverage(data, period);
        const slope: number[] = [];

        for (let i = lookback; i < ma.length; i++) {
            const past = ma[i - lookback];
            const current = ma[i];
            slope.push(((current - past) / past) * 100);
        }

        return slope;
    }
}
