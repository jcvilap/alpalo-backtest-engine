import { OHLC } from '../types';
import { toNYDate, getNYNow, formatNYDate } from '../utils/dateUtils';
import { addDays } from 'date-fns';
import { createClient, RedisClientType } from 'redis';
import * as fs from 'fs';
import * as path from 'path';

const CACHE_DIR = path.join(process.cwd(), 'cache');

const BASE_URL = 'https://api.polygon.io/v2/aggs/ticker';

// Initialize Redis client
let redis: RedisClientType | null = null;

if (process.env.REDIS_URL) {
    redis = createClient({ url: process.env.REDIS_URL });

    redis.on('connect', () => console.log('[REDIS] Connected successfully'));
    redis.on('error', (err) => console.error('[REDIS] Connection error:', err.message));

    // Connect to Redis
    redis.connect().catch((err) => {
        console.error('[REDIS] Failed to connect:', err.message);
        redis = null;
    });
} else {
    console.warn('[REDIS] No REDIS_URL found - caching disabled');
}

interface MarketStatusEvent {
    date: string;
    status?: string;
    name?: string;
}

interface MarketCalendar {
    year: number;
    holidays: Set<string>;
    tradingDays: Set<string>;
    fetchedAt: string;
    holidaysArray?: string[];
    tradingDaysArray?: string[];
}

export class PolygonClient {
    private calendarCache: Map<number, MarketCalendar> = new Map();

    constructor() {
        // Redis initialization happens at module level
        if (!redis) {
            console.warn('[POLYGON] Redis not configured - OHLC caching disabled');
        }
    }

    private async loadCalendar(year: number): Promise<MarketCalendar | null> {
        // 1. Try Redis
        if (redis) {
            try {
                const key = `market-calendar-${year}`;
                const cached = await redis.get(key);
                if (cached) {
                    const parsed = JSON.parse(cached) as MarketCalendar;
                    parsed.holidays = new Set(parsed.holidaysArray ?? []);
                    parsed.tradingDays = new Set(parsed.tradingDaysArray ?? []);
                    return parsed;
                }
            } catch (error) {
                console.warn(`[REDIS] Failed to read calendar cache for ${year}:`, error);
            }
        }

        // 2. Try File System
        try {
            const filePath = path.join(CACHE_DIR, `market-calendar-${year}.json`);
            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf-8');
                const parsed = JSON.parse(content) as MarketCalendar;
                parsed.holidays = new Set(parsed.holidaysArray ?? []);
                parsed.tradingDays = new Set(parsed.tradingDaysArray ?? []);
                console.log(`[FS] Loaded calendar for ${year} from file`);
                return parsed;
            }
        } catch (error) {
            console.warn(`[FS] Failed to read calendar file for ${year}:`, error);
        }

