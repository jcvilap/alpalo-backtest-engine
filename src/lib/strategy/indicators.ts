import { OHLC } from '../types';

/**
 * Technical Indicators for Trading Strategy
 *
 * This class provides the fundamental indicators used across all sub-strategies:
 * - Simple Moving Average (SMA): Trend identification and regime classification
 * - Rate of Change (ROC): Momentum confirmation
 * - Rolling Standard Deviation: Volatility and z-score calculations
 *
 * All indicators use closing prices and are aligned to the OHLC data array indices.
 * The first N-1 elements are not included in results (where N is the period).
 *
 * @example
 * ```typescript
 * const ma50 = Indicators.simpleMovingAverage(ohlcData, 50);
 * const roc20 = Indicators.rateOfChange(ohlcData, 20);
 * const currentMA = ma50[ma50.length - 1]; // Most recent value
 * ```
 */
export class Indicators {
    /**
     * Calculate Simple Moving Average (SMA)
     *
     * Computes the arithmetic mean of closing prices over a rolling window.
     * Used for trend identification and support/resistance levels.
     *
     * @param data - Array of OHLC candlesticks
     * @param period - Lookback period in days
     * @returns Array of SMA values (length = data.length - period + 1)
     *
     * @example
     * ```typescript
     * // 50-day moving average
     * const ma50 = Indicators.simpleMovingAverage(data, 50);
     * // Current MA value is the last element
     * const currentMA = ma50[ma50.length - 1];
     * ```
     */
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

    /**
     * Calculate Rate of Change (ROC)
     *
     * Measures the percentage change in price over a specified period.
     * Positive values indicate upward momentum, negative values indicate downward momentum.
     *
     * Formula: ROC = ((Current - Previous) / Previous) * 100
     *
     * @param data - Array of OHLC candlesticks
     * @param period - Lookback period in days
     * @returns Array of ROC values as percentages (length = data.length - period)
     *
     * @example
     * ```typescript
     * // 20-day rate of change
     * const roc20 = Indicators.rateOfChange(data, 20);
     * const currentROC = roc20[roc20.length - 1];
     * // currentROC = 5.2 means price is up 5.2% over last 20 days
     * ```
     */
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
     * Calculate Rolling Standard Deviation
     *
     * Measures price volatility over a rolling window.
     * Used in conjunction with moving averages to calculate z-scores for mean reversion.
     *
     * Formula: σ = sqrt(Σ(x - μ)² / N)
     * where μ is the mean of the window and N is the period
     *
     * @param data - Array of OHLC candlesticks
     * @param period - Lookback period in days
     * @returns Array of standard deviation values (length = data.length - period + 1)
     *
     * @example
     * ```typescript
     * // 20-day standard deviation for z-score calculation
     * const std20 = Indicators.rollingStdDev(data, 20);
     * const ma20 = Indicators.simpleMovingAverage(data, 20);
     * const price = data[data.length - 1].close;
     * const zScore = (price - ma20[ma20.length - 1]) / std20[std20.length - 1];
     * // zScore = 2.0 means price is 2 standard deviations above the mean
     * ```
     */
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
     * Calculate Z-Score
     *
     * Convenience method to calculate how many standard deviations
     * the current price is from its moving average.
     *
     * @param price - Current price
     * @param movingAverage - Moving average value
     * @param stdDev - Standard deviation value
     * @returns Z-score (number of standard deviations from mean)
     *
     * @example
     * ```typescript
     * const zScore = Indicators.calculateZScore(100, 95, 2.5);
     * // Returns 2.0 (price is 2 std devs above MA)
     * ```
     */
    static calculateZScore(price: number, movingAverage: number, stdDev: number): number {
        if (stdDev === 0) return 0;
        return (price - movingAverage) / stdDev;
    }
}
