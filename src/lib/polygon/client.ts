import { OHLC } from '../types';
import fs from 'fs';
import path from 'path';


const BASE_URL = 'https://api.polygon.io/v2/aggs/ticker';
const CACHE_DIR = path.join(process.cwd(), 'cache');

export class PolygonClient {
    constructor() {
        if (!fs.existsSync(CACHE_DIR)) {
            fs.mkdirSync(CACHE_DIR, { recursive: true });
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
        // Sort by date and deduplicate
        const uniqueData = Array.from(new Map(data.map(item => [item.date, item])).values())
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        fs.writeFileSync(filePath, JSON.stringify(uniqueData, null, 2));
    }

    async fetchAggregates(ticker: string, from: string, to: string): Promise<OHLC[]> {
        const apiKey = process.env.POLYGON_API_KEY;
        if (!apiKey) {
            throw new Error('POLYGON_API_KEY is not set');
        }

        // 1. Load Cache
        let cachedData = this.loadCache(ticker);

        // 2. Check what we have
        if (cachedData.length > 0) {
            const cacheStart = cachedData[0].date;
            const cacheEnd = cachedData[cachedData.length - 1].date;

            const reqStart = new Date(from);
            const reqEnd = new Date(to);
            const cStart = new Date(cacheStart);
            const cEnd = new Date(cacheEnd);

            // If request is fully within cache, return cached slice
            if (reqStart >= cStart && reqEnd <= cEnd) {
                console.log(`[CACHE HIT] ${ticker}: ${from} to ${to}`);
                return cachedData.filter(d => {
                    const dDate = new Date(d.date);
                    return dDate >= reqStart && dDate <= reqEnd;
                });
            }

            // Identify missing ranges
            const promises: Promise<OHLC[]>[] = [];

            // Missing Head
            if (reqStart < cStart) {
                const headEnd = new Date(cStart);
                headEnd.setDate(headEnd.getDate() - 1);
                console.log(`[CACHE MISS HEAD] ${ticker}: ${from} to ${headEnd.toISOString().split('T')[0]}`);
                promises.push(this.fetchFromApi(ticker, from, headEnd.toISOString().split('T')[0]));
            }

            // Missing Tail
            if (reqEnd > cEnd) {
                const tailStart = new Date(cEnd);
                tailStart.setDate(tailStart.getDate() + 1);
                console.log(`[CACHE MISS TAIL] ${ticker}: ${tailStart.toISOString().split('T')[0]} to ${to}`);
                promises.push(this.fetchFromApi(ticker, tailStart.toISOString().split('T')[0], to));
            }

            if (promises.length > 0) {
                try {
                    const newSegments = await Promise.all(promises);
                    const allNewData = newSegments.flat();
                    cachedData = [...cachedData, ...allNewData];
                    this.saveCache(ticker, cachedData);
                } catch (error) {
                    // If API fetch fails (e.g., Forbidden for old data), continue with cached data
                    console.warn(`Failed to fetch additional data for ${ticker}:`, error instanceof Error ? error.message : error);
                    // Don't throw - use cached data we have
                }
            }

            // Return requested range from updated cache
            return cachedData.filter(d => {
                const dDate = new Date(d.date);
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
        // Polygon API errors if from > to (e.g. asking for a weekend gap or invalid range)
        if (new Date(from) > new Date(to)) {
            return [];
        }

        const url = `${BASE_URL}/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&limit=50000&apiKey=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
            // Handle 429 or other errors gracefully? For now throw.
            throw new Error(`Failed to fetch data for ${ticker}: ${response.statusText}`);
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
            date: new Date(res.t).toISOString().split('T')[0],
            open: res.o,
            high: res.h,
            low: res.l,
            close: res.c,
            volume: res.v
        }));
    }
}
