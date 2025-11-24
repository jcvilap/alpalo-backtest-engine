import { OHLC } from '../types';
import fs from 'fs';
import path from 'path';
import { toNYDate, getNYNow, formatNYDate } from '../utils/dateUtils';

import os from 'os';

const BASE_URL = 'https://api.polygon.io/v2/aggs/ticker';
// Use /tmp in production (Vercel) or local cache dir in development
const CACHE_DIR = process.env.NODE_ENV === 'production'
    ? path.join(os.tmpdir(), 'alpalo-cache')
    : path.join(process.cwd(), 'cache');

export class PolygonClient {
    constructor() {
        try {
            if (!fs.existsSync(CACHE_DIR)) {
                fs.mkdirSync(CACHE_DIR, { recursive: true });
            }
        } catch (e) {
            console.warn('Failed to create cache directory, caching disabled:', e);
        }
    }

    private getCacheFilePath(ticker: string): string {
        return path.join(CACHE_DIR, `${ticker}.json`);
    }

    private loadCache(ticker: string): OHLC[] {
        const filePath = this.getCacheFilePath(ticker);
        if (fs.existsSync(filePath)) {
            try {
                const data = fs.readFileSync(filePath, 'utf-8');
                return JSON.parse(data);
            } catch (e) {
                console.error(`Error reading cache for ${ticker}:`, e);
                return [];
            }
        }
        return [];
    }

    private saveCache(ticker: string, data: OHLC[]) {
        const filePath = this.getCacheFilePath(ticker);

        // Filter out today's data if market hasn't closed yet (before 4pm NY time)
        const now = new Date();
        const nyTime = toNYDate(now); // Convert to NY timezone
        const nyHour = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' })).getHours();
        const todayStr = formatNYDate(nyTime);

        // Only cache today's data if it's after 4pm NY time (market close)
        const isAfterMarketClose = nyHour >= 16;
        const dataToCache = isAfterMarketClose
            ? data
            : data.filter(item => item.date !== todayStr);

        // Sort by date and deduplicate
        const uniqueData = Array.from(new Map(dataToCache.map(item => [item.date, item])).values())
            .sort((a, b) => toNYDate(a.date).getTime() - toNYDate(b.date).getTime());

        fs.writeFileSync(filePath, JSON.stringify(uniqueData, null, 2));
    }

