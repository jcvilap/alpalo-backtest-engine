/**
 * Alpaca REST Client
 *
 * A lightweight wrapper around the official Alpaca Trade API SDK.
 * Provides a simplified interface for common trading operations.
 *
 * This client wraps @alpacahq/alpaca-trade-api with our application's
 * configuration and type definitions.
 *
 * API Documentation: https://alpaca.markets/docs/api-references/trading-api/
 */

import Alpaca from '@alpacahq/alpaca-trade-api';
import { getAlpacaConfig } from '../config/secrets';

/**
 * Account information from Alpaca
 */
export interface AlpacaAccount {
    /** Account ID */
    id: string;
    /** Account number */
    account_number: string;
    /** Account status (ACTIVE, etc.) */
    status: string;
    /** Account currency (USD) */
    currency: string;
    /** Current cash balance */
    cash: string;
    /** Portfolio value (cash + long positions - short positions) */
    portfolio_value: string;
    /** Buying power */
    buying_power: string;
    /** Equity value */
    equity: string;
    /** Last equity value */
    last_equity: string;
    /** Pattern day trader flag */
    pattern_day_trader: boolean;
    /** Trading blocked flag */
    trading_blocked: boolean;
    /** Transfers blocked flag */
    transfers_blocked: boolean;
    /** Account blocked flag */
    account_blocked: boolean;
    /** Created at timestamp */
    created_at: string;
}

/**
 * Position information from Alpaca
 */
export interface AlpacaPosition {
    /** Asset ID */
    asset_id: string;
    /** Symbol */
    symbol: string;
    /** Exchange */
    exchange: string;
    /** Asset class (us_equity) */
    asset_class: string;
    /** Average entry price */
    avg_entry_price: string;
    /** Quantity (negative for short) */
    qty: string;
    /** Side (long or short) */
    side: 'long' | 'short';
    /** Market value */
    market_value: string;
    /** Cost basis */
    cost_basis: string;
    /** Unrealized P&L */
    unrealized_pl: string;
    /** Unrealized P&L percentage */
    unrealized_plpc: string;
    /** Unrealized intraday P&L */
    unrealized_intraday_pl: string;
    /** Unrealized intraday P&L percentage */
    unrealized_intraday_plpc: string;
    /** Current asset price */
    current_price: string;
    /** Last day price */
    lastday_price: string;
    /** Change today percentage */
    change_today: string;
}

/**
 * Order request parameters
 */
export interface AlpacaOrderRequest {
    /** Symbol to trade */
    symbol: string;
    /** Number of shares (fractional allowed) */
    qty?: number;
    /** Notional amount in dollars (alternative to qty) */
    notional?: number;
    /** Side: buy or sell */
    side: 'buy' | 'sell';
    /** Order type */
    type: 'market' | 'limit' | 'stop' | 'stop_limit';
    /** Time in force */
    time_in_force: 'day' | 'gtc' | 'ioc' | 'fok';
    /** Limit price (for limit orders) */
    limit_price?: number;
    /** Stop price (for stop orders) */
    stop_price?: number;
    /** Client order ID */
    client_order_id?: string;
}

/**
 * Order response from Alpaca
 */
export interface AlpacaOrder {
    /** Order ID */
    id: string;
    /** Client order ID */
    client_order_id: string;
    /** Created at timestamp */
    created_at: string;
    /** Updated at timestamp */
    updated_at: string;
    /** Submitted at timestamp */
    submitted_at: string;
    /** Filled at timestamp */
    filled_at: string | null;
    /** Expired at timestamp */
    expired_at: string | null;
    /** Canceled at timestamp */
    canceled_at: string | null;
    /** Failed at timestamp */
    failed_at: string | null;
    /** Symbol */
    symbol: string;
    /** Asset ID */
    asset_id: string;
    /** Quantity */
    qty: string;
    /** Filled quantity */
    filled_qty: string;
    /** Order type */
    type: string;
    /** Side */
    side: string;
    /** Time in force */
    time_in_force: string;
    /** Limit price */
    limit_price: string | null;
    /** Stop price */
    stop_price: string | null;
    /** Filled average price */
    filled_avg_price: string | null;
    /** Status */
    status: string;
}

/**
 * Market clock information
 */
export interface AlpacaClock {
    /** Current timestamp */
    timestamp: string;
    /** Market open flag */
    is_open: boolean;
    /** Next market open */
    next_open: string;
    /** Next market close */
    next_close: string;
}

/**
 * Alpaca API Error
 */
