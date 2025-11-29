#!/usr/bin/env tsx

/**
 * Test All Service Connections
 *
 * This script tests connections to ALL external services in parallel:
 * - Polygon API (market data)
 * - Redis (caching)
 * - Slack (notifications)
 * - All configured broker accounts
 *
 * Usage:
 *   pnpm test-connections
 *
 * Environment Variables:
 *   - POLYGON_API_KEY: Polygon API key (required)
 *   - REDIS_URL: Redis connection URL (optional)
 *   - SLACK_TOKEN: Slack bot token (optional)
 *   - ACCOUNTS: JSON array of account configurations (optional)
 */

// IMPORTANT: Load environment variables BEFORE any other imports
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient, RedisClientType } from 'redis';
import { WebClient } from '@slack/web-api';
import { getConfiguredAccounts, BrokerType, AccountConfig } from '../config/accounts';
import { AlpacaClient } from '../live/alpacaClient';
import { AlpacaBroker } from '../live/AlpacaBroker';

// ANSI color codes
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    yellow: '\x1b[33m',
    gray: '\x1b[90m',
};

interface ServiceTestResult {
    service: string;
    configured: boolean;
    success: boolean;
    details?: Record<string, unknown>;
    error?: string;
    duration: number;
}

interface CacheEntry {
    key: string;
    exists: boolean;
    size?: number;
}

interface BrokerTestResult extends ServiceTestResult {
    service: 'broker';
    accountName: string;
    broker: string;
    isPaper: boolean;
}

type TestResult = ServiceTestResult | BrokerTestResult;

/**
 * Test Polygon API connection
 */
