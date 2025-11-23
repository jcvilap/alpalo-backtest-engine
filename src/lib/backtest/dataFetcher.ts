import { PolygonClient } from '../polygon/client';
import { OHLC } from '../types';

export interface BacktestData {
    qqqData: OHLC[];
    tqqqData: OHLC[];
    sqqqData: OHLC[];
}

/**
 * Fetches all required data for the backtest engine
 * @param client PolygonClient instance
 * @param startDate Start date (YYYY-MM-DD)
 * @param endDate End date (YYYY-MM-DD)
 * @returns Promise resolving to object containing QQQ, TQQQ, and SQQQ data
 */
export async function fetchBacktestData(
    client: PolygonClient,
    startDate: string,
    endDate: string
): Promise<BacktestData> {
    const [qqqData, tqqqData, sqqqData] = await Promise.all([
        client.fetchAggregates('QQQ', startDate, endDate),
        client.fetchAggregates('TQQQ', startDate, endDate),
        client.fetchAggregates('SQQQ', startDate, endDate)
    ]);

    return { qqqData, tqqqData, sqqqData };
}
