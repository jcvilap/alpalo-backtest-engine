/**
 * Pure Strategy Engine
 *
 * This is the "brain" of the trading system - a pure function that makes
 * trading decisions based on market data and portfolio state.
 *
 * Key properties:
 * - Pure: No I/O, no side effects, no external dependencies
 * - Deterministic: Same inputs always produce same output
 * - Testable: Easy to unit test with mocked data
 * - Reusable: Can be used in backtesting, live trading, or paper trading
 *
 * @module strategy/engine
 */

import { StrategyController } from '../lib/strategy/strategyController';
import { MarketSnapshot, PortfolioState, StrategyParams, StrategyDecision } from './types';
import {
    MA_PERIODS,
    ROC_PERIODS,
    MEAN_REVERSION,
    SQQQ_CRITERIA,
    TREND_WEIGHTS,
    CONTROLLER
} from '../lib/strategy/config';

/**
 * Run the trading strategy and generate a decision
 *
 * This is the core strategy function that should be called by orchestration layers
 * (BacktestRunner, LiveRunner, etc.) to get trading decisions.
 *
 * @param snapshot - Current market state with price data and history
 * @param portfolio - Current portfolio state (cash, positions, equity)
 * @param params - Strategy configuration parameters
 * @returns Trading decision with symbol, action, weight, and reasoning
 *
 * @example
 * ```typescript
 * const decision = runStrategy(snapshot, portfolio, params);
 * // decision = { symbol: 'TQQQ', action: 'BUY', weight: 1.0, reason: '...' }
 * ```
 */
export function runStrategy(
    snapshot: MarketSnapshot,
    portfolio: PortfolioState,
    params: StrategyParams
): StrategyDecision {
    // Validate inputs
    if (!snapshot.qqqHistory || snapshot.qqqHistory.length === 0) {
        return {
            symbol: 'TQQQ',
            action: 'HOLD',
            weight: 0,
            reason: 'No market data available'
        };
    }

    // Ensure we have minimum data for indicators (200 days for MA200)
    if (snapshot.qqqHistory.length < params.maPeriods.long) {
        return {
            symbol: 'TQQQ',
            action: 'HOLD',
            weight: 0,
            reason: `Insufficient data (need ${params.maPeriods.long} days, have ${snapshot.qqqHistory.length})`
        };
    }

    // Use existing StrategyController to analyze the market
    // This maintains 100% compatibility with existing strategy logic
    const controller = new StrategyController();
    const signal = controller.analyze(snapshot.qqqHistory);

    // Convert StrategySignal to StrategyDecision (they have the same shape)
    const decision: StrategyDecision = {
        symbol: signal.symbol,
        action: signal.action,
        weight: signal.weight,
        reason: signal.reason
    };

    return decision;
}

/**
 * Create default strategy parameters from existing config
 *
 * This helper function constructs a StrategyParams object from the
 * configuration constants in src/lib/strategy/config.ts
 *
 * @returns Default strategy parameters
 */
export function createDefaultStrategyParams(): StrategyParams {
    return {
        maPeriods: {
            short: MA_PERIODS.SHORT,
            medium: MA_PERIODS.MEDIUM,
            long: MA_PERIODS.LONG
        },
        rocPeriods: {
            short: ROC_PERIODS.SHORT,
            medium: ROC_PERIODS.MEDIUM
        },
        meanReversion: {
            oversoldThreshold: MEAN_REVERSION.OVERSOLD_THRESHOLD,
            deeplyOversoldThreshold: MEAN_REVERSION.DEEPLY_OVERSOLD_THRESHOLD,
            overboughtThreshold: MEAN_REVERSION.OVERBOUGHT_THRESHOLD,
            baseOversoldWeight: MEAN_REVERSION.BASE_OVERSOLD_WEIGHT,
            extraOversoldWeight: MEAN_REVERSION.EXTRA_OVERSOLD_WEIGHT,
            moderateExtraWeight: MEAN_REVERSION.MODERATE_EXTRA_WEIGHT,
            maxOversoldWeight: MEAN_REVERSION.MAX_OVERSOLD_WEIGHT,
            overboughtTrimWeight: MEAN_REVERSION.OVERBOUGHT_TRIM_WEIGHT
        },
        sqqqCriteria: {
            rallyZScoreThreshold: SQQQ_CRITERIA.RALLY_ZSCORE_THRESHOLD,
            negativeMomentumThreshold: SQQQ_CRITERIA.NEGATIVE_MOMENTUM_THRESHOLD,
            maSeparationThreshold: SQQQ_CRITERIA.MA_SEPARATION_THRESHOLD,
            entryWeight: SQQQ_CRITERIA.ENTRY_WEIGHT,
            washoutThreshold: SQQQ_CRITERIA.WASHOUT_THRESHOLD,
            exitWeight: SQQQ_CRITERIA.EXIT_WEIGHT
        },
        trendWeights: {
            strongBull: TREND_WEIGHTS.STRONG_BULL,
            moderateBull: TREND_WEIGHTS.MODERATE_BULL,
            transitionalPositive: TREND_WEIGHTS.TRANSITIONAL_POSITIVE,
            neutral: TREND_WEIGHTS.NEUTRAL,
            bear: TREND_WEIGHTS.BEAR
        },
        controller: {
            maxWeight: CONTROLLER.MAX_WEIGHT,
            meanReversionCapOnExit: CONTROLLER.MEAN_REVERSION_CAP_ON_EXIT,
            minBullExposure: CONTROLLER.MIN_BULL_EXPOSURE,
            maxSqqqExposure: CONTROLLER.MAX_SQQQ_EXPOSURE,
            sqqqOverrideThreshold: CONTROLLER.SQQQ_OVERRIDE_THRESHOLD,
            hedgeFactor: CONTROLLER.HEDGE_FACTOR,
            minHedgeExposure: CONTROLLER.MIN_HEDGE_EXPOSURE
        }
    };
}
