/**
 * DataFeed Port Interface
 *
 * Abstracts data access for the trading system. Implementations can fetch data
 * from different sources (historical backtest data, live market APIs, cached files, etc.)
 *
 * This interface follows the "Ports and Adapters" pattern, allowing the strategy
 * engine to remain independent of data sources.
 */

import { MarketBar, MarketSnapshot } from '../strategy/types';

/**
 * DataFeed interface for accessing market data
 *
 * Implementations:
 * - BacktestDataFeed: Provides historical data from pre-loaded arrays
 * - LiveDataFeed: Fetches real-time data from Alpaca/Polygon APIs
 * - CachedDataFeed: Reads from local cache files
 */
export interface DataFeed {
    /**
     * Get historical OHLC data for a symbol
     *
     * @param symbol - Ticker symbol (e.g., 'QQQ', 'TQQQ', 'SQQQ')
     * @param from - Start date (YYYY-MM-DD)
     * @param to - End date (YYYY-MM-DD)
     * @returns Array of OHLC bars sorted by date (ascending)
     */
    getHistoricalData(symbol: string, from: string, to: string): Promise<MarketBar[]>;

    /**
     * Get a complete market snapshot for a specific date
     *
     * This is the primary method used by the strategy engine. It provides
     * all the data needed to make a trading decision at a specific point in time.
     *
     * @param date - Date to get snapshot for (YYYY-MM-DD)
     * @returns Market snapshot with QQQ history and current TQQQ/SQQQ bars
     */
    getSnapshotForDate(date: string): Promise<MarketSnapshot | null>;

    /**
     * Get the available date range for backtesting
     *
     * @returns Object with first and last available dates
     */
    getAvailableDateRange(): { firstDate: string; lastDate: string };
}
