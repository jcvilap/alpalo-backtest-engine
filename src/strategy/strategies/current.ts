import { runStrategy as engineRunStrategy } from '../engine';
import { MarketSnapshot, PortfolioState, StrategyParams, StrategyDecision } from '../types';

/**
 * Current Strategy Wrapper
 * Re-exports the core logic from engine.ts to maintain backward compatibility
 * while fitting into the new strategy registry architecture.
 */
export function runStrategy(
    snapshot: MarketSnapshot,
    portfolio: PortfolioState,
    params: StrategyParams
): StrategyDecision {
    return engineRunStrategy(snapshot, portfolio, params);
}
