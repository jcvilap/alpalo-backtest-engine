import { Strategy, StrategySignal, OHLC } from '../types';
import { TrendFollowingStrategy } from './trendFollowingStrategy';
import { MeanReversionStrategy } from './meanReversionStrategy';
import { CONTROLLER } from './config';

/**
 * Strategy Controller
 *
 * Orchestrates multiple sub-strategies to generate final trading signals.
 * Implements an ensemble approach where:
 * - Trend Following provides the base regime and directional bias
 * - Mean Reversion provides tactical overlays (adds/trims)
 *
 * ## Signal Combination Logic
 *
 * ### Case 1: Trend Exits, Mean Reversion Buys
 * **Scenario**: Trend says bearish (SELL), but mean reversion sees oversold bounce
 * **Action**: Allow mean reversion entry with increased participation (70%, was 40%)
 * **Rationale**: Capture tactical bounces even when main trend is unclear
 *
 * ### Case 2: Both Agree on Symbol (TQQQ or SQQQ)
 * **Scenario**: Trend says TQQQ, mean reversion also says TQQQ
 * **Action**: Add weights together (up to 100% max)
 * **Rationale**: High conviction when both strategies align
 *
 * ### Case 3: Mean Reversion Trims (SELL signal)
 * **Scenario**: Trend says TQQQ 100%, mean reversion says trim 5%
 * **Action**: Maintain minimum 90% exposure (cap the trim)
 * **Rationale**: Stay invested during bull runs, avoid excessive trimming
 *
 * ### Case 4: Conflicting Symbols (TQQQ vs SQQQ)
 * **Scenario A**: Trend conviction is low (≤60%), mean reversion wants SQQQ
 *   - **Action**: Allow SQQQ override (capped at 50%)
 *   - **Rationale**: Trend is uncertain, allow tactical short
 *
 * **Scenario B**: Trend conviction is high (>60%), mean reversion wants SQQQ
 *   - **Action**: Don't switch to SQQQ, reduce TQQQ slightly as hedge
 *   - **Rationale**: Strong trend, maintain directional bias
 *
 * ## Key Improvements
 *
 * 1. **Increased Mean Reversion Participation**: 0.4 → 0.7 when trend exits
 *    - Captures more oversold bounces
 *
 * 2. **Limited Trimming**: Maintain minimum 90% exposure (was 80%)
 *    - Stays invested during strong bull runs
 *
 * 3. **Conservative SQQQ Exposure**: Cap at 50% maximum
 *    - Limits downside from wrong short trades
 *
 * 4. **Higher Override Threshold**: 0.5 → 0.6
 *    - Requires stronger trend signal to block SQQQ entry
 *
 * ## Example Flows
 *
 * **Bull Market Oversold**:
 * ```
 * Trend: TQQQ 100%
 * MeanRev: TQQQ 55% (oversold bounce)
 * Result: TQQQ 100% (capped at max)
 * ```
 *
 * **Bull Market Overbought**:
 * ```
 * Trend: TQQQ 100%
 * MeanRev: SELL 5% (trim)
 * Result: TQQQ 95% (trim 5%)
 * ```
 *
 * **Bear Market Rally**:
 * ```
 * Trend: SELL 0% (exit to cash)
 * MeanRev: SQQQ 35% (fade rally)
 * Result: SQQQ 35% (mean reversion override)
 * ```
 *
 * **Strong Bull with SQQQ Signal**:
 * ```
 * Trend: TQQQ 100%
 * MeanRev: SQQQ 35%
 * Result: TQQQ 89.5% (slight hedge, don't flip)
 * ```
 *
 * @example
 * ```typescript
 * const controller = new StrategyController();
 * const signal = controller.analyze(historicalData);
 * // Returns combined signal from all sub-strategies
 * ```
 */
export class StrategyController implements Strategy {
    name = 'StrategyController';
    private strategies: Strategy[] = [];