        return null;
    }

    private async saveCalendar(calendar: MarketCalendar): Promise<void> {
        const payload = {
            year: calendar.year,
            fetchedAt: calendar.fetchedAt,
            holidaysArray: Array.from(calendar.holidays),
            tradingDaysArray: Array.from(calendar.tradingDays)
        };
        const jsonPayload = JSON.stringify(payload);

        // 1. Save to Redis
        if (redis) {
            try {
                const key = `market-calendar-${calendar.year}`;
                await redis.set(key, jsonPayload);
            } catch (error) {
                console.error(`[REDIS] Failed to save calendar cache for ${calendar.year}:`, error);
            }
        }

        // 2. Save to File System
        try {
            if (!fs.existsSync(CACHE_DIR)) {
                fs.mkdirSync(CACHE_DIR, { recursive: true });
            }
            const filePath = path.join(CACHE_DIR, `market-calendar-${calendar.year}.json`);
            fs.writeFileSync(filePath, jsonPayload);
            console.log(`[FS] Saved calendar for ${calendar.year} to file`);
        } catch (error) {
            console.error(`[FS] Failed to save calendar file for ${calendar.year}:`, error);
        }
    }

    private async fetchCalendarFromApi(year: number): Promise<MarketCalendar> {
        const apiKey = process.env.POLYGON_API_KEY;
        if (!apiKey) {
            throw new Error('POLYGON_API_KEY is not set');
        }

        const url = `https://api.polygon.io/v1/marketstatus/upcoming?apiKey=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch market calendar: ${response.statusText}`);
        }

        const data = await response.json();
        const events: MarketStatusEvent[] = Array.isArray(data) ? data : data?.results || data || [];

        const holidayDates = new Set<string>();
        events
            .filter(event => event?.date && toNYDate(event.date).getFullYear() === year)
            .forEach(event => {
                const eventDateStr = formatNYDate(event.date);
                if ((event.status && event.status !== 'open') || event.name?.toLowerCase().includes('holiday')) {
                    holidayDates.add(eventDateStr);
                }
            });

        // Manual patch for 2025 holidays that might be in the past (API only returns upcoming)
        if (year === 2025) {
            holidayDates.add('2025-11-27'); // Thanksgiving
        }

        const tradingDays = this.computeTradingDaysForYear(year, holidayDates);
        const calendar: MarketCalendar = {
            year,
            holidays: holidayDates,
            tradingDays,
            fetchedAt: new Date().toISOString(),
            holidaysArray: Array.from(holidayDates),
            tradingDaysArray: Array.from(tradingDays)
        };

        this.saveCalendar(calendar);
        return calendar;
    }

    private computeTradingDaysForYear(year: number, holidays: Set<string>): Set<string> {
        const tradingDays = new Set<string>();
        const current = new Date(Date.UTC(year, 0, 1));
        const end = new Date(Date.UTC(year + 1, 0, 1));

        while (current < end) {
            const nyDate = toNYDate(current);
            const day = nyDate.getDay();
            const dateStr = formatNYDate(nyDate);

            if (day !== 0 && day !== 6 && !holidays.has(dateStr)) {
                tradingDays.add(dateStr);
            }
            current.setUTCDate(current.getUTCDate() + 1);
        }

        return tradingDays;
    }

    private async getCalendar(year: number): Promise<MarketCalendar> {
        if (this.calendarCache.has(year)) {
            return this.calendarCache.get(year)!;
        }

        const cached = await this.loadCalendar(year);
        if (cached) {
            this.calendarCache.set(year, cached);
            return cached;
        }

        const fresh = await this.fetchCalendarFromApi(year);
        this.calendarCache.set(year, fresh);
        return fresh;
    }

    private async getCalendarForDate(date: Date): Promise<MarketCalendar> {
        const year = toNYDate(date).getFullYear();
        return this.getCalendar(year);
    }

    private isTradingDay(date: Date, calendar: MarketCalendar): boolean {
        const dateStr = formatNYDate(date);
        return calendar.tradingDays.has(dateStr);
    }

    private async ensureNextYearCalendarIfNeeded() {
        const now = getNYNow();
        if (now.getMonth() === 0 && now.getDate() === 1) {
            await this.getCalendar(now.getFullYear() + 1);
        }
    }

    private async shouldFetchTodayData(): Promise<boolean> {
        const now = getNYNow();
        const calendar = await this.getCalendarForDate(now);
        const isTradingDay = this.isTradingDay(now, calendar);

        if (!isTradingDay) {
            return false;
        }

        const minutes = now.getHours() * 60 + now.getMinutes();
        const marketCloseMinutes = 16 * 60;
        return minutes >= marketCloseMinutes - 10;
    }

    private async loadCache(ticker: string): Promise<OHLC[]> {
        // 1. Try Redis
        if (redis) {
            try {
                const key = `ohlc:${ticker}`;
                const cached = await redis.get(key);
                if (cached) {
                    return JSON.parse(cached) as OHLC[];
                }
            } catch (e) {
                console.error(`[REDIS] Error reading cache for ${ticker}:`, e);
            }
        }

        // 2. Try File System
        try {
            const filePath = path.join(CACHE_DIR, `${ticker}.json`);
            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf-8');
                const data = JSON.parse(content) as OHLC[];
                console.log(`[FS] Loaded ${data.length} records for ${ticker} from file`);
                return data;
            }
        } catch (e) {
            console.error(`[FS] Error reading cache file for ${ticker}:`, e);
        }

        return [];
    }

    private async saveCache(ticker: string, data: OHLC[], allowToday: boolean = true): Promise<void> {
        const now = getNYNow();
        const todayStr = formatNYDate(now);
        const minutes = now.getHours() * 60 + now.getMinutes();
        const marketCloseMinutes = 16 * 60;

        const isAfterMarketClose = minutes >= marketCloseMinutes;
        const dataToCache = allowToday && isAfterMarketClose
            ? data
            : data.filter(item => item.date !== todayStr);

        // Sort by date and deduplicate
        const uniqueData = Array.from(new Map(dataToCache.map(item => [item.date, item])).values())
            .sort((a, b) => toNYDate(a.date).getTime() - toNYDate(b.date).getTime());

        const jsonPayload = JSON.stringify(uniqueData);

        // 1. Save to Redis
        if (redis) {
            try {
                const key = `ohlc:${ticker}`;
                await redis.set(key, jsonPayload);
                console.log(`[REDIS] Saved ${uniqueData.length} records for ${ticker}`);
            } catch (e) {
                console.error(`[REDIS] Error writing cache for ${ticker}:`, e);
            }
        } else {
            console.warn(`[REDIS] Not available, skipping Redis save for ${ticker}`);
        }

        // 2. Save to File System
        try {
            if (!fs.existsSync(CACHE_DIR)) {
                fs.mkdirSync(CACHE_DIR, { recursive: true });
            }
            const filePath = path.join(CACHE_DIR, `${ticker}.json`);
            fs.writeFileSync(filePath, jsonPayload);
            console.log(`[FS] Saved ${uniqueData.length} records for ${ticker} to file`);
        } catch (e) {
            console.error(`[FS] Error writing cache file for ${ticker}:`, e);
        }
    }

    async fetchAggregates(ticker: string, from: string, to: string): Promise<OHLC[]> {
        const MIN_DATE = '1999-03-10';

        await this.ensureNextYearCalendarIfNeeded();
        const allowTodayFetch = await this.shouldFetchTodayData();

        let reqStart = toNYDate(from);
        let reqEnd = toNYDate(to);
        const minDateObj = toNYDate(MIN_DATE);

        if (reqStart < minDateObj) {
            reqStart = minDateObj;
        }

        reqEnd = this.adjustEndDateForToday(reqEnd, reqStart, allowTodayFetch);

        if (reqEnd < reqStart) {
            reqEnd = reqStart;
        }

        // 1. Load Cache
        let cachedData = await this.loadCache(ticker);

        if (cachedData.length === 0) {
            console.log(`[CACHE EMPTY] ${ticker}: Fetching fresh data`);
            const fresh = await this.fetchFromApi(ticker, formatNYDate(reqStart), formatNYDate(reqEnd));
            await this.saveCache(ticker, fresh, allowTodayFetch);
            return fresh;
        }

        // Ensure cache is sorted
        cachedData.sort((a, b) => toNYDate(a.date).getTime() - toNYDate(b.date).getTime());

        const cacheStart = cachedData[0].date;
        const cacheEnd = cachedData[cachedData.length - 1].date;
        const cStart = toNYDate(cacheStart);
        const cEnd = toNYDate(cacheEnd);

        // Fully cached
        if (reqStart >= cStart && reqEnd <= cEnd) {
            console.log(`[CACHE HIT] ${ticker}: ${from} to ${to}`);
            return cachedData.filter(d => {
                const dDate = toNYDate(d.date);
                return dDate >= reqStart && dDate <= reqEnd;
            });
        }

        const fetchPromises: Promise<OHLC[]>[] = [];

        // Fetch missing head if needed
        if (reqStart < cStart) {
            const headEnd = addDays(cStart, -1);
            console.log(`[CACHE MISS HEAD] ${ticker}: ${formatNYDate(reqStart)} to ${formatNYDate(headEnd)}`);
            fetchPromises.push(this.fetchFromApi(ticker, formatNYDate(reqStart), formatNYDate(headEnd)));
        }

        // Fetch missing tail based on latest cached date
        if (reqEnd > cEnd) {
            const nextExpected = addDays(cEnd, 1);
            if (nextExpected <= reqEnd) {
                const tailFetchStart = this.getTailFetchStart(reqEnd, cEnd);
                console.log(`[CACHE MISS TAIL] ${ticker}: ${formatNYDate(tailFetchStart)} to ${formatNYDate(reqEnd)}`);
                fetchPromises.push(this.fetchFromApi(ticker, formatNYDate(tailFetchStart), formatNYDate(reqEnd)));
            }
        }

        if (fetchPromises.length > 0) {
            try {
                const newSegments = await Promise.all(fetchPromises);
                const lastMonthData = newSegments.flat();

                const allDataMap = new Map<string, OHLC>();
                cachedData.forEach(item => allDataMap.set(item.date, item));
                lastMonthData.forEach(item => allDataMap.set(item.date, item));

                const combined = Array.from(allDataMap.values()).sort(
                    (a, b) => toNYDate(a.date).getTime() - toNYDate(b.date).getTime()
                );

                cachedData = await this.populateMissingTradingDays(combined, reqEnd, cEnd);
                await this.saveCache(ticker, cachedData, allowTodayFetch);
            } catch (error) {
                console.warn(`Failed to fetch additional data for ${ticker}:`, error instanceof Error ? error.message : error);
            }
        }

        return cachedData.filter(d => {
            const dDate = toNYDate(d.date);
            return dDate >= reqStart && dDate <= reqEnd;
        });
    }

    private adjustEndDateForToday(reqEnd: Date, reqStart: Date, allowTodayFetch: boolean): Date {
        const now = getNYNow();
        const reqEndStr = formatNYDate(reqEnd);
        const todayStr = formatNYDate(now);

        if (reqEndStr === todayStr && !allowTodayFetch) {
            const adjusted = addDays(reqEnd, -1);
            return adjusted < reqStart ? reqStart : adjusted;
        }
        return reqEnd;
    }

    private getTailFetchStart(reqEnd: Date, lastCachedEnd: Date): Date {
        // Optimization: Only fetch the days we are missing, don't re-fetch the last month
        // This prevents redundant "CACHE MISS TAIL" logs and API calls when we just need the latest day
        return addDays(lastCachedEnd, 1);
    }

    private async populateMissingTradingDays(data: OHLC[], reqEnd: Date, lastCachedEnd: Date): Promise<OHLC[]> {
        if (data.length === 0) return data;

        const startFrom = addDays(lastCachedEnd, 1);
        if (startFrom > reqEnd) {
            return data;
        }

        const expectedDates = await this.getTradingDatesBetween(startFrom, reqEnd);

        const dataMap = new Map<string, OHLC>(data.map(item => [item.date, item]));
        expectedDates.forEach(date => {
            if (!dataMap.has(date)) {
                console.warn(`Missing trading day ${date} not returned by API; cache will remain sparse for this date.`);
            }
        });

        return Array.from(dataMap.values()).sort((a, b) => toNYDate(a.date).getTime() - toNYDate(b.date).getTime());
    }

    private async getTradingDatesBetween(start: Date, end: Date): Promise<string[]> {
        const dates: string[] = [];
        let cursor = start;

        while (cursor <= end) {
            const calendar = await this.getCalendarForDate(cursor);
            if (this.isTradingDay(cursor, calendar)) {
                dates.push(formatNYDate(cursor));
            }
            cursor = addDays(cursor, 1);
        }

        return dates;
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
            open: parseFloat(res.o.toFixed(2)),
            high: parseFloat(res.h.toFixed(2)),
            low: parseFloat(res.l.toFixed(2)),
            close: parseFloat(res.c.toFixed(2))
        }));
    }
}
