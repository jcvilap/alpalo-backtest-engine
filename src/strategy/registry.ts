/**
 * Strategy Registry
 *
 * ## Naming Convention for New Strategies
 *
 * All new proposed strategies MUST follow this naming format:
 *
 * **Format:** `proposed-{CAGR}-cagr`
 *
 * Where `{CAGR}` is the integer CAGR percentage achieved on the ALL timeframe.
 *
 * ### Example:
 * If a strategy achieves 21.17% CAGR on ALL timeframe, name it: `proposed-21-cagr`
 *
 * ### Steps to Add a New Strategy:
 *
 * 1. Create strategy file: `/src/strategy/strategies/proposed-{CAGR}-cagr.ts`
 * 2. Run backtest with ALL timeframe: `pnpm backtest --strategies=your-strategy --timeframes=ALL`
 * 3. Get the CAGR value from the ALL timeframe result
 * 4. Rename the file and strategy to match the CAGR (rounded to nearest integer)
 * 5. Import and register the strategy in this file
 * 6. Update the AVAILABLE_STRATEGIES object below
 *
 * ### Why This Convention?
 * - **Clarity:** Strategy name immediately indicates its performance
 * - **Comparison:** Easy to compare different strategy variants at a glance
 * - **Consistency:** Standardized naming across all proposed strategies
 *
 * @module strategy/registry
 */

import { MarketSnapshot, PortfolioState, StrategyParams, StrategyDecision } from './types';
import { runStrategy as currentStrategy } from './strategies/current';
import { runStrategy as proposedVolatilityProtected } from './strategies/proposed-volatility-protected';
import { runStrategy as proposed21Cagr } from './strategies/proposed-21-cagr';

export type StrategyFunction = (
    snapshot: MarketSnapshot,
    portfolio: PortfolioState,
    params: StrategyParams
) => StrategyDecision;

export const AVAILABLE_STRATEGIES = {
    'current': currentStrategy,
    'proposed-volatility-protected': proposedVolatilityProtected,
    'proposed-21-cagr': proposed21Cagr,
} as const;

export type StrategyName = keyof typeof AVAILABLE_STRATEGIES;

export function getStrategy(name: string): StrategyFunction {
    const strategy = AVAILABLE_STRATEGIES[name as StrategyName];
    if (!strategy) {
        throw new Error(`Strategy '${name}' not found. Available strategies: ${Object.keys(AVAILABLE_STRATEGIES).join(', ')}`);
    }
    return strategy;
}

export function getAvailableStrategies(): string[] {
    return Object.keys(AVAILABLE_STRATEGIES);
}
