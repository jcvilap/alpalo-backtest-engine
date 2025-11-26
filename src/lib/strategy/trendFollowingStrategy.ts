import { Strategy, StrategySignal, OHLC } from '../types';
import { Indicators } from './indicators';
import { MA_PERIODS, ROC_PERIODS, TREND_WEIGHTS } from './config';

/**
 * Trend Following Strategy
 *
 * Core strategy that determines market regime and base position sizing using moving averages.
 *
 * ## Market Regimes
 *
 * 1. **Strong Bull** (Price > MA50 > MA200)
 *    - All moving averages aligned bullishly
 *    - Weight: 100% TQQQ exposure
 *
 * 2. **Moderate Bull** (Price > MA200, but MA50 lagging)
 *    - Price above long-term trend
 *    - Weight: 100% TQQQ exposure (increased from 75%)
 *
 * 3. **Transitional** (MA50 < Price < MA200, with positive momentum)
 *    - Price between moving averages
 *    - Requires ROC-20 > 0 for confirmation
 *    - Weight: 60% TQQQ exposure
 *
 * 4. **Confirmed Bear** (Price < MA50 < MA200)
 *    - All moving averages aligned bearishly
 *    - Weight: 0% (exit to cash)
 *
 * 5. **Neutral** (All other cases)
 *    - Unclear trend direction
 *    - Weight: 50% TQQQ exposure (maintain partial position)
 *
 * ## Key Improvement
 *
 * Previous version exited to cash too quickly (price < MA200).
 * New version requires confirmation from BOTH MA50 and MA200 for bear signal,
 * keeping us invested longer during bull market pullbacks.
 *
 * @example
 * ```typescript
 * const strategy = new TrendFollowingStrategy();
 * const signal = strategy.analyze(historicalData);
 * // signal = { symbol: 'TQQQ', action: 'BUY', weight: 1.0, reason: '...' }
 * ```
 */
export class TrendFollowingStrategy implements Strategy {
    name = 'TrendFollowing';

    /**
     * Analyze market data and generate trading signal
     *
     * @param data - Historical OHLC data (must include at least 200 days)
     * @returns Trading signal with symbol, action, weight, and reasoning
     */
    analyze(data: OHLC[]): StrategySignal {
        // Require minimum data for indicator calculation
        if (data.length < MA_PERIODS.LONG) {
            return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'Insufficient data' };
        }

        // Calculate indicators
        const ma50 = Indicators.simpleMovingAverage(data, MA_PERIODS.MEDIUM);
        const ma200 = Indicators.simpleMovingAverage(data, MA_PERIODS.LONG);
        const roc20 = Indicators.rateOfChange(data, ROC_PERIODS.MEDIUM);

        // Current values
        const currentPrice = data[data.length - 1].close;
        const currentMA50 = ma50[ma50.length - 1];
        const currentMA200 = ma200[ma200.length - 1];
        const currentROC20 = roc20[roc20.length - 1];

        // Regime classification
        const strongBullish = currentPrice > currentMA50 && currentMA50 > currentMA200;
        const moderatelyBullish = currentPrice > currentMA200 && !strongBullish;
        const bearish = currentPrice < currentMA50 && currentMA50 < currentMA200;
        const transitional = currentPrice < currentMA200 && currentPrice > currentMA50;

        // ===== REGIME-BASED POSITION SIZING =====

        // Strong Bull: All MAs aligned, full conviction
        if (strongBullish) {
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight: TREND_WEIGHTS.STRONG_BULL,
                reason: `Strong bull trend (${currentPrice.toFixed(2)} > ${currentMA50.toFixed(2)} > ${currentMA200.toFixed(2)})`
            };
        }

        // Moderate Bull: Price above long-term MA, full participation
        // IMPROVEMENT: Increased from 0.75 to 1.0 to capture more bull market gains
        if (moderatelyBullish) {
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight: TREND_WEIGHTS.MODERATE_BULL,
                reason: `Bull trend (price above MA${MA_PERIODS.LONG}: ${currentPrice.toFixed(2)} > ${currentMA200.toFixed(2)})`
            };
        }

        // Transitional: Price between MAs, use momentum filter
        // Only participate if momentum is positive
        if (transitional && currentROC20 > 0) {
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight: TREND_WEIGHTS.TRANSITIONAL_POSITIVE,
                reason: `Transitional with positive momentum (ROC${ROC_PERIODS.MEDIUM}: ${currentROC20.toFixed(2)}%)`
            };
        }

        // Confirmed Bear: Exit to cash
        // IMPROVEMENT: Requires both MA50 and MA200 to confirm bear trend
        // Previous version exited on price < MA200 alone, causing early exits
        if (bearish) {
            return {
                symbol: 'TQQQ',
                action: 'SELL',
                weight: TREND_WEIGHTS.BEAR,
                reason: `Bear trend confirmed (${currentPrice.toFixed(2)} < ${currentMA50.toFixed(2)} < ${currentMA200.toFixed(2)})`
            };
        }

        // Neutral/Unclear: Maintain partial exposure
        // IMPROVEMENT: Changed from 0% to 50% to avoid sitting in cash during unclear periods
        return {
            symbol: 'TQQQ',
            action: 'BUY',
            weight: TREND_WEIGHTS.NEUTRAL,
            reason: 'Neutral trend - maintain partial exposure'
        };
    }
}
