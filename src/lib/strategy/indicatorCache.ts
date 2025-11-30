import { OHLC } from '../types';

/**
 * Indicator Cache for Memoization
 *
 * Caches computed indicator values to avoid redundant calculations during backtesting.
 * Since indicators are deterministic (same data + same period = same result),
 * we can safely cache results keyed by data hash and period.
 *
 * Performance impact:
 * - Without cache: Each strategy recalculates MA(20), MA(50), MA(200), etc.
 * - With cache: First strategy calculates, subsequent strategies reuse
 * - For "ALL" timeframe with 2 strategies: ~50% reduction in indicator calculations
 *
 * @example
 * ```typescript
 * const cache = new IndicatorCache();
 * const ma20 = cache.getSMA(data, 20);  // First call: computes and caches
 * const ma20Again = cache.getSMA(data, 20);  // Second call: returns cached
 * ```
 */
export class IndicatorCache {
    private smaCache = new Map<string, number[]>();
    private rocCache = new Map<string, number[]>();
    private stdDevCache = new Map<string, number[]>();

    /**
     * Generate cache key based on data length and period
     *
     * We use data.length as a proxy for data identity since:
     * 1. During backtesting, data array grows monotonically (day by day)
     * 2. Same length = same data (within a single backtest session)
     * 3. Avoids expensive array hashing
     *
     * Note: We also include the last close price as a simple hash to handle edge cases
     */
    private getCacheKey(data: OHLC[], period: number, indicator: string): string {
        if (data.length === 0) return `${indicator}_${period}_0_0`;
        const lastClose = data[data.length - 1].close;
        return `${indicator}_${period}_${data.length}_${lastClose}`;
    }

    /**
     * Get Simple Moving Average with caching
     */
    getSMA(data: OHLC[], period: number, computeFn: (data: OHLC[], period: number) => number[]): number[] {
        const key = this.getCacheKey(data, period, 'sma');

        if (!this.smaCache.has(key)) {
            this.smaCache.set(key, computeFn(data, period));
        }

        return this.smaCache.get(key)!;
    }

    /**
     * Get Rate of Change with caching
     */
    getROC(data: OHLC[], period: number, computeFn: (data: OHLC[], period: number) => number[]): number[] {
        const key = this.getCacheKey(data, period, 'roc');

        if (!this.rocCache.has(key)) {
            this.rocCache.set(key, computeFn(data, period));
        }

        return this.rocCache.get(key)!;
    }

    /**
     * Get Rolling Standard Deviation with caching
     */
    getStdDev(data: OHLC[], period: number, computeFn: (data: OHLC[], period: number) => number[]): number[] {
        const key = this.getCacheKey(data, period, 'stddev');

        if (!this.stdDevCache.has(key)) {
            this.stdDevCache.set(key, computeFn(data, period));
        }

        return this.stdDevCache.get(key)!;
    }

    /**
     * Clear all caches
     *
     * Should be called between different backtest runs to avoid
     * memory buildup and stale data.
     */
    clear(): void {
        this.smaCache.clear();
        this.rocCache.clear();
        this.stdDevCache.clear();
    }

    /**
     * Get cache statistics for debugging/monitoring
     */
    getStats(): { sma: number; roc: number; stdDev: number; total: number } {
        return {
            sma: this.smaCache.size,
            roc: this.rocCache.size,
            stdDev: this.stdDevCache.size,
            total: this.smaCache.size + this.rocCache.size + this.stdDevCache.size,
        };
    }
}
