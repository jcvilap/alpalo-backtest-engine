export interface Position {
    symbol: string;
    shares: number;
    avgEntryPrice: number;
}

export interface Order {
    symbol: string;
    side: 'BUY' | 'SELL';
    shares: number;
    type: 'MARKET';
    reason?: string;
}