    async fetchAggregates(ticker: string, from: string, to: string): Promise<OHLC[]> {
        const MIN_DATE = '1999-03-10';

        // 1. Load Cache
        let cachedData = this.loadCache(ticker);

        // 2. Check what we have
        if (cachedData.length > 0) {
            const cacheStart = cachedData[0].date;
            const cacheEnd = cachedData[cachedData.length - 1].date;

            let reqStart = toNYDate(from);
            const reqEnd = toNYDate(to);
            const cStart = toNYDate(cacheStart);
            const cEnd = toNYDate(cacheEnd);
            const minDateObj = toNYDate(MIN_DATE);

            // Clamp request start to MIN_DATE
            if (reqStart < minDateObj) {
                reqStart = minDateObj;
            }

            // If request is fully within cache, return cached slice
            if (reqStart >= cStart && reqEnd <= cEnd) {
                console.log(`[CACHE HIT] ${ticker}: ${from} to ${to}`);
                return cachedData.filter(d => {
                    const dDate = toNYDate(d.date);
                    return dDate >= reqStart && dDate <= reqEnd;
                });
            }

            // Identify missing ranges
            const promises: Promise<OHLC[]>[] = [];

            // Missing Head
            // Only fetch head if we don't already have data starting from MIN_DATE
            if (reqStart < cStart && cStart > minDateObj) {
                const headEnd = toNYDate(cStart);
                headEnd.setDate(headEnd.getDate() - 1);
                console.log(`[CACHE MISS HEAD] ${ticker}: ${formatNYDate(reqStart)} to ${formatNYDate(headEnd)}`);
                promises.push(this.fetchFromApi(ticker, formatNYDate(reqStart), formatNYDate(headEnd)));
            }

            // Missing Tail
            if (reqEnd > cEnd) {
                const tailStart = toNYDate(cEnd);
                tailStart.setDate(tailStart.getDate() + 1);

                // Skip weekends for tail start (use UTC to match the date string)
                // Note: toNYDate returns a Date object in NY timezone.
                // getDay() returns 0 for Sunday, 6 for Saturday in local time of the Date object (which is NY time here effectively if we trust toNYDate)
                // Wait, toZonedTime returns a Date instance which is just a timestamp.
                // When we call getDay(), it uses the system local timezone unless we use getUTCDay() or date-fns-tz helpers.
                // However, since we are running on a server/machine, we should be careful.
                // But dateUtils says toNYDate returns a Date.
                // Let's stick to simple logic: if we format it back to string, we get NY date.
                // We can use date-fns isWeekend which takes a Date.
                // But we need to be careful if the Date object represents a specific instant.
                // Let's assume for now the simplified logic is fine or use date-fns helpers if imported.
                // Actually, let's just use the loop as before but careful with timezone.
                // Better yet, just let the API handle it if we ask for a range including weekends, it just returns empty for those days.
                // The loop was to avoid asking for future data.

                while (tailStart.getDay() === 0 || tailStart.getDay() === 6) {
                    tailStart.setDate(tailStart.getDate() + 1);
                }

                // Ensure tailStart is not in the future relative to today
                const today = getNYNow();
                // Reset time part of today for accurate comparison
                today.setHours(0, 0, 0, 0);

                if (tailStart <= today && tailStart <= reqEnd) {
                    console.log(`[CACHE MISS TAIL] ${ticker}: ${formatNYDate(tailStart)} to ${to}`);
                    promises.push(this.fetchFromApi(ticker, formatNYDate(tailStart), to));
                }
            }

            if (promises.length > 0) {
                try {
                    const newSegments = await Promise.all(promises);
                    const allNewData = newSegments.flat();
                    if (allNewData.length > 0) {
                        cachedData = [...cachedData, ...allNewData];
                        this.saveCache(ticker, cachedData);
                    }
                } catch (error) {
                    // If API fetch fails (e.g., Forbidden for old data), continue with cached data
                    console.warn(`Failed to fetch additional data for ${ticker}:`, error instanceof Error ? error.message : error);
                    // Don't throw - use cached data we have
                }
            }

            // Return requested range from updated cache
            return cachedData.filter(d => {
                const dDate = toNYDate(d.date);
                return dDate >= reqStart && dDate <= reqEnd;
            });
        } else {
            // No cache - fetch from API
            console.log(`[CACHE EMPTY] ${ticker}: Fetching fresh data`);
            try {
                const data = await this.fetchFromApi(ticker, from, to);
                this.saveCache(ticker, data);
                return data;
            } catch (error) {
                console.error(`Failed to fetch data for ${ticker}:`, error instanceof Error ? error.message : error);
                return []; // Return empty array instead of throwing
            }
        }
    }

    private async fetchFromApi(ticker: string, from: string, to: string): Promise<OHLC[]> {
        const apiKey = process.env.POLYGON_API_KEY;
        console.log('[DEBUG] POLYGON_API_KEY exists:', !!apiKey, 'length:', apiKey?.length);
        if (!apiKey) {
            throw new Error('POLYGON_API_KEY is not set');
        }
        // Polygon API errors if from > to (e.g. asking for a weekend gap or invalid range)
        if (toNYDate(from) > toNYDate(to)) {
            return [];
        }

        const url = `${BASE_URL}/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&limit=50000&apiKey=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
            let errorMessage = response.statusText;
            try {
                const errorBody = await response.text(); // Try to read body
                if (errorBody) {
                    errorMessage = `${response.statusText} - ${errorBody}`;
                }
            } catch {
                // Ignore body parsing error
            }
            throw new Error(`Failed to fetch data for ${ticker}: ${errorMessage}`);
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            return [];
        }

        interface PolygonResult {
            t: number;
            o: number;
            h: number;
            l: number;
            c: number;
            v: number;
        }

        return data.results.map((res: PolygonResult) => ({
            date: formatNYDate(res.t), // Use formatNYDate to ensure the date string is in NY time
            open: res.o,
            high: res.h,
            low: res.l,
            close: res.c,
            volume: res.v
        }));
    }
}
