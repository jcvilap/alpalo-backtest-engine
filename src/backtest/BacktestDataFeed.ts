/**
 * BacktestDataFeed Implementation
 *
 * Provides market data for backtesting by wrapping pre-loaded OHLC arrays.
 * This adapter allows the strategy engine to access historical data without
 * knowing it's in a backtest environment.
 */

import { DataFeed } from '../ports/DataFeed';
import { MarketBar, MarketSnapshot } from '../strategy/types';
import { OHLC } from '../lib/types';

/**
 * Backtest-specific implementation of DataFeed
 *
 * This adapter wraps pre-loaded historical data arrays and provides
 * snapshot access for each date in the backtest period.
 */
export class BacktestDataFeed implements DataFeed {
    private qqqData: OHLC[];
    private tqqqData: OHLC[];
    private sqqqData: OHLC[];

    // Index maps for fast lookups
    private qqqByDate: Map<string, OHLC>;
    private tqqqByDate: Map<string, OHLC>;
    private sqqqByDate: Map<string, OHLC>;

    /**
     * Create a new BacktestDataFeed
     *
     * @param qqqData - Historical QQQ data (sorted by date)
     * @param tqqqData - Historical TQQQ data (sorted by date)
     * @param sqqqData - Historical SQQQ data (sorted by date)
     */
    constructor(qqqData: OHLC[], tqqqData: OHLC[], sqqqData: OHLC[]) {
        this.qqqData = qqqData;
        this.tqqqData = tqqqData;
        this.sqqqData = sqqqData;

        // Build index maps for O(1) lookups
        this.qqqByDate = new Map(qqqData.map(d => [d.date, d]));
        this.tqqqByDate = new Map(tqqqData.map(d => [d.date, d]));
        this.sqqqByDate = new Map(sqqqData.map(d => [d.date, d]));
    }

    /**
     * Get historical data for a symbol
     *
     * @param symbol - Ticker symbol (QQQ, TQQQ, or SQQQ)
     * @param from - Start date (YYYY-MM-DD)
     * @param to - End date (YYYY-MM-DD)
     * @returns Filtered array of OHLC bars
     */
    async getHistoricalData(symbol: string, from: string, to: string): Promise<MarketBar[]> {
        let data: OHLC[];

        switch (symbol) {
            case 'QQQ':
                data = this.qqqData;
                break;
            case 'TQQQ':
                data = this.tqqqData;
                break;
            case 'SQQQ':
                data = this.sqqqData;
                break;
            default:
                throw new Error(`Unknown symbol: ${symbol}`);
        }

        // Filter by date range
        return data.filter(d => d.date >= from && d.date <= to);
    }

    /**
     * Get a market snapshot for a specific date
     *
     * This builds a snapshot containing:
     * - All QQQ history up to this date (for indicator calculation)
     * - Current TQQQ and SQQQ bars
     * - Current prices
     *
     * @param date - Target date (YYYY-MM-DD)
     * @returns MarketSnapshot or null if data is missing
     */
    async getSnapshotForDate(date: string): Promise<MarketSnapshot | null> {
        // Find the index in QQQ data (the driver)
        const qqqIndex = this.qqqData.findIndex(d => d.date === date);
        if (qqqIndex === -1) {
            return null;
        }

        // Get bars for this date
        const tqqqBar = this.tqqqByDate.get(date);
        const sqqqBar = this.sqqqByDate.get(date);

        // Skip if missing TQQQ or SQQQ data
        if (!tqqqBar || !sqqqBar) {
            return null;
        }

        // Get all QQQ history up to and including this date
        const qqqHistory = this.qqqData.slice(0, qqqIndex + 1);

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
    }

    /**
     * Get the available date range for backtesting
     *
     * @returns First and last dates in the QQQ dataset
     */
    getAvailableDateRange(): { firstDate: string; lastDate: string } {
        if (this.qqqData.length === 0) {
            return { firstDate: '', lastDate: '' };
        }

        return {
            firstDate: this.qqqData[0].date,
            lastDate: this.qqqData[this.qqqData.length - 1].date
        };
    }
}
