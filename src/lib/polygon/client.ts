import { OHLC } from '../types';
import fs from 'fs';
import path from 'path';
import { toNYDate, getNYNow, formatNYDate } from '../utils/dateUtils';
import { addDays, subMonths } from 'date-fns';

import os from 'os';

const BASE_URL = 'https://api.polygon.io/v2/aggs/ticker';
// Use /tmp in production (Vercel) or local cache dir in development
const CACHE_DIR = process.env.NODE_ENV === 'production'
    ? path.join(os.tmpdir(), 'alpalo-cache')
    : path.join(process.cwd(), 'cache');

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
        try {
            if (!fs.existsSync(CACHE_DIR)) {
                fs.mkdirSync(CACHE_DIR, { recursive: true });
            }

            // In production, seed the ephemeral cache from the committed cache if available
            if (process.env.NODE_ENV === 'production') {
                const seedDir = path.join(process.cwd(), 'cache');
                if (fs.existsSync(seedDir)) {
                    const files = fs.readdirSync(seedDir);
                    for (const file of files) {
                        const srcPath = path.join(seedDir, file);
                        const destPath = path.join(CACHE_DIR, file);
                        if (!fs.existsSync(destPath)) {
                            try {
                                fs.copyFileSync(srcPath, destPath);
                                console.log(`[CACHE SEED] Copied ${file} to ephemeral cache`);
                            } catch (err) {
                                console.warn(`[CACHE SEED] Failed to copy ${file}:`, err);
                            }
                        }
                    }
                }
            }
        } catch (e) {
            console.warn('Failed to create/seed cache directory, caching disabled:', e);
        }
    }

    private getCalendarFilePath(year: number): string {
        return path.join(CACHE_DIR, `market-calendar-${year}.json`);
    }

    private async loadCalendar(year: number): Promise<MarketCalendar | null> {
        const filePath = this.getCalendarFilePath(year);
        if (!fs.existsSync(filePath)) return null;

        try {
            const raw = fs.readFileSync(filePath, 'utf-8');
            const parsed = JSON.parse(raw) as MarketCalendar;
            parsed.holidays = new Set(parsed.holidaysArray ?? []);
            parsed.tradingDays = new Set(parsed.tradingDaysArray ?? []);
            return parsed;
        } catch (error) {
            console.warn(`Failed to read calendar cache for ${year}:`, error);
            return null;
        }
    }

    private saveCalendar(calendar: MarketCalendar) {
        const filePath = this.getCalendarFilePath(calendar.year);
        const payload = {
            year: calendar.year,
            fetchedAt: calendar.fetchedAt,
            holidaysArray: Array.from(calendar.holidays),
            tradingDaysArray: Array.from(calendar.tradingDays)
        };
        fs.writeFileSync(filePath, JSON.stringify(payload, null, 2));
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

    private saveCache(ticker: string, data: OHLC[], allowToday: boolean = true) {
        const filePath = this.getCacheFilePath(ticker);

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

        fs.writeFileSync(filePath, JSON.stringify(uniqueData, null, 2));
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
        let cachedData = this.loadCache(ticker);

        if (cachedData.length === 0) {
            console.log(`[CACHE EMPTY] ${ticker}: Fetching fresh data`);
            const fresh = await this.fetchFromApi(ticker, formatNYDate(reqStart), formatNYDate(reqEnd));
            this.saveCache(ticker, fresh, allowTodayFetch);
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
                this.saveCache(ticker, cachedData, allowTodayFetch);
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
        const monthAgo = subMonths(reqEnd, 1);
        const nextExpected = addDays(lastCachedEnd, 1);
        return monthAgo < nextExpected ? monthAgo : nextExpected;
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
