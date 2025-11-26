/**
 * Strategy Configuration
 *
 * Centralized configuration for all strategy parameters.
 * Modify these values to tune strategy behavior across all time horizons.
 */

/**
 * Moving Average Periods
 * Used for trend identification and regime classification
 */
export const MA_PERIODS = {
    /** Short-term MA for mean reversion (20 days ≈ 1 month) */
    SHORT: 20,
    /** Medium-term MA for trend transitions (50 days ≈ 2-3 months) */
    MEDIUM: 50,
    /** Long-term MA for major trend (200 days ≈ 10 months) */
    LONG: 200,
} as const;

/**
 * Rate of Change (ROC) Periods
 * Used for momentum confirmation
 */
export const ROC_PERIODS = {
    /** Short-term momentum (5 days ≈ 1 week) */
    SHORT: 5,
    /** Medium-term momentum (20 days ≈ 1 month) */
    MEDIUM: 20,
} as const;

/**
 * Mean Reversion Thresholds
 * Z-score thresholds for oversold/overbought conditions
 */
export const MEAN_REVERSION = {
    /** Oversold threshold: buy signal in bull markets */
    OVERSOLD_THRESHOLD: -1.3,
    /** Deeply oversold: increased position size */
    DEEPLY_OVERSOLD_THRESHOLD: -2.0,
    /** Overbought threshold: light trim in bull markets */
    OVERBOUGHT_THRESHOLD: 3.0,
    /** Base weight for oversold bounces */
    BASE_OVERSOLD_WEIGHT: 0.55,
    /** Extra weight for deeply oversold conditions */
    EXTRA_OVERSOLD_WEIGHT: 0.3,
    /** Moderate extra weight */
    MODERATE_EXTRA_WEIGHT: 0.2,
    /** Maximum oversold bounce weight */
    MAX_OVERSOLD_WEIGHT: 0.9,
    /** Overbought trim amount (trim 5% of position) */
    OVERBOUGHT_TRIM_WEIGHT: 0.05,
} as const;

/**
 * SQQQ (Short) Entry Criteria
 * Strict filters to avoid whipsaws in choppy markets
 */
export const SQQQ_CRITERIA = {
    /** Z-score threshold for bear rallies (2 std devs = strong rally) */
    RALLY_ZSCORE_THRESHOLD: 2.0,
    /** Required negative momentum (ROC-20 < -5%) */
    NEGATIVE_MOMENTUM_THRESHOLD: -5,
    /** MA separation requirement (MA50 must be 2%+ below MA200) */
    MA_SEPARATION_THRESHOLD: 2.0,
    /** Position size for SQQQ entries (conservative) */
    ENTRY_WEIGHT: 0.35,
    /** Deep washout threshold: exit shorts to avoid squeeze */
    WASHOUT_THRESHOLD: -1.6,
    /** Exit weight on washouts */
    EXIT_WEIGHT: 0.20,
} as const;

/**
 * Trend Following Weights
 * Position sizing based on market regime
 */
export const TREND_WEIGHTS = {
    /** Full exposure in strong bull trends */
    STRONG_BULL: 1.0,
    /** Full exposure in moderate bull trends (price > MA200) */
    MODERATE_BULL: 1.0,
    /** Reduced exposure in transitional periods with positive momentum */
    TRANSITIONAL_POSITIVE: 0.6,
    /** Partial exposure in neutral/unclear regimes */
    NEUTRAL: 0.5,
    /** Cash position in confirmed bear trends */
    BEAR: 0.0,
} as const;

/**
 * Strategy Controller Settings
 * Govern how sub-strategies are combined
 */
export const CONTROLLER = {
    /** Maximum total position weight (100% of capital) */
    MAX_WEIGHT: 1.0,
    /** Mean reversion participation cap when trend signals exit */
    MEAN_REVERSION_CAP_ON_EXIT: 0.7,
    /** Minimum exposure maintained during bull trims (90%) */
    MIN_BULL_EXPOSURE: 0.9,
    /** Maximum SQQQ exposure allowed */
    MAX_SQQQ_EXPOSURE: 0.5,
    /** Trend weight threshold to allow SQQQ override */
    SQQQ_OVERRIDE_THRESHOLD: 0.6,
    /** Hedge factor when opposing signals occur */
    HEDGE_FACTOR: 0.3,
    /** Minimum exposure when hedging */
    MIN_HEDGE_EXPOSURE: 0.7,
} as const;

/**
 * Risk Management
 */
export const RISK = {
    /** Rebalancing threshold (2% of portfolio) */
    REBALANCE_THRESHOLD: 0.02,
    /** Initial capital for backtests */
    INITIAL_CAPITAL: 1_000_000,
    /** Warmup period for indicators (days) */
    WARMUP_PERIOD: 200,
} as const;

/**
 * Strategy Philosophy Summary
 *
 * This configuration implements a systematic TQQQ/SQQQ trading strategy with:
 *
 * 1. **Maximize Bull Participation**: Stay 90-100% invested during all bullish regimes
 * 2. **Minimize SQQQ Whipsaws**: Use strict 4-filter confirmation for shorts
 * 3. **Mean Reversion Overlays**: Add to positions on oversold, trim lightly on extreme overbought
 * 4. **Momentum Confirmation**: Use ROC filters to confirm trend strength
 * 5. **Regime-Based Sizing**: Adjust exposure based on MA relationships
 *
 * Design Principles:
 * - Simple, auditable indicators (MA and ROC only)
 * - Mechanical, rules-based (no discretion)
 * - No margin (cash-only with intrinsic leverage)
 * - Clear regime definitions
 * - Ensemble approach with weighted sub-strategies
 */
