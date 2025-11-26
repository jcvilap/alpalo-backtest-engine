/**
 * Alpaca REST Client
 *
 * A lightweight HTTP client for interacting with Alpaca's trading API.
 * Handles authentication, request formatting, and response parsing.
 *
 * This is a pure client layer with no business logic - it simply wraps
 * the HTTP calls to Alpaca's REST API.
 *
 * API Documentation: https://alpaca.markets/docs/api-references/trading-api/
 */

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
 * Handles authentication and HTTP requests to Alpaca's trading API.
 */
export class AlpacaClient {
    private baseUrl: string;
    private keyId: string;
    private secretKey: string;

    /**
     * Create a new Alpaca client
     *
     * @param isPaper - Whether to use paper trading (default: true)
     */
    constructor(isPaper: boolean = true) {
        const config = getAlpacaConfig(isPaper);
        this.baseUrl = config.baseUrl;
        this.keyId = config.keyId;
        this.secretKey = config.secretKey;
    }

    /**
     * Make an authenticated request to Alpaca API
     *
     * @param path - API endpoint path (e.g., '/v2/account')
     * @param options - Fetch options (method, body, etc.)
     * @returns Parsed JSON response
     */
    private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.baseUrl}${path}`;

        const headers: HeadersInit = {
            'APCA-API-KEY-ID': this.keyId,
            'APCA-API-SECRET-KEY': this.secretKey,
            'Content-Type': 'application/json',
            ...options.headers
        };

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            // Parse response body
            const text = await response.text();
            let data: unknown;

            try {
                data = text ? JSON.parse(text) : null;
            } catch {
                data = text;
            }

            // Check for errors
            if (!response.ok) {
                const errorMessage = typeof data === 'object' && data && 'message' in data
                    ? String((data as { message: string }).message)
                    : `HTTP ${response.status}: ${response.statusText}`;

                throw new AlpacaError(errorMessage, response.status, data);
            }

            return data as T;
        } catch (error) {
            if (error instanceof AlpacaError) {
                throw error;
            }

            throw new AlpacaError(
                `Request failed: ${error instanceof Error ? error.message : String(error)}`
            );
        }
    }

    /**
     * Get account information
     *
     * @returns Account details including cash, portfolio value, buying power
     */
    async getAccount(): Promise<AlpacaAccount> {
        return this.request<AlpacaAccount>('/v2/account');
    }

    /**
     * Get all current positions
     *
     * @returns Array of current positions
     */
    async getPositions(): Promise<AlpacaPosition[]> {
        return this.request<AlpacaPosition[]>('/v2/positions');
    }

    /**
     * Get a specific position by symbol
     *
     * @param symbol - Stock symbol (e.g., 'TQQQ')
     * @returns Position details or null if no position exists
     */
    async getPosition(symbol: string): Promise<AlpacaPosition | null> {
        try {
            return await this.request<AlpacaPosition>(`/v2/positions/${symbol}`);
        } catch (error) {
            if (error instanceof AlpacaError && error.statusCode === 404) {
                return null;
            }
            throw error;
        }
    }

    /**
     * Submit a new order
     *
     * @param order - Order parameters
     * @returns Order confirmation
     */
    async submitOrder(order: AlpacaOrderRequest): Promise<AlpacaOrder> {
        return this.request<AlpacaOrder>('/v2/orders', {
            method: 'POST',
            body: JSON.stringify(order)
        });
    }

    /**
     * Get market clock
     *
     * Returns the current market status and next open/close times.
     *
     * @returns Market clock information
     */
    async getClock(): Promise<AlpacaClock> {
        return this.request<AlpacaClock>('/v2/clock');
    }

    /**
     * Cancel an order
     *
     * @param orderId - Order ID to cancel
     * @returns Success status
     */
    async cancelOrder(orderId: string): Promise<void> {
        await this.request<void>(`/v2/orders/${orderId}`, {
            method: 'DELETE'
        });
    }

    /**
     * Get all orders
     *
     * @param status - Filter by status (open, closed, all)
     * @param limit - Maximum number of orders to return
     * @returns Array of orders
     */
    async getOrders(status: 'open' | 'closed' | 'all' = 'open', limit: number = 50): Promise<AlpacaOrder[]> {
        return this.request<AlpacaOrder[]>(`/v2/orders?status=${status}&limit=${limit}`);
    }
}
