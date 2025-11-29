/**
 * LiveRunner Orchestration Layer
 *
 * Orchestrates live trading execution for a specific account with
 * integrated notification support for monitoring and alerting.
 *
 * This follows the same pattern as BacktestRunner but is designed
 * for real-time execution with comprehensive error handling and
 * notification delivery.
 */

import { DataFeed } from '../ports/DataFeed';
import { Broker, OrderResult } from '../ports/Broker';
import { runStrategy } from '../strategy/engine';
import { StrategyParams, StrategyDecision } from '../strategy/types';
import { PortfolioManager } from '../lib/trade/PortfolioManager';
import { Notifier, NotificationLevel } from '../ports/Notifier';
import { AccountConfig } from '../config/accounts';
import { getNyDate } from '../lib/market/schedule';

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
        shares?: number;
        notional?: number;
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
 * LiveRunner - Orchestrates live trading for a specific account
 *
 * This class manages the execution of trading strategies for a single account,
 * with comprehensive notification support for monitoring and error handling.
 */
export class LiveRunner {
    private dataFeed: DataFeed;
    private broker: Broker;
    private params: StrategyParams;
    private portfolioManager: PortfolioManager;
    private notifier: Notifier;
    private accountConfig: AccountConfig;

    /**
     * Create a new LiveRunner
     *
     * @param dataFeed - Live data feed implementation (e.g., PolygonLiveDataFeed)
     * @param broker - Live broker implementation (e.g., AlpacaBroker)
     * @param params - Strategy parameters
     * @param notifier - Notifier for sending alerts and status updates
     * @param accountConfig - Configuration for the specific account being traded
     */
    constructor(
        dataFeed: DataFeed,
        broker: Broker,
        params: StrategyParams,
        notifier: Notifier,
        accountConfig: AccountConfig
    ) {
        this.dataFeed = dataFeed;
        this.broker = broker;
        this.params = params;
        this.portfolioManager = new PortfolioManager();
        this.notifier = notifier;
        this.accountConfig = accountConfig;
    }

    /**
     * Get a log prefix for this account
     */
    private getLogPrefix(): string {
        return `[${this.accountConfig.name}]`;
    }