    constructor() {
        // Initialize sub-strategies in order of priority
        this.strategies.push(new TrendFollowingStrategy());
        this.strategies.push(new MeanReversionStrategy());
    }

    /**
     * Analyze market data and generate combined trading signal
     *
     * @param data - Historical OHLC data (must include at least 200 days)
     * @returns Final trading signal after combining all sub-strategies
     */
    analyze(data: OHLC[]): StrategySignal {
        // Get signals from all sub-strategies
        const [trendSignal, meanReversionSignal] = this.strategies.map(s => s.analyze(data));

        // Validate trend signal exists
        if (!trendSignal) {
            return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'No signal' };
        }

        // ===== CASE 1: TREND EXITS, MEAN REVERSION BUYS =====
        // If trend says exit but mean reversion says buy, allow HIGHER participation
        // IMPROVEMENT: Increased from 0.4 to 0.7 to capture more bounces
        if (trendSignal.action === 'SELL' &&
            meanReversionSignal.action === 'BUY' &&
            meanReversionSignal.weight > 0) {
            return {
                symbol: meanReversionSignal.symbol,
                action: 'BUY',
                weight: Math.min(CONTROLLER.MEAN_REVERSION_CAP_ON_EXIT, meanReversionSignal.weight),
                reason: `Trend: ${trendSignal.reason} | MeanReversion bounce: ${meanReversionSignal.reason}`
            };
        }

        // ===== COMBINE SIGNALS =====
        let finalSymbol = trendSignal.symbol;
        let finalWeight = trendSignal.weight;

        // ===== CASE 2: MEAN REVERSION TRIMS (SELL) =====
        // IMPROVEMENT: Severely limit trims to maintain 90% minimum exposure
        if (meanReversionSignal.action === 'SELL' && meanReversionSignal.symbol === trendSignal.symbol) {
            // Cap trim amount: maintain minimum 90% exposure during bull trends
            // This prevents getting shaken out during strong bull runs
            finalWeight = Math.max(CONTROLLER.MIN_BULL_EXPOSURE, trendSignal.weight - meanReversionSignal.weight);
        }
        // ===== CASE 3: MEAN REVERSION BUYS =====
        else if (meanReversionSignal.action === 'BUY') {
            // Sub-case A: Both agree on symbol
            if (meanReversionSignal.symbol === trendSignal.symbol) {
                // Add weights together (high conviction)
                finalWeight = Math.min(CONTROLLER.MAX_WEIGHT, trendSignal.weight + meanReversionSignal.weight);
            }
            // Sub-case B: Conflicting symbols (TQQQ vs SQQQ)
            else if (trendSignal.weight <= CONTROLLER.SQQQ_OVERRIDE_THRESHOLD) {
                // Trend conviction is low, allow SQQQ override
                // IMPROVEMENT: Increased threshold from 0.5 to 0.6
                finalSymbol = meanReversionSignal.symbol;
                finalWeight = Math.min(CONTROLLER.MAX_SQQQ_EXPOSURE, meanReversionSignal.weight);
            } else {
                // Trend conviction is high, don't allow SQQQ to override
                // Just reduce TQQQ slightly as a hedge
                finalWeight = Math.max(
                    CONTROLLER.MIN_HEDGE_EXPOSURE,
                    trendSignal.weight - meanReversionSignal.weight * CONTROLLER.HEDGE_FACTOR
                );
            }
        }

        // ===== FINALIZE SIGNAL =====
        // Ensure weight is within valid range [0, 1]
        const cappedWeight = Math.min(Math.max(finalWeight, 0), CONTROLLER.MAX_WEIGHT);
        const finalAction: StrategySignal['action'] = cappedWeight > 0 ? 'BUY' : 'SELL';

        return {
            symbol: finalSymbol,
            action: finalAction,
            weight: cappedWeight,
            reason: `${trendSignal.reason} | MeanReversion: ${meanReversionSignal.reason}`
        };
    }
}
