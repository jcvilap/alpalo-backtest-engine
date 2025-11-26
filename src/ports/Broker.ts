/**
 * Broker Port Interface
 *
 * Abstracts order execution and portfolio management. Implementations can
 * simulate trades (backtesting) or execute real orders (live trading).
 *
 * This interface follows the "Ports and Adapters" pattern, allowing the strategy
 * engine to remain independent of execution mechanisms.
 */

import { Order } from '../lib/trade/types';
import { PortfolioState } from '../strategy/types';

/**
 * Order execution result
 */
export interface OrderResult {
    /** Original order */
    order: Order;

    /** Whether the order was successfully executed */
    success: boolean;

    /** Number of shares actually filled */
    filledShares: number;

    /** Actual fill price */
    fillPrice: number;

    /** Error message if order failed */
    error?: string;
}

/**
 * Broker interface for portfolio management and order execution
 *
 * Implementations:
 * - BacktestBroker: Simulates orders with slippage and commissions
 * - LiveBroker: Executes real orders via Alpaca API
 * - PaperBroker: Paper trading via Alpaca paper account
 */
export interface Broker {
    /**
     * Get current portfolio state
     *
     * @returns Current cash, positions, and total equity
     */
    getPortfolioState(): Promise<PortfolioState>;

    /**
     * Place one or more orders
     *
     * @param orders - Array of orders to execute
     * @returns Array of execution results
     */
    placeOrders(orders: Order[]): Promise<OrderResult[]>;

    /**
     * Get current prices for symbols
     *
     * @param symbols - Array of ticker symbols
     * @returns Map of symbol to current price
     */
    getCurrentPrices(symbols: string[]): Promise<Record<string, number>>;
}
