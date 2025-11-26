/**
 * LiveRunner Orchestration Layer (Skeleton)
 *
 * This is a skeleton implementation showing how the live trading runner
 * will be structured. It follows the same pattern as BacktestRunner but
 * is designed for real-time execution.
 *
 * IMPORTANT: This is NOT yet connected to Alpaca or any live broker.
 * It's provided as an architectural template for future implementation.
 */

import { DataFeed } from '../ports/DataFeed';
import { Broker } from '../ports/Broker';
import { runStrategy } from '../strategy/engine';
import { StrategyParams } from '../strategy/types';
import { PortfolioManager } from '../lib/trade/PortfolioManager';

/**
 * Result of a single live trading execution
 */
export interface LiveExecutionResult {
    /** Execution timestamp */
    timestamp: string;

    /** Strategy decision that was made */
    decision: {
        symbol: string;
        action: string;
        weight: number;
        reason: string;
    };

    /** Orders that were placed (if any) */
    orders: Array<{
        symbol: string;
        side: string;
        shares: number;
        status: string;
    }>;

    /** Portfolio state after execution */
    portfolio: {
        cash: number;
        positions: Array<{
            symbol: string;
            shares: number;
            avgPrice: number;
            currentPrice: number;
            marketValue: number;
        }>;
        totalEquity: number;
    };
}

/**
 * LiveRunner - Orchestrates live trading (SKELETON ONLY)
 *
 * This class shows the architecture for live trading but does not
 * implement actual Alpaca integration. That will be added in a future PR.
 */
export class LiveRunner {
    private dataFeed: DataFeed;
    private broker: Broker;
    private params: StrategyParams;
    private portfolioManager: PortfolioManager;

    /**
     * Create a new LiveRunner
     *
     * @param dataFeed - Live data feed implementation (e.g., AlpacaDataFeed)
     * @param broker - Live broker implementation (e.g., AlpacaBroker)
     * @param params - Strategy parameters
     */
    constructor(dataFeed: DataFeed, broker: Broker, params: StrategyParams) {
        this.dataFeed = dataFeed;
        this.broker = broker;
        this.params = params;
        this.portfolioManager = new PortfolioManager();
    }

    /**
     * Execute the strategy once for the current date
     *
     * This method should be called:
     * - Daily after market close (e.g., via cron job at 5 PM ET)
     * - Or intraday for more frequent rebalancing
     *
     * @param date - Date to execute for (YYYY-MM-DD), defaults to today
     * @returns Execution result with decision, orders, and portfolio state
     */
    async runOnce(date?: string): Promise<LiveExecutionResult> {
        const executionDate = date || new Date().toISOString().split('T')[0];

        console.log(`[LIVE RUNNER] Executing strategy for ${executionDate}`);

        // 1. Fetch current market snapshot
        const snapshot = await this.dataFeed.getSnapshotForDate(executionDate);

        if (!snapshot) {
            throw new Error(`No market data available for ${executionDate}`);
        }

        // 2. Get current portfolio state from broker
        const portfolio = await this.broker.getPortfolioState();

        console.log('[LIVE RUNNER] Current portfolio:', {
            cash: portfolio.cash,
            position: portfolio.position,
            totalEquity: portfolio.totalEquity
        });

        // 3. Run strategy engine to get decision
        const decision = runStrategy(snapshot, portfolio, this.params);

        console.log('[LIVE RUNNER] Strategy decision:', decision);

        // 4. Calculate required orders
        const orders = this.portfolioManager.calculateOrders(
            decision,
            portfolio.position,
            portfolio.totalEquity,
            snapshot.prices
        );

        console.log('[LIVE RUNNER] Orders to execute:', orders);

        // 5. Execute orders (if any)
        let orderResults: any[] = [];
        if (orders.length > 0) {
            // NOTE: In a real implementation, you would:
            // - Validate market hours
            // - Check order limits
            // - Handle partial fills
            // - Implement retry logic
            // - Send notifications

            orderResults = await this.broker.placeOrders(orders);

            for (const result of orderResults) {
                if (result.success) {
                    console.log(`[LIVE RUNNER] ✓ Order filled: ${result.order.side} ${result.filledShares} ${result.order.symbol} @ ${result.fillPrice}`);
                } else {
                    console.error(`[LIVE RUNNER] ✗ Order failed: ${result.error}`);
                }
            }
        } else {
            console.log('[LIVE RUNNER] No rebalancing needed');
        }

        // 6. Get updated portfolio state
        const updatedPortfolio = await this.broker.getPortfolioState();

        // 7. Build and return result
        return {
            timestamp: new Date().toISOString(),
            decision: {
                symbol: decision.symbol,
                action: decision.action,
                weight: decision.weight,
                reason: decision.reason
            },
            orders: orderResults.map(r => ({
                symbol: r.order.symbol,
                side: r.order.side,
                shares: r.filledShares,
                status: r.success ? 'FILLED' : 'FAILED'
            })),
            portfolio: {
                cash: updatedPortfolio.cash,
                positions: updatedPortfolio.position ? [{
                    symbol: updatedPortfolio.position.symbol,
                    shares: updatedPortfolio.position.shares,
                    avgPrice: updatedPortfolio.position.avgEntryPrice,
                    currentPrice: snapshot.prices[updatedPortfolio.position.symbol],
                    marketValue: updatedPortfolio.position.shares * snapshot.prices[updatedPortfolio.position.symbol]
                }] : [],
                totalEquity: updatedPortfolio.totalEquity
            }
        };
    }

    /**
     * Dry run - execute strategy without placing real orders
     *
     * Useful for testing and validation before going live.
     *
     * @param date - Date to simulate for
     * @returns What would have been executed (without actual orders)
     */
    async dryRun(date?: string): Promise<LiveExecutionResult> {
        // Same as runOnce but skip the actual order execution
        // This is useful for paper trading and validation

        const executionDate = date || new Date().toISOString().split('T')[0];

        const snapshot = await this.dataFeed.getSnapshotForDate(executionDate);
        if (!snapshot) {
            throw new Error(`No market data available for ${executionDate}`);
        }

        const portfolio = await this.broker.getPortfolioState();
        const decision = runStrategy(snapshot, portfolio, this.params);

        const orders = this.portfolioManager.calculateOrders(
            decision,
            portfolio.position,
            portfolio.totalEquity,
            snapshot.prices
        );

        return {
            timestamp: new Date().toISOString(),
            decision: {
                symbol: decision.symbol,
                action: decision.action,
                weight: decision.weight,
                reason: decision.reason
            },
            orders: orders.map(o => ({
                symbol: o.symbol,
                side: o.side,
                shares: o.shares,
                status: 'DRY_RUN'
            })),
            portfolio: {
                cash: portfolio.cash,
                positions: portfolio.position ? [{
                    symbol: portfolio.position.symbol,
                    shares: portfolio.position.shares,
                    avgPrice: portfolio.position.avgEntryPrice,
                    currentPrice: snapshot.prices[portfolio.position.symbol],
                    marketValue: portfolio.position.shares * snapshot.prices[portfolio.position.symbol]
                }] : [],
                totalEquity: portfolio.totalEquity
            }
        };
    }
}