async function testPolygon(): Promise<ServiceTestResult> {
    const startTime = Date.now();
    const result: ServiceTestResult = {
        service: 'Polygon API',
        configured: !!process.env.POLYGON_API_KEY,
        success: false,
        duration: 0
    };

    if (!result.configured) {
        result.error = 'POLYGON_API_KEY not configured';
        result.duration = Date.now() - startTime;
        return result;
    }

    try {
        const apiKey = process.env.POLYGON_API_KEY;
        const url = `https://api.polygon.io/v2/aggs/ticker/QQQ/range/1/day/2024-01-02/2024-01-02?apiKey=${apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        result.success = true;
        result.details = {
            status: data.status,
            resultsCount: data.resultsCount || 0
        };
    } catch (error) {
        result.error = error instanceof Error ? error.message : String(error);
    }

    result.duration = Date.now() - startTime;
    return result;
}

/**
 * Test Redis connection
 */
async function testRedis(): Promise<ServiceTestResult> {
    const startTime = Date.now();
    const result: ServiceTestResult = {
        service: 'Redis',
        configured: !!process.env.REDIS_URL,
        success: false,
        duration: 0
    };

    if (!result.configured) {
        result.error = 'REDIS_URL not configured';
        result.duration = Date.now() - startTime;
        return result;
    }

    let redis: RedisClientType | null = null;

    try {
        redis = createClient({ url: process.env.REDIS_URL });
        await redis.connect();

        // Test write and read
        const testKey = 'test:connection:' + Date.now();
        const testValue = 'OK';

        await redis.set(testKey, testValue);
        const retrieved = await redis.get(testKey);
        await redis.del(testKey);

        if (retrieved !== testValue) {
            throw new Error('Write/read test failed');
        }

        result.success = true;
        result.details = {
            connected: true,
            testPassed: true
        };
    } catch (error) {
        result.error = error instanceof Error ? error.message : String(error);
    } finally {
        if (redis) {
            try {
                await redis.disconnect();
            } catch {
                // Ignore disconnect errors
            }
        }
    }

    result.duration = Date.now() - startTime;
    return result;
}

/**
 * Test Slack connection
 */
async function testSlack(): Promise<ServiceTestResult> {
    const startTime = Date.now();
    const result: ServiceTestResult = {
        service: 'Slack',
        configured: !!process.env.SLACK_TOKEN,
        success: false,
        duration: 0
    };

    if (!result.configured) {
        result.error = 'SLACK_TOKEN not configured';
        result.duration = Date.now() - startTime;
        return result;
    }

    try {
        const client = new WebClient(process.env.SLACK_TOKEN);

        // Test auth
        const authTest = await client.auth.test();

        result.success = true;
        result.details = {
            teamId: authTest.team_id,
            userId: authTest.user_id,
            team: authTest.team,
            user: authTest.user
        };
    } catch (error) {
        result.error = error instanceof Error ? error.message : String(error);
    }

    result.duration = Date.now() - startTime;
    return result;
}

/**
 * Test Alpaca broker account
 */
async function testAlpacaAccount(account: AccountConfig): Promise<BrokerTestResult> {
    const startTime = Date.now();
    const result: BrokerTestResult = {
        service: 'broker',
        accountName: account.name,
        broker: account.broker || BrokerType.ALPACA,
        isPaper: account.isPaper,
        configured: true,
        success: false,
        duration: 0
    };

    try {
        const client = new AlpacaClient(account.key, account.secret, account.isPaper);
        const broker = new AlpacaBroker(client);

        // Get account info
        const accountInfo = await client.getAccount();

        // Get portfolio state
        const portfolio = await broker.getPortfolioState();

        result.success = true;
        result.details = {
            accountId: accountInfo.id,
            status: accountInfo.status,
            cash: portfolio.cash,
            equity: portfolio.totalEquity
        };
    } catch (error) {
        result.error = error instanceof Error ? error.message : String(error);
    }

    result.duration = Date.now() - startTime;
    return result;
}

/**
 * Check Redis cache status
 */
async function checkRedisCache(): Promise<CacheEntry[] | null> {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
        return null;
    }

    try {
        const redis = createClient({ url: redisUrl });
        await redis.connect();

        const tickers = ['TQQQ', 'QQQ', 'SQQQ'];
        const year = new Date().getFullYear();
        const keysToCheck = [
            ...tickers.map(t => `ohlc:${t}`),
            `market-calendar-${year}`
        ];

        const results: CacheEntry[] = [];

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
                    exists: false
                });
            }
        }

        await redis.quit();
        return results;
    } catch (error) {
        return null;
    }
}

/**
 * Test all broker accounts
 */
async function testBrokers(): Promise<BrokerTestResult[]> {
    const startTime = Date.now();

    try {
        const accounts = getConfiguredAccounts();

        if (accounts.length === 0) {
            // No accounts configured - return a special result
            return [{
                service: 'broker',
                accountName: 'Broker Accounts',
                broker: 'N/A',
                isPaper: false,
                configured: false,
                success: false,
                error: 'No broker accounts configured in ACCOUNTS environment variable',
                duration: Date.now() - startTime
            }];
        }

        // Test all accounts in parallel
        const promises = accounts.map(account => testAlpacaAccount(account));
        return await Promise.all(promises);
    } catch (error) {
        // Failed to parse/load accounts - return error result
        let errorMessage = error instanceof Error ? error.message : String(error);

        // Add helpful hints for common JSON errors
        if (errorMessage.includes('not valid JSON') || errorMessage.includes('JSON')) {
            errorMessage += '\n   Hint: Check for trailing commas, missing quotes, or invalid escape sequences in ACCOUNTS';
        }

        return [{
            service: 'broker',
            accountName: 'Broker Accounts',
            broker: 'N/A',
            isPaper: false,
            configured: true,
            success: false,
            error: errorMessage,
            duration: Date.now() - startTime
        }];
    }
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
 * Print cache summary
 */
function printCacheStatus(cacheEntries: CacheEntry[] | null) {
    if (!cacheEntries) {
        return;
    }

    console.log(`\n${colors.bright}Redis Cache Status:${colors.reset}`);
    console.log(`${colors.gray}${'─'.repeat(80)}${colors.reset}`);

    let hasCache = false;
    let totalSize = 0;

    for (const entry of cacheEntries) {
        if (entry.exists && entry.size) {
            hasCache = true;
            totalSize += entry.size;
            console.log(`${colors.green}✓${colors.reset} ${colors.bright}${entry.key.padEnd(30)}${colors.reset} ${colors.gray}${formatBytes(entry.size)}${colors.reset}`);
        } else {
            console.log(`${colors.yellow}○${colors.reset} ${colors.gray}${entry.key.padEnd(30)} Not cached${colors.reset}`);
        }
    }

    if (hasCache) {
        console.log(`${colors.gray}\n   Total cache size: ${formatBytes(totalSize)}${colors.reset}`);
    } else {
        console.log(`${colors.yellow}\n   💡 Run 'pnpm populate-cache' to populate Redis with market data${colors.reset}`);
    }
}

/**
 * Print detailed results
 */
function printResults(results: TestResult[], cacheEntries: CacheEntry[] | null) {
    console.log(`\n${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}              CONNECTION TEST RESULTS${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}\n`);

    // Separate broker results from service results
    const serviceResults = results.filter(r => r.service !== 'broker') as ServiceTestResult[];
    const brokerResults = results.filter(r => r.service === 'broker') as BrokerTestResult[];

    // Print service results
    console.log(`${colors.bright}External Services:${colors.reset}`);
    console.log(`${colors.gray}${'─'.repeat(80)}${colors.reset}`);

    for (const result of serviceResults) {
        const icon = !result.configured ? `${colors.yellow}⊘${colors.reset}`
                   : result.success ? `${colors.green}✓${colors.reset}`
                   : `${colors.red}✗${colors.reset}`;

        const status = !result.configured ? `${colors.yellow}NOT CONFIGURED${colors.reset}`
                     : result.success ? `${colors.green}CONNECTED${colors.reset}`
                     : `${colors.red}FAILED${colors.reset}`;

        console.log(`${icon} ${colors.bright}${result.service.padEnd(15)}${colors.reset} ${status} ${colors.gray}(${result.duration}ms)${colors.reset}`);

        if (result.success && result.details) {
            for (const [key, value] of Object.entries(result.details)) {
                console.log(`${colors.gray}   ${key}: ${value}${colors.reset}`);
            }
        } else if (result.error) {
            console.log(`${colors.red}   Error: ${result.error}${colors.reset}`);
        }
    }

    // Print broker results
    if (brokerResults.length > 0) {
        console.log(`\n${colors.bright}Broker Accounts:${colors.reset}`);
        console.log(`${colors.gray}${'─'.repeat(80)}${colors.reset}`);

        for (const result of brokerResults) {
            const icon = result.success ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;

            // Don't show mode tag if this is a failed account loading result
            let displayName = result.accountName;
            if (result.broker !== 'N/A') {
                const modeTag = result.isPaper ? `${colors.gray}[PAPER]${colors.reset}` : `${colors.yellow}[LIVE]${colors.reset}`;
                displayName = `${result.accountName} ${modeTag}`;
            }

            console.log(`${icon} ${colors.bright}${displayName}${colors.reset} ${colors.gray}(${result.duration}ms)${colors.reset}`);

            if (result.success && result.details) {
                if (result.details.accountId) {
                    console.log(`${colors.gray}   ID: ${result.details.accountId}${colors.reset}`);
                }
                if (result.details.status) {
                    console.log(`${colors.gray}   Status: ${result.details.status}${colors.reset}`);
                }
                if (typeof result.details.equity === 'number') {
                    console.log(`${colors.gray}   Equity: $${result.details.equity.toFixed(2)}${colors.reset}`);
                }
            } else if (result.error) {
                // Split error message by newlines to preserve formatting (for hints)
                const errorLines = result.error.split('\n');
                errorLines.forEach((line, index) => {
                    if (index === 0) {
                        console.log(`${colors.red}   ${line}${colors.reset}`);
                    } else {
                        console.log(`${colors.yellow}   ${line}${colors.reset}`);
                    }
                });
            }
        }
    }

    // Print cache status if Redis is configured
    printCacheStatus(cacheEntries);

    console.log(`\n${colors.gray}${'─'.repeat(80)}${colors.reset}\n`);

    // Summary stats
    const totalTests = results.length;
    const configuredTests = results.filter(r => r.configured).length;
    const successfulTests = results.filter(r => r.configured && r.success).length;
    const failedTests = results.filter(r => r.configured && !r.success).length;
    const notConfigured = results.filter(r => !r.configured).length;

    console.log(`${colors.bright}Summary:${colors.reset}`);
    console.log(`${colors.gray}Total Services: ${totalTests}${colors.reset}`);
    console.log(`${colors.green}✓ Successful: ${successfulTests}${colors.reset}`);
    console.log(`${colors.red}✗ Failed: ${failedTests}${colors.reset}`);
    console.log(`${colors.yellow}⊘ Not Configured: ${notConfigured}${colors.reset}\n`);

    // Final status
    if (failedTests === 0 && configuredTests > 0) {
        console.log(`${colors.bright}${colors.green}✅ ALL CONFIGURED SERVICES OPERATIONAL${colors.reset}\n`);
        return 0;
    } else if (successfulTests > 0 && failedTests > 0) {
        console.log(`${colors.bright}${colors.yellow}⚠️  PARTIAL FAILURE - Some services are down${colors.reset}\n`);
        return 1;
    } else if (configuredTests === 0) {
        console.log(`${colors.bright}${colors.yellow}⚠️  NO SERVICES CONFIGURED${colors.reset}\n`);
        return 1;
    } else {
        console.log(`${colors.bright}${colors.red}❌ ALL CONFIGURED SERVICES FAILED${colors.reset}\n`);
        return 1;
    }
}

/**
 * Main test function
 */
async function main() {
    console.log(`\n${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}         TESTING ALL SERVICE CONNECTIONS${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}\n`);

    console.log(`${colors.gray}Running tests in parallel...${colors.reset}\n`);

    // Run all tests in parallel
    const [polygonResult, redisResult, slackResult, brokerResults, cacheStatus] = await Promise.all([
        testPolygon(),
        testRedis(),
        testSlack(),
        testBrokers(),
        checkRedisCache()
    ]);

    // Combine all results
    const allResults: TestResult[] = [
        polygonResult,
        redisResult,
        slackResult,
        ...brokerResults
    ];

    // Print results
    const exitCode = printResults(allResults, cacheStatus);

    process.exit(exitCode);
}

// Run the test
main().catch(error => {
    console.error(`\n${colors.red}❌ Fatal error:${colors.reset}`, error);
    process.exit(1);
});