export class AlpacaError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public response?: unknown
    ) {
        super(message);
        this.name = 'AlpacaError';
    }
}

/**
 * Alpaca REST Client
 *
 * Wraps the official Alpaca Trade API SDK with our configuration.
 */
export class AlpacaClient {
    private api: Alpaca;
    private isPaper: boolean;

    /**
     * Create a new Alpaca client
     *
     * @param isPaper - Whether to use paper trading (default: true)
     */
    constructor(isPaper: boolean = true) {
        const config = getAlpacaConfig(isPaper);
        this.isPaper = isPaper;

        // Initialize the official Alpaca SDK
        this.api = new Alpaca({
            keyId: config.keyId,
            secretKey: config.secretKey,
            paper: isPaper,
            timeout: 60000, // 60 second timeout
        });
    }

    /**
     * Get the underlying Alpaca API instance
     *
     * For advanced use cases that need direct SDK access
     */
    getApi(): Alpaca {
        return this.api;
    }

    /**
     * Get account information
     *
     * @returns Account details including cash, portfolio value, buying power
     */
    async getAccount(): Promise<AlpacaAccount> {
        try {
            return await this.api.getAccount() as unknown as AlpacaAccount;
        } catch (error: unknown) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const err = error as any;
            throw new AlpacaError(
                err.message || 'Failed to get account',
                err.response?.status,
                err.response?.data
            );
        }
    }

    /**
     * Get all current positions
     *
     * @returns Array of current positions
     */
    async getPositions(): Promise<AlpacaPosition[]> {
        try {
            return await this.api.getPositions() as unknown as AlpacaPosition[];
        } catch (error: unknown) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const err = error as any;
            throw new AlpacaError(
                err.message || 'Failed to get positions',
                err.response?.status,
                err.response?.data
            );
        }
    }

    /**
     * Get a specific position by symbol
     *
     * @param symbol - Stock symbol (e.g., 'TQQQ')
     * @returns Position details or null if no position exists
     */
    async getPosition(symbol: string): Promise<AlpacaPosition | null> {
        try {
            return await this.api.getPosition(symbol) as unknown as AlpacaPosition;
        } catch (error: unknown) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const err = error as any;
            // Return null if position doesn't exist (404)
            if (err.response?.status === 404) {
                return null;
            }
            throw new AlpacaError(
                err.message || `Failed to get position for ${symbol}`,
                err.response?.status,
                err.response?.data
            );
        }
    }

    /**
     * Submit a new order
     *
     * @param order - Order parameters
     * @returns Order confirmation
     */
    async submitOrder(order: AlpacaOrderRequest): Promise<AlpacaOrder> {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return await this.api.createOrder(order as any) as unknown as AlpacaOrder;
        } catch (error: unknown) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const err = error as any;
            throw new AlpacaError(
                err.message || 'Failed to submit order',
                err.response?.status,
                err.response?.data
            );
        }
    }

    /**
     * Get market clock
     *
     * Returns the current market status and next open/close times.
     *
     * @returns Market clock information
     */
    async getClock(): Promise<AlpacaClock> {
        try {
            return await this.api.getClock() as unknown as AlpacaClock;
        } catch (error: unknown) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const err = error as any;
            throw new AlpacaError(
                err.message || 'Failed to get market clock',
                err.response?.status,
                err.response?.data
            );
        }
    }

    /**
     * Cancel an order
     *
     * @param orderId - Order ID to cancel
     * @returns Success status
     */
    async cancelOrder(orderId: string): Promise<void> {
        try {
            await this.api.cancelOrder(orderId);
        } catch (error: unknown) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const err = error as any;
            throw new AlpacaError(
                err.message || `Failed to cancel order ${orderId}`,
                err.response?.status,
                err.response?.data
            );
        }
    }

    /**
     * Get all orders
     *
     * @param status - Filter by status (open, closed, all)
     * @param limit - Maximum number of orders to return
     * @returns Array of orders
     */
    async getOrders(status: 'open' | 'closed' | 'all' = 'open', limit: number = 50): Promise<AlpacaOrder[]> {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return await this.api.getOrders({ status, limit } as any) as unknown as AlpacaOrder[];
        } catch (error: unknown) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const err = error as any;
            throw new AlpacaError(
                err.message || 'Failed to get orders',
                err.response?.status,
                err.response?.data
            );
        }
    }

    /**
     * Check if current time is after 3 PM ET
     *
     * Useful for end-of-day trading logic
     */
    isAfter3PM(): boolean {
        const now = new Date();
        const estNow = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
        return estNow.getHours() >= 15;
    }
}
