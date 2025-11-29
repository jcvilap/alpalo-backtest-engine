#!/usr/bin/env tsx

/**
 * Migrate Local File Cache to Redis
 *
 * This script reads historical market data from local JSON files in the `cache/` directory
 * and populates the Redis cache with this data.
 *
 * It performs the following steps for each ticker (QQQ, TQQQ, SQQQ):
 * 1. Reads the local JSON file (e.g., cache/QQQ.json)
 * 2. Deletes the existing Redis key (ohlc:QQQ)
 * 3. Inserts the data from the file into Redis
 */

// IMPORTANT: Load environment variables BEFORE any other imports
import 'dotenv/config';

import fs from 'fs';
import path from 'path';
import { createClient } from 'redis';

// ANSI color codes
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    gray: '\x1b[90m',
};

interface OHLC {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
}

async function migrateCache() {
    console.log(`${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.blue}          Cache Migration Tool (File -> Redis)${colors.reset}`);
    console.log(`${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}\n`);

    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
        console.error(`${colors.red}❌ Error: REDIS_URL environment variable is not set${colors.reset}`);
        process.exit(1);
    }

    const redis = createClient({ url: redisUrl });

    redis.on('error', (err) => console.error(`${colors.red}Redis Client Error:${colors.reset}`, err));

    try {
        console.log(`${colors.gray}Connecting to Redis...${colors.reset}`);
        await redis.connect();
        console.log(`${colors.green}✓ Connected to Redis${colors.reset}\n`);

        const tickers = ['QQQ', 'TQQQ', 'SQQQ'];
        const cacheDir = path.join(process.cwd(), 'cache');

        for (const ticker of tickers) {
            const filePath = path.join(cacheDir, `${ticker}.json`);
            const redisKey = `ohlc:${ticker}`;

            console.log(`${colors.blue}Processing ${ticker}...${colors.reset}`);

            if (!fs.existsSync(filePath)) {
                console.warn(`${colors.yellow}⚠️  File not found: ${filePath}${colors.reset}`);
                continue;
            }

            // Read and parse file
            console.log(`${colors.gray}   Reading ${filePath}...${colors.reset}`);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const data: OHLC[] = JSON.parse(fileContent);
            console.log(`${colors.gray}   Found ${data.length} records${colors.reset}`);

            // Clear existing Redis key
            console.log(`${colors.gray}   Clearing existing Redis key ${redisKey}...${colors.reset}`);
            await redis.del(redisKey);

            // Insert into Redis
            console.log(`${colors.gray}   Inserting into Redis...${colors.reset}`);
            await redis.set(redisKey, JSON.stringify(data));

            console.log(`${colors.green}✓ Successfully migrated ${ticker} (${data.length} records)${colors.reset}\n`);
        }

        console.log(`${colors.green}✅ Migration completed successfully!${colors.reset}`);

    } catch (error) {
        console.error(`${colors.red}❌ Migration failed:${colors.reset}`, error);
        process.exit(1);
    } finally {
        await redis.disconnect();
    }
}

migrateCache();
