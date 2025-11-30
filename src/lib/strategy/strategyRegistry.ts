import { Strategy } from '../types';
import { TrendFollowingStrategy } from './trendFollowingStrategy';
import { VolatilityProtectedStrategy } from './volatilityProtectedStrategy';
import { StrategyController } from './strategyController';

/**
 * Strategy Registry
 *
 * Central registry for all available trading strategies.
 * Allows easy selection, instantiation, and comparison of different strategies.
 *
 * ## Available Strategies
 *
 * 1. **current** (default): Ensemble strategy combining trend-following + mean reversion
 * 2. **trend-following**: Simple MA250 crossover strategy (original baseline)
 * 3. **proposed-volatility-protected**: Enhanced strategy with ADX/RSI/ATR filters (best for 2011)
 *
 * @example
 * ```typescript
 * // Get a specific strategy
 * const strategy = StrategyRegistry.get('proposed-volatility-protected');
 *
 * // List all available strategies
 * const all = StrategyRegistry.listAll();
 * console.log(all); // ['current', 'trend-following', 'proposed-volatility-protected']
 * ```
 */
export class StrategyRegistry {
    private static strategies: Map<string, () => Strategy> = new Map([
        ['current', () => new StrategyController()],
        ['trend-following', () => new TrendFollowingStrategy()],
        ['proposed-volatility-protected', () => new VolatilityProtectedStrategy()],
    ]);

    /**
     * Get a strategy instance by name
     *
     * @param name - Strategy name (e.g., 'volatility-protected')
     * @returns Strategy instance
     * @throws Error if strategy name is not found
     */
    static get(name: string): Strategy {
        const strategyFactory = this.strategies.get(name);

        if (!strategyFactory) {
            const available = Array.from(this.strategies.keys()).join(', ');
            throw new Error(
                `Strategy "${name}" not found. Available strategies: ${available}`
            );
        }

        return strategyFactory();
    }

    /**
     * List all available strategy names
     *
     * @returns Array of strategy names
     */
    static listAll(): string[] {
        return Array.from(this.strategies.keys());
    }

    /**
     * Get multiple strategies for comparison
     *
     * @param names - Array of strategy names to compare
     * @returns Map of strategy name to strategy instance
     */
    static getMultiple(names: string[]): Map<string, Strategy> {
        const strategies = new Map<string, Strategy>();

        for (const name of names) {
            strategies.set(name, this.get(name));
        }

        return strategies;
    }

    /**
     * Get strategy description
     *
     * @param name - Strategy name
     * @returns Human-readable description of the strategy
     */
    static getDescription(name: string): string {
        const descriptions: Record<string, string> = {
            'current': 'Ensemble strategy combining trend-following (MA250) with mean reversion overlays',
            'trend-following': 'Simple MA250 crossover strategy - original baseline implementation',
            'proposed-volatility-protected': 'Enhanced trend-following with volatility protection (ADX/RSI/ATR filters) - optimized for 2011',
        };

        return descriptions[name] || 'No description available';
    }
}
