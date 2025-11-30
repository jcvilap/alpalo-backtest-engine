import { MarketSnapshot, PortfolioState, StrategyParams, StrategyDecision } from './types';
import { runStrategy as currentStrategy } from './strategies/current';
import { runStrategy as proposedVolatilityProtected } from './strategies/proposed-volatility-protected';
import { runStrategy as proposedNew } from './strategies/proposed-new';

export type StrategyFunction = (
    snapshot: MarketSnapshot,
    portfolio: PortfolioState,
    params: StrategyParams
) => StrategyDecision;

export const AVAILABLE_STRATEGIES = {
    'current': currentStrategy,
    'proposed-volatility-protected': proposedVolatilityProtected,
    'proposed-new': proposedNew,
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
