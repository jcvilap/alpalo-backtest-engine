/**
 * BacktestBroker Implementation
 *
 * Simulates a broker for backtesting purposes. Tracks cash and positions,
 * executes orders with simulated fills, and maintains portfolio state.
 *
 * This implementation replicates the exact behavior of the current BacktestEngine
 * to ensure identical backtest results.
 */

import { Broker, OrderResult } from '../ports/Broker';
import { Order, Position } from '../lib/trade/types';
import { PortfolioState } from '../strategy/types';

/**
 * Backtest-specific implementation of Broker
 *
 * Simulates order execution and portfolio management for backtesting.
 * No slippage or commissions are applied (matching current engine behavior).
 */
export class BacktestBroker implements Broker {
    private cash: number;
    private position: Position | null = null;
    private currentPrices: Record<string, number> = {};

    /**
     * Create a new BacktestBroker
     *
     * @param initialCapital - Starting cash amount
     */
    constructor(initialCapital: number) {
        this.cash = initialCapital;
    }

    /**
     * Get current portfolio state
     *
     * @returns Portfolio state with cash, position, and total equity
     */
    async getPortfolioState(): Promise<PortfolioState> {
        let positionValue = 0;

        if (this.position && this.position.shares > 0) {
            const price = this.currentPrices[this.position.symbol] || this.position.avgEntryPrice;
            positionValue = this.position.shares * price;
        }

        return {
            cash: this.cash,
            position: this.position,
            totalEquity: this.cash + positionValue
        };
    }

    /**
     * Place one or more orders
     *
     * Executes orders sequentially, updating cash and positions.
     * This matches the behavior of the current BacktestEngine.
     *
     * @param orders - Array of orders to execute
     * @returns Array of execution results
     */
    async placeOrders(orders: Order[]): Promise<OrderResult[]> {
        const results: OrderResult[] = [];

        for (const order of orders) {
            const result = await this.executeOrder(order);
            results.push(result);
        }

        return results;
    }

    /**
     * Get current prices for symbols
     *
     * @param symbols - Array of ticker symbols
     * @returns Map of symbol to current price
     */
    async getCurrentPrices(symbols: string[]): Promise<Record<string, number>> {
        const prices: Record<string, number> = {};

        for (const symbol of symbols) {
            if (this.currentPrices[symbol] !== undefined) {
                prices[symbol] = this.currentPrices[symbol];
            }
        }

        return prices;
    }

    /**
     * Update current market prices
     *
     * This should be called by the runner at each time step to update prices
     * before calculating orders.
     *
     * @param prices - Map of symbol to current price
     */
    updatePrices(prices: Record<string, number>): void {
        this.currentPrices = { ...prices };
    }

    /**
     * Execute a single order
     *
     * This replicates the exact order execution logic from BacktestEngine.
     * No slippage or commissions are applied.
     *
     * @param order - Order to execute
     * @returns Execution result
     */
    private async executeOrder(order: Order): Promise<OrderResult> {
        const price = this.currentPrices[order.symbol];

        if (!price || price <= 0) {
            return {
                order,
                success: false,
                filledShares: 0,
                fillPrice: 0,
                error: `No price available for ${order.symbol}`
            };
        }

        if (order.side === 'BUY') {
            return this.executeBuy(order, price);
        } else {
            return this.executeSell(order, price);
        }
    }

    /**
     * Execute a BUY order
     *
     * Supports both share-based and notional (dollar-based) orders
     */
    private executeBuy(order: Order, price: number): OrderResult {
        // Calculate shares and cost based on order type
        let shares: number;
        let cost: number;

        if (order.shares !== undefined) {
            // Share-based order
            shares = order.shares;
            cost = shares * price;
        } else if (order.notional !== undefined) {
            // Dollar-based order (fractional shares)
            cost = order.notional;
            shares = cost / price;
        } else {
            return {
                order,
                success: false,
                filledShares: 0,
                fillPrice: price,
                error: 'Order must specify either shares or notional'
            };
        }

        // Check if we have enough cash
        if (this.cash < cost) {
            return {
                order,
                success: false,
                filledShares: 0,
                fillPrice: price,
                error: 'Insufficient cash'
            };
        }

        // Deduct cash
        this.cash -= cost;

        // Update position
        if (this.position && this.position.symbol === order.symbol) {
            // Add to existing position
            const totalShares = this.position.shares + shares;
            const avgPrice = ((this.position.shares * this.position.avgEntryPrice) + (shares * price)) / totalShares;
            this.position = {
                symbol: order.symbol,
                shares: totalShares,
                avgEntryPrice: avgPrice
            };
        } else {
            // New position
            this.position = {
                symbol: order.symbol,
                shares: shares,
                avgEntryPrice: price
            };
        }

        return {
            order,
            success: true,
            filledShares: shares,
            fillPrice: price
        };
    }

    /**
     * Execute a SELL order
     *
     * Supports both share-based and notional (dollar-based) orders
     */
    private executeSell(order: Order, price: number): OrderResult {
        // Check if we have a position to sell
        if (!this.position || this.position.symbol !== order.symbol) {
            return {
                order,
                success: false,
                filledShares: 0,
                fillPrice: price,
                error: `No position in ${order.symbol} to sell`
            };
        }

        // Calculate shares to sell based on order type
        let sellShares: number;

        if (order.shares !== undefined) {
            // Share-based order
            sellShares = Math.min(order.shares, this.position.shares);
        } else if (order.notional !== undefined) {
            // Dollar-based order - calculate shares from notional amount
            const requestedShares = order.notional / price;
            sellShares = Math.min(requestedShares, this.position.shares);
        } else {
            return {
                order,
                success: false,
                filledShares: 0,
                fillPrice: price,
                error: 'Order must specify either shares or notional'
            };
        }

        const proceeds = sellShares * price;

        // Add to cash
        this.cash += proceeds;

        // Update position
        this.position.shares -= sellShares;

        // Clear position if fully closed
        if (this.position.shares <= 0) {
            this.position = null;
        }

        return {
            order,
            success: true,
            filledShares: sellShares,
            fillPrice: price
        };
    }

    /**
     * Get cash balance
     *
     * @returns Current cash balance
     */
    getCash(): number {
        return this.cash;
    }

    /**
     * Get current position
     *
     * @returns Current position or null if flat
     */
    getPosition(): Position | null {
        return this.position ? { ...this.position } : null;
    }
}
