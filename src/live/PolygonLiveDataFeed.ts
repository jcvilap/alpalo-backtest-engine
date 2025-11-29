/**
 * PolygonLiveDataFeed Implementation
 *
 * Provides live/historical market data for trading by fetching from Polygon API.
 * This adapter allows the strategy engine to access real-time data using the
 * same interface as backtesting.
 *
 * Key features:
 * - Fetches historical QQQ data for indicator calculation
 * - Gets current TQQQ/SQQQ bars
 * - Returns MarketSnapshot compatible with strategy engine
 */

import { DataFeed } from '../ports/DataFeed';
import { MarketBar, MarketSnapshot } from '../strategy/types';
import { PolygonClient } from '../lib/polygon/client';
import { subDays } from 'date-fns';
import { formatNYDate, toNYDate } from '../lib/utils/dateUtils';

/**
 * Number of historical days to fetch for indicator calculation
 * Must be at least 200 for MA200 calculation
 */
const HISTORICAL_LOOKBACK_DAYS = 400;

/**
 * Live implementation of DataFeed using Polygon API
 *
 * This adapter fetches real-time market data from Polygon and provides
 * snapshot access for each date. It ensures the same indicator data
 * (MA, ROC) is available as in backtesting mode.
 */
export class PolygonLiveDataFeed implements DataFeed {
    private polygonClient: PolygonClient;

    /**
     * Create a new PolygonLiveDataFeed
     *
     * @param polygonClient - Optional Polygon client instance (for testing)
     */
    constructor(polygonClient?: PolygonClient) {
        this.polygonClient = polygonClient || new PolygonClient();
    }

    /**
     * Get historical data for a symbol
     *
     * @param symbol - Ticker symbol (QQQ, TQQQ, or SQQQ)
     * @param from - Start date (YYYY-MM-DD)
     * @param to - End date (YYYY-MM-DD)
     * @returns Array of OHLC bars
     */
    async getHistoricalData(symbol: string, from: string, to: string): Promise<MarketBar[]> {
        return this.polygonClient.fetchAggregates(symbol, from, to);
    }

    /**
     * Get a market snapshot for a specific date
     *
     * This builds a snapshot containing:
     * - Historical QQQ data (up to 250 days before target date)
     * - Current TQQQ and SQQQ bars for the target date
     * - Current prices
     *
     * The snapshot structure matches BacktestDataFeed exactly, ensuring
     * the strategy engine receives the same inputs regardless of mode.
     *
     * @param date - Target date (YYYY-MM-DD)
     * @returns MarketSnapshot or null if data is missing
     */
    async getSnapshotForDate(date: string): Promise<MarketSnapshot | null> {
        try {
            const targetDate = toNYDate(date);

            // Calculate the start date for historical data
            // We need at least 200 days for MA200, fetch 250 to have buffer
            const historicalStartDate = subDays(targetDate, HISTORICAL_LOOKBACK_DAYS);
            const historicalStart = formatNYDate(historicalStartDate);

            // Fetch historical data for all symbols in parallel
            const [qqqHistory, tqqqData, sqqqData] = await Promise.all([
                this.polygonClient.fetchAggregates('QQQ', historicalStart, date),
                this.polygonClient.fetchAggregates('TQQQ', date, date),
                this.polygonClient.fetchAggregates('SQQQ', date, date)
            ]);

            // Validate we have the required data
            if (qqqHistory.length === 0) {
                console.warn(`No QQQ data available for date ${date}`);
                return null;
            }

            // Get the bars for the target date
            const tqqqBar = tqqqData.find(bar => bar.date === date);
            const sqqqBar = sqqqData.find(bar => bar.date === date);

            if (!tqqqBar || !sqqqBar) {
                console.warn(`Missing TQQQ or SQQQ data for date ${date}`);
                return null;
            }

            // Build the market snapshot
            return {
                date,
                qqqHistory,
                tqqqBar,
                sqqqBar,
                prices: {
                    TQQQ: tqqqBar.close,
                    SQQQ: sqqqBar.close
                }
            };
        } catch (error) {
            console.error(`Error fetching snapshot for date ${date}:`, error);
            return null;
        }
    }

    /**
     * Get the available date range for backtesting
     *
     * For live data feed, this returns a range based on the current date
     * minus the historical lookback period.
     *
     * @returns Object with first and last available dates
     */
    getAvailableDateRange(): { firstDate: string; lastDate: string } {
        const today = new Date();
        const firstDate = subDays(today, HISTORICAL_LOOKBACK_DAYS);

        return {
            firstDate: formatNYDate(firstDate),
            lastDate: formatNYDate(today)
        };
    }
}
