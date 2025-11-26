/**
 * Core Strategy Types
 *
 * These types define the pure strategy engine's interface,
 * independent of whether it's used in backtesting or live trading.
 */

import { OHLC } from '../lib/types';
import { Position } from '../lib/trade/types';

/**
 * Market Bar - A single OHLC candle for any symbol
 * Reuses existing OHLC type for compatibility
 */
export type MarketBar = OHLC;

/**
 * Market Snapshot - Complete market state at a specific point in time
 * Contains all price data needed for strategy decision-making
 */
export interface MarketSnapshot {
    /** Current date (YYYY-MM-DD) */
    date: string;

    /** Historical QQQ data up to and including this date (for indicators) */
    qqqHistory: MarketBar[];

    /** Current TQQQ bar */
    tqqqBar: MarketBar;

    /** Current SQQQ bar */
    sqqqBar: MarketBar;

    /** Current prices for all tradeable symbols */
    prices: {
        TQQQ: number;
        SQQQ: number;
        [symbol: string]: number;
    };
}

/**
 * Portfolio State - Current state of the portfolio
 */
export interface PortfolioState {
    /** Available cash */
    cash: number;

    /** Current position (null if flat) */
    position: Position | null;

    /** Total equity (cash + position value) */
    totalEquity: number;
}

/**
 * Strategy Parameters - Configuration for strategy behavior
 * These map directly to the config values in src/lib/strategy/config.ts
 */
export interface StrategyParams {
    maPeriods: {
        short: number;
        medium: number;
        long: number;
    };
    rocPeriods: {
        short: number;
        medium: number;
    };
    meanReversion: {
        oversoldThreshold: number;
        deeplyOversoldThreshold: number;
        overboughtThreshold: number;
        baseOversoldWeight: number;
        extraOversoldWeight: number;
        moderateExtraWeight: number;
        maxOversoldWeight: number;
        overboughtTrimWeight: number;
    };
    sqqqCriteria: {
        rallyZScoreThreshold: number;
        negativeMomentumThreshold: number;
        maSeparationThreshold: number;
        entryWeight: number;
        washoutThreshold: number;
        exitWeight: number;
    };
    trendWeights: {
        strongBull: number;
        moderateBull: number;
        transitionalPositive: number;
        neutral: number;
        bear: number;
    };
    controller: {
        maxWeight: number;
        meanReversionCapOnExit: number;
        minBullExposure: number;
        maxSqqqExposure: number;
        sqqqOverrideThreshold: number;
        hedgeFactor: number;
        minHedgeExposure: number;
    };
}

/**
 * Strategy Decision - Output of the strategy engine
 * Reuses StrategySignal structure for compatibility
 */
export interface StrategyDecision {
    /** Target symbol (TQQQ or SQQQ) */
    symbol: string;

    /** Action to take (BUY, SELL, HOLD) */
    action: 'BUY' | 'SELL' | 'HOLD';

    /** Target weight (0-1, percentage of portfolio) */
    weight: number;

    /** Human-readable explanation */
    reason: string;
}
