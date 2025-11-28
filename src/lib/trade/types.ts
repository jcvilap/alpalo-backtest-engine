export interface Position {
    symbol: string;
    shares: number;
    avgEntryPrice: number;
}

/**
 * Order for execution
 *
 * Can specify either shares OR notional (dollar amount), but not both.
 * Notional orders allow for fractional shares and precise dollar-based position sizing.
 */
export interface Order {
    symbol: string;
    side: 'BUY' | 'SELL';

    /** Number of shares to trade (mutually exclusive with notional) */
    shares?: number;

    /** Dollar amount to trade (mutually exclusive with shares) */
    notional?: number;

    type: 'MARKET';
    reason?: string;
}
