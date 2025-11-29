#!/usr/bin/env tsx
/**
 * Populate Redis Cache
 *
 * This script populates the Redis cache with market data from Polygon API.
 * It fetches OHLC data for configured tickers and market calendar data.
 */

// IMPORTANT: Load environment variables BEFORE any other imports
// that depend on them (like PolygonClient which initializes Redis at module level)
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from 'redis';
import { PolygonClient } from '../lib/polygon/client';

// ANSI color codes
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    gray: '\x1b[90m',
};

interface CacheStatus {
    key: string;
    exists: boolean;
    size?: number;
    error?: string;
}

/**
 * Check Redis cache status
 */
async function checkRedisCache(): Promise<CacheStatus[]> {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
        throw new Error('REDIS_URL environment variable is required');
    }

    const redis = createClient({ url: redisUrl });
    await redis.connect();

    const tickers = ['TQQQ', 'QQQ', 'SQQQ'];
    const year = new Date().getFullYear();
    const keysToCheck = [
        ...tickers.map(t => `ohlc:${t}`),
        `market-calendar-${year}`
    ];

    const results: CacheStatus[] = [];

    for (const key of keysToCheck) {
        try {
            const exists = await redis.exists(key);
            if (exists) {
                const data = await redis.get(key);
                results.push({
                    key,
                    exists: true,
                    size: data ? Buffer.byteLength(data, 'utf8') : 0
                });
            } else {
                results.push({
                    key,
                    exists: false
                });
            }
        } catch (error) {
            results.push({
                key,
                exists: false,
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    await redis.quit();
    return results;
}

/**
 * Populate Redis cache by fetching data from Polygon API
 */
async function populateCache(): Promise<void> {
    console.log(`${colors.blue}📥 Populating Redis cache from Polygon API...${colors.reset}\n`);

    const client = new PolygonClient();
    const tickers = ['TQQQ', 'QQQ', 'SQQQ'];

    // Calculate date range: last 5 years of data
    const endDate = new Date();
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 5);

    // Format dates as YYYY-MM-DD
    const fromDate = startDate.toISOString().split('T')[0];
    const toDate = endDate.toISOString().split('T')[0];

    for (const ticker of tickers) {
        try {
            console.log(`${colors.gray}   Fetching ${ticker}...${colors.reset}`);
            const data = await client.fetchAggregates(ticker, fromDate, toDate);
            console.log(`${colors.green}   ✓ ${ticker}: ${data.length} bars cached${colors.reset}`);
        } catch (error) {
            console.error(`${colors.red}   ✗ ${ticker}: ${error instanceof Error ? error.message : String(error)}${colors.reset}`);
        }
    }

    console.log();
}

/**
 * Format bytes to human-readable size
 */
function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Main execution
 */
async function main() {
    console.log(`${colors.blue}═══════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.blue}          Redis Cache Population Tool${colors.reset}`);
    console.log(`${colors.blue}═══════════════════════════════════════════════════════${colors.reset}\n`);

    try {
        // Check current cache status
        console.log(`${colors.blue}🔍 Checking Redis cache status...${colors.reset}\n`);
        const beforeStatus = await checkRedisCache();

        let needsPopulation = false;
        for (const status of beforeStatus) {
            if (status.exists) {
                console.log(`${colors.green}✓ ${status.key.padEnd(25)} ${formatBytes(status.size || 0)}${colors.reset}`);
            } else {
                console.log(`${colors.yellow}○ ${status.key.padEnd(25)} Not cached${colors.reset}`);
                needsPopulation = true;
            }
        }

        console.log();

        if (needsPopulation) {
            // Populate cache
            await populateCache();

            // Check cache status again
            console.log(`${colors.blue}🔍 Verifying Redis cache...${colors.reset}\n`);
            const afterStatus = await checkRedisCache();

            let allPopulated = true;
            for (const status of afterStatus) {
                if (status.exists) {
                    console.log(`${colors.green}✓ ${status.key.padEnd(25)} ${formatBytes(status.size || 0)}${colors.reset}`);
                } else {
                    console.log(`${colors.red}✗ ${status.key.padEnd(25)} Failed to cache${colors.reset}`);
                    allPopulated = false;
                }
            }

            console.log();

            if (allPopulated) {
                console.log(`${colors.green}✅ Redis cache successfully populated!${colors.reset}`);
                console.log(`${colors.gray}   You can now safely remove the cache folder.${colors.reset}\n`);
                process.exit(0);
            } else {
                console.log(`${colors.red}❌ Some cache entries failed to populate${colors.reset}\n`);
                process.exit(1);
            }
        } else {
            console.log(`${colors.green}✅ Redis cache is already populated!${colors.reset}`);
            console.log(`${colors.gray}   You can safely remove the cache folder.${colors.reset}\n`);
            process.exit(0);
        }
    } catch (error) {
        console.error(`${colors.red}❌ Error: ${error instanceof Error ? error.message : String(error)}${colors.reset}\n`);
        process.exit(1);
    }
}

main();
