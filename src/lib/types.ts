export interface OHLC {
    date: string; // YYYY-MM-DD
    open: number;
    high: number;
    low: number;
    close: number;
}

export interface StrategySignal {
    symbol: string;
    action: 'BUY' | 'SELL' | 'HOLD';
    weight: number;
    reason: string;
}

export interface Strategy {
    name: string;
    analyze(data: OHLC[]): StrategySignal;
}
