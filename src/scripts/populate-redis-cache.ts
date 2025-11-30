#!/usr/bin/env tsx
/**
 * Populate Redis Cache
 *
 * This script populates the Redis cache with market data from Polygon API.
 * It fetches OHLC data for configured tickers and market calendar data.
 */

// IMPORTANT: Load environment variables BEFORE any other imports
// that depend on them (like PolygonClient which initializes Redis at module level)
import 'dotenv/config'; // Loads .env file from project root

import { createClient } from 'redis';
import * as fs from 'fs';
import * as path from 'path';
import { PolygonClient } from '../lib/polygon/client';

const CACHE_DIR = path.join(process.cwd(), 'cache');

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
    redisExists: boolean;
    redisSize?: number;
    fsExists: boolean;
    fsSize?: number;
    error?: string;
}

/**
 * Check Redis cache status
 */
/**
 * Check Cache status (Redis + File System)
 */
async function checkCacheStatus(): Promise<CacheStatus[]> {
    const redisUrl = process.env.REDIS_URL;
    const redis = redisUrl ? createClient({ url: redisUrl }) : null;

    if (redis) {
        await redis.connect().catch(e => console.warn('Redis connection failed:', e.message));
    }

    const tickers = ['TQQQ', 'QQQ', 'SQQQ'];
    const year = new Date().getFullYear();
    const keysToCheck = [
        ...tickers.map(t => ({ redisKey: `ohlc:${t}`, fsFile: `${t}.json` })),
        { redisKey: `market-calendar-${year}`, fsFile: `market-calendar-${year}.json` }
    ];

    const results: CacheStatus[] = [];

    for (const item of keysToCheck) {
        const status: CacheStatus = {
            key: item.redisKey,
            redisExists: false,
            fsExists: false
        };

        // Check Redis
        if (redis && redis.isOpen) {
            try {
                const exists = await redis.exists(item.redisKey);
                if (exists) {
                    const data = await redis.get(item.redisKey);
                    status.redisExists = true;
                    status.redisSize = data ? Buffer.byteLength(data, 'utf8') : 0;
                }
            } catch (error) {
                status.error = `Redis error: ${error instanceof Error ? error.message : String(error)}`;
            }
        }

        // Check File System
        try {
            const filePath = path.join(CACHE_DIR, item.fsFile);
            if (fs.existsSync(filePath)) {
                const stats = fs.statSync(filePath);
                status.fsExists = true;
                status.fsSize = stats.size;
            }
        } catch (error) {
            const msg = `FS error: ${error instanceof Error ? error.message : String(error)}`;
            status.error = status.error ? `${status.error} | ${msg}` : msg;
        }

        results.push(status);
    }

    if (redis && redis.isOpen) {
        await redis.quit();
    }
    return results;
}

/**
 * Populate Redis cache by fetching data from Polygon API
 */
async function populateCache(): Promise<void> {
    console.log(`${colors.blue}📥 Populating Cache (Redis + File System) from Polygon API...${colors.reset}\n`);

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
    console.log(`${colors.blue}          Dual Cache Population Tool (Redis + FS)${colors.reset}`);
    console.log(`${colors.blue}═══════════════════════════════════════════════════════${colors.reset}\n`);

    try {
        // Check current cache status
        console.log(`${colors.blue}🔍 Checking Cache status...${colors.reset}\n`);
        const beforeStatus = await checkCacheStatus();

        let needsPopulation = false;
        console.log('KEY'.padEnd(30) + 'REDIS'.padEnd(15) + 'FILE SYSTEM'.padEnd(15));
        console.log('-'.repeat(60));

        for (const status of beforeStatus) {
            const redisStr = status.redisExists ? `${colors.green}✓ ${formatBytes(status.redisSize || 0)}${colors.reset}` : `${colors.yellow}MISSING${colors.reset}`;
            const fsStr = status.fsExists ? `${colors.green}✓ ${formatBytes(status.fsSize || 0)}${colors.reset}` : `${colors.yellow}MISSING${colors.reset}`;

            console.log(`${status.key.padEnd(30)} ${redisStr.padEnd(24)} ${fsStr}`);

            if (!status.redisExists || !status.fsExists) {
                needsPopulation = true;
            }
        }

        console.log();

        if (needsPopulation) {
            // Populate cache
            await populateCache();

            // Check cache status again
            console.log(`${colors.blue}🔍 Verifying Cache...${colors.reset}\n`);
            const afterStatus = await checkCacheStatus();

            let allPopulated = true;
            console.log('KEY'.padEnd(30) + 'REDIS'.padEnd(15) + 'FILE SYSTEM'.padEnd(15));
            console.log('-'.repeat(60));

            for (const status of afterStatus) {
                const redisStr = status.redisExists ? `${colors.green}✓ ${formatBytes(status.redisSize || 0)}${colors.reset}` : `${colors.red}FAILED${colors.reset}`;
                const fsStr = status.fsExists ? `${colors.green}✓ ${formatBytes(status.fsSize || 0)}${colors.reset}` : `${colors.red}FAILED${colors.reset}`;

                console.log(`${status.key.padEnd(30)} ${redisStr.padEnd(24)} ${fsStr}`);

                if (!status.redisExists || !status.fsExists) {
                    allPopulated = false;
                }
            }

            console.log();

            if (allPopulated) {
                console.log(`${colors.green}✅ Successfully populated both Redis and File System caches!${colors.reset}`);
                console.log(`${colors.gray}   Both caches are now synchronized and ready for offline use.${colors.reset}\n`);
                process.exit(0);
            } else {
                console.log(`${colors.red}❌ Some cache entries failed to populate${colors.reset}\n`);
                process.exit(1);
            }
        } else {
            console.log(`${colors.green}✅ Redis and File System caches are already fully populated and synchronized!${colors.reset}`);
            console.log(`${colors.gray}   System is ready for both online and offline operation.${colors.reset}\n`);
            process.exit(0);
        }
    } catch (error) {
        console.error(`${colors.red}❌ Error: ${error instanceof Error ? error.message : String(error)}${colors.reset}\n`);
        process.exit(1);
    }
}

main();
