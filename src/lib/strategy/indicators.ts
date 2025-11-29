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

    /**
     * Calculate Relative Strength Index (RSI)
     * Measures momentum by comparing recent gains vs losses
     */
    static rsi(data: OHLC[], period: number = 14): number[] {
        if (data.length < period + 1) {
            return [];
        }

        const rsi: number[] = [];
        let gains: number[] = [];
        let losses: number[] = [];

        // Calculate initial average gain and loss
        for (let i = 1; i <= period; i++) {
            const change = data[i].close - data[i - 1].close;
            gains.push(change > 0 ? change : 0);
            losses.push(change < 0 ? -change : 0);
        }

        let avgGain = gains.reduce((a, b) => a + b, 0) / period;
        let avgLoss = losses.reduce((a, b) => a + b, 0) / period;

        const rs = avgGain / (avgLoss || 0.0001);
        rsi.push(100 - (100 / (1 + rs)));

        // Calculate RSI for remaining data
        for (let i = period + 1; i < data.length; i++) {
            const change = data[i].close - data[i - 1].close;
            const gain = change > 0 ? change : 0;
            const loss = change < 0 ? -change : 0;

            avgGain = (avgGain * (period - 1) + gain) / period;
            avgLoss = (avgLoss * (period - 1) + loss) / period;

            const rs = avgGain / (avgLoss || 0.0001);
            rsi.push(100 - (100 / (1 + rs)));
        }

        return rsi;
    }

    /**
     * Calculate Average True Range (ATR)
     * Measures market volatility
     */
    static atr(data: OHLC[], period: number = 14): number[] {
        if (data.length < period + 1) {
            return [];
        }

        const atr: number[] = [];
        const trueRanges: number[] = [];

        // Calculate true ranges
        for (let i = 1; i < data.length; i++) {
            const high = data[i].high;
            const low = data[i].low;
            const prevClose = data[i - 1].close;

            const tr = Math.max(
                high - low,
                Math.abs(high - prevClose),
                Math.abs(low - prevClose)
            );
            trueRanges.push(tr);
        }

        // Calculate initial ATR
        let sum = 0;
        for (let i = 0; i < period; i++) {
            sum += trueRanges[i];
        }
        let currentATR = sum / period;
        atr.push(currentATR);

        // Calculate remaining ATR values using smoothing
        for (let i = period; i < trueRanges.length; i++) {
            currentATR = (currentATR * (period - 1) + trueRanges[i]) / period;
            atr.push(currentATR);
        }

        return atr;
    }

    /**
     * Calculate Average Directional Index (ADX)
     * Quantifies trend strength (0-100, higher = stronger trend)
     */
    static adx(data: OHLC[], period: number = 14): number[] {
        if (data.length < period * 2 + 1) {
            return [];
        }

        const adx: number[] = [];
        const plusDM: number[] = [];
        const minusDM: number[] = [];
        const trueRanges: number[] = [];

        // Calculate directional movements and true ranges
        for (let i = 1; i < data.length; i++) {
            const highDiff = data[i].high - data[i - 1].high;
            const lowDiff = data[i - 1].low - data[i].low;

            plusDM.push(highDiff > lowDiff && highDiff > 0 ? highDiff : 0);
            minusDM.push(lowDiff > highDiff && lowDiff > 0 ? lowDiff : 0);

            const tr = Math.max(
                data[i].high - data[i].low,
                Math.abs(data[i].high - data[i - 1].close),
                Math.abs(data[i].low - data[i - 1].close)
            );
            trueRanges.push(tr);
        }

        // Calculate smoothed directional indicators
        const plusDI: number[] = [];
        const minusDI: number[] = [];
        const dx: number[] = [];

        for (let i = period - 1; i < plusDM.length; i++) {
            const sumPlusDM = plusDM.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
            const sumMinusDM = minusDM.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
            const sumTR = trueRanges.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);

            const pdi = (sumPlusDM / sumTR) * 100;
            const mdi = (sumMinusDM / sumTR) * 100;

            plusDI.push(pdi);
            minusDI.push(mdi);

            const dxValue = (Math.abs(pdi - mdi) / (pdi + mdi || 0.0001)) * 100;
            dx.push(dxValue);
        }

        // Calculate ADX
        for (let i = period - 1; i < dx.length; i++) {
            const avgDX = dx.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period;
            adx.push(avgDX);
        }

        return adx;
    }
}