    /**
     * Execute a pre-calculated strategy decision
     *
     * @param decision - The strategy decision to execute
     * @param snapshot - Market snapshot used for the decision
     * @returns Execution result
     */
    async executeDecision(decision: StrategyDecision, snapshot: any): Promise<LiveExecutionResult> {
        const executionDate = snapshot.date;
        const prefix = this.getLogPrefix();

        // Send starting notification
        await this.notifier.notify(
            `${this.accountConfig.name} - Starting Trading Run`,
            `Starting trading run for ${executionDate}\nMode: ${this.accountConfig.isPaper ? 'PAPER' : 'LIVE'}`,
            NotificationLevel.INFO,
            {
                account: this.accountConfig.name,
                date: executionDate,
                isPaper: this.accountConfig.isPaper
            }
        );

        console.log(`${prefix} Executing strategy for ${executionDate}`);

        try {
            // 1. Get current portfolio state from broker
            const portfolio = await this.broker.getPortfolioState();

            console.log(`${prefix} Current portfolio:`, {
                cash: portfolio.cash,
                position: portfolio.position,
                totalEquity: portfolio.totalEquity
            });

            // console.log(`${prefix} Strategy decision:`, decision);

            // 2. Calculate required orders
            const orders = this.portfolioManager.calculateOrders(
                decision,
                portfolio.position,
                portfolio.totalEquity,
                snapshot.prices
            );

            console.log(`${prefix} Orders to execute:`, orders);

            // 3. Execute orders (if any)
            let orderResults: OrderResult[] = [];
            if (orders.length > 0) {
                orderResults = await this.broker.placeOrders(orders);

                for (const result of orderResults) {
                    if (result.success) {
                        console.log(`${prefix} ✓ Order filled: ${result.order.side} ${result.filledShares} ${result.order.symbol} @ ${result.fillPrice}`);
                    } else {
                        console.error(`${prefix} ✗ Order failed: ${result.error}`);
                    }
                }
            } else {
                console.log(`${prefix} No rebalancing needed`);
            }

            // 4. Get updated portfolio state
            const updatedPortfolio = await this.broker.getPortfolioState();

            // 5. Build result
            const result: LiveExecutionResult = {
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
                    shares: r.order.shares !== undefined ? r.filledShares : undefined,
                    notional: r.order.notional !== undefined ? r.order.notional : undefined,
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

            // 6. Send success notification
            const successMessage = this.buildSuccessMessage(result);
            await this.notifier.notify(
                `${this.accountConfig.name} - Trading Run Completed`,
                successMessage,
                NotificationLevel.INFO,
                {
                    account: this.accountConfig.name,
                    date: executionDate,
                    decision: result.decision,
                    ordersPlaced: result.orders.length,
                    totalEquity: result.portfolio.totalEquity
                }
            );

            console.log(`${prefix} Trading run completed successfully`);

            return result;

        } catch (error) {
            // Send error notification
            const errorMessage = error instanceof Error ? error.message : String(error);
            const stackTrace = error instanceof Error ? error.stack : undefined;

            await this.notifier.notify(
                `${this.accountConfig.name} - Trading Run FAILED`,
                `❌ Error during trading run for ${executionDate}\n\n**Error:** ${errorMessage}\n\n**Stack Trace:**\n\`\`\`\n${stackTrace || 'No stack trace available'}\n\`\`\``,
                NotificationLevel.ERROR,
                {
                    account: this.accountConfig.name,
                    date: executionDate,
                    error: errorMessage,
                    stackTrace: stackTrace
                }
            );

            console.error(`${prefix} Trading run FAILED:`, error);

            // Re-throw to allow caller to handle
            throw error;
        }
    }

    /**
     * Dry run a pre-calculated strategy decision
     *
     * @param decision - The strategy decision to execute
     * @param snapshot - Market snapshot used for the decision
     * @returns Execution result
     */
    async dryRunDecision(decision: StrategyDecision, snapshot: any): Promise<LiveExecutionResult> {
        const executionDate = snapshot.date;
        const prefix = this.getLogPrefix();

        // Send starting notification
        await this.notifier.notify(
            `${this.accountConfig.name} - Starting Dry Run`,
            `Starting dry run (no real orders) for ${executionDate}\nMode: ${this.accountConfig.isPaper ? 'PAPER' : 'LIVE'}`,
            NotificationLevel.INFO,
            {
                account: this.accountConfig.name,
                date: executionDate,
                isPaper: this.accountConfig.isPaper,
                dryRun: true
            }
        );

        console.log(`${prefix} Executing DRY RUN for ${executionDate}`);

        try {
            const portfolio = await this.broker.getPortfolioState();

            console.log(`${prefix} Current portfolio:`, {
                cash: portfolio.cash,
                position: portfolio.position,
                totalEquity: portfolio.totalEquity
            });

            // console.log(`${prefix} Strategy decision:`, decision);

            const orders = this.portfolioManager.calculateOrders(
                decision,
                portfolio.position,
                portfolio.totalEquity,
                snapshot.prices
            );

            console.log(`${prefix} Orders (DRY RUN - not executed):`, orders);

            const result: LiveExecutionResult = {
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
                    notional: o.notional,
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

            // Send success notification
            const successMessage = this.buildSuccessMessage(result).replace('✅', '🧪');
            await this.notifier.notify(
                `${this.accountConfig.name} - Dry Run Completed`,
                `🧪 DRY RUN (No real orders placed)\n\n${successMessage}`,
                NotificationLevel.INFO,
                {
                    account: this.accountConfig.name,
                    date: executionDate,
                    decision: result.decision,
                    ordersWouldPlace: result.orders.length,
                    dryRun: true
                }
            );

            console.log(`${prefix} Dry run completed successfully`);

            return result;

        } catch (error) {
            // Send error notification
            const errorMessage = error instanceof Error ? error.message : String(error);
            const stackTrace = error instanceof Error ? error.stack : undefined;

            await this.notifier.notify(
                `${this.accountConfig.name} - Dry Run FAILED`,
                `❌ Error during dry run for ${executionDate}\n\n**Error:** ${errorMessage}\n\n**Stack Trace:**\n\`\`\`\n${stackTrace || 'No stack trace available'}\n\`\`\``,
                NotificationLevel.ERROR,
                {
                    account: this.accountConfig.name,
                    date: executionDate,
                    error: errorMessage,
                    stackTrace: stackTrace,
                    dryRun: true
                }
            );

            console.error(`${prefix} Dry run FAILED:`, error);

            // Re-throw to allow caller to handle
            throw error;
        }
    }

    /**
     * Build a success notification message with decision and order details
     */
    private buildSuccessMessage(result: LiveExecutionResult): string {
        const lines: string[] = [
            `✅ Trading run completed successfully`,
            ``,
            `**Decision:**`,
            `- Symbol: ${result.decision.symbol}`,
            `- Action: ${result.decision.action}`,
            `- Weight: ${(result.decision.weight * 100).toFixed(1)}%`,
            `- Reason: ${result.decision.reason}`,
            ``
        ];

        if (result.orders.length > 0) {
            lines.push(`**Orders Placed: ${result.orders.length}**`);
            for (const order of result.orders) {
                lines.push(`- ${order.side} ${order.shares} ${order.symbol} - ${order.status}`);
            }
            lines.push(``);
        } else {
            lines.push(`**Orders:** None (no rebalancing needed)`);
            lines.push(``);
        }

        lines.push(`**Portfolio:**`);
        lines.push(`- Cash: $${result.portfolio.cash.toFixed(2)}`);
        lines.push(`- Total Equity: $${result.portfolio.totalEquity.toFixed(2)}`);

        if (result.portfolio.positions.length > 0) {
            lines.push(`- Positions:`);
            for (const pos of result.portfolio.positions) {
                lines.push(`  - ${pos.symbol}: ${pos.shares} shares @ $${pos.currentPrice.toFixed(2)} = $${pos.marketValue.toFixed(2)}`);
            }
        }

        return lines.join('\n');
    }

    /**
     * Legacy method - kept for compatibility but delegates to executeDecision
     */
    async runOnce(date?: string): Promise<LiveExecutionResult> {
        const executionDate = date || getNyDate();
        const snapshot = await this.dataFeed.getSnapshotForDate(executionDate);
        if (!snapshot) {
            throw new Error(`No market data available for ${executionDate}`);
        }
        const portfolio = await this.broker.getPortfolioState();
        const decision = runStrategy(snapshot, portfolio, this.params);
        return this.executeDecision(decision, snapshot);
    }

    /**
     * Legacy method - kept for compatibility but delegates to dryRunDecision
     */
    async dryRun(date?: string): Promise<LiveExecutionResult> {
        const executionDate = date || getNyDate();
        const snapshot = await this.dataFeed.getSnapshotForDate(executionDate);
        if (!snapshot) {
            throw new Error(`No market data available for ${executionDate}`);
        }
        const portfolio = await this.broker.getPortfolioState();
        const decision = runStrategy(snapshot, portfolio, this.params);
        return this.dryRunDecision(decision, snapshot);
    }
}
