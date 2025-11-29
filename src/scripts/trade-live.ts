#!/usr/bin/env tsx

/**
 * Live Trading Multi-Account Orchestration Script
 *
 * This is the main entrypoint for automated live trading via cron job.
 * It orchestrates execution across multiple configured accounts with
 * comprehensive error handling and notification support.
 *
 * Usage:
 *   tsx src/scripts/trade-live.ts                    # Execute for all configured accounts
 *   tsx src/scripts/trade-live.ts --dry-run          # Dry run mode (no real orders)
 *   tsx src/scripts/trade-live.ts --skip-market-check # Skip market schedule validation (testing)
 *
 * Environment Variables Required:
 *   - POLYGON_API_KEY: Polygon API key for market data
 *   - ACCOUNTS: JSON array of account configurations (or legacy env vars)
 *   - SLACK_TOKEN: Optional Slack API token for notifications
 *
 * Exit Codes:
 *   - 0: All accounts executed successfully
 *   - 1: One or more accounts failed
 */

// IMPORTANT: Load environment variables BEFORE any other imports
// PolygonLiveDataFeed uses PolygonClient which initializes Redis at module level
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { getConfiguredAccounts } from '../config/accounts';
import { PolygonLiveDataFeed } from '../live/PolygonLiveDataFeed';
import { createBroker } from '../live/brokerFactory';
import { SlackNotifier } from '../adapters/SlackNotifier';
import { LiveRunner } from '../live/LiveRunner';
import { createDefaultStrategyParams } from '../strategy/engine';
import { AlpacaClient } from '../live/alpacaClient';
import { getMarketStatus, isAppropriateForMOC, formatMinutes } from '../lib/market/schedule';

// ANSI color codes for terminal output
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

/**
 * Delay helper for API rate limiting
 */
async function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Execute trading for a single account
 */
async function executeAccount(
    accountIndex: number,
    totalAccounts: number,
    dataFeed: PolygonLiveDataFeed,
    isDryRun: boolean
): Promise<{ success: boolean; accountName: string; error?: Error }> {
    const accounts = getConfiguredAccounts();
    const account = accounts[accountIndex];

    console.log(`\n${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}Account ${accountIndex + 1}/${totalAccounts}: ${account.name}${colors.reset}`);
    console.log(`${colors.gray}Mode: ${account.isPaper ? 'PAPER' : 'LIVE'} | Dry Run: ${isDryRun ? 'YES' : 'NO'}${colors.reset}`);
    console.log(`${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}\n`);

    try {
        // Create notifier for this account
        const notifier = new SlackNotifier(account.name, account.isPaper);

        // Create broker for this account
        const broker = createBroker(account);

        // Get strategy parameters
        const params = createDefaultStrategyParams();

        // Create LiveRunner for this account
        const runner = new LiveRunner(
            dataFeed,
            broker,
            params,
            notifier,
            account
        );

        // Execute the trading run
        if (isDryRun) {
            await runner.dryRun();
        } else {
            await runner.runOnce();
        }

        console.log(`${colors.green}✓ Account ${account.name} completed successfully${colors.reset}`);

        return { success: true, accountName: account.name };

    } catch (error) {
        console.error(`${colors.red}✗ Account ${account.name} FAILED${colors.reset}`);
        console.error(error);

        return {
            success: false,
            accountName: account.name,
            error: error instanceof Error ? error : new Error(String(error))
        };
    }
}

/**
 * Main execution function
 */
async function main() {
    console.log(`\n${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}    ALPALO LIVE TRADING - MULTI-ACCOUNT ORCHESTRATOR${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}\n`);

    // Parse command line arguments
    const args = process.argv.slice(2);
    const isDryRun = args.includes('--dry-run');
    const skipMarketCheck = args.includes('--skip-market-check');

    if (isDryRun) {
        console.log(`${colors.yellow}⚠️  DRY RUN MODE - No real orders will be placed${colors.reset}\n`);
    }

    if (skipMarketCheck) {
        console.log(`${colors.yellow}⚠️  SKIPPING MARKET SCHEDULE CHECK${colors.reset}\n`);
    }

    // Get configured accounts
    let accounts;
    try {
        accounts = getConfiguredAccounts();
    } catch (error) {
        console.error(`${colors.red}❌ Failed to load account configuration:${colors.reset}`, error);
        process.exit(1);
    }

    if (accounts.length === 0) {
        console.error(`${colors.red}❌ No accounts configured. Please set ACCOUNTS env var or legacy credentials.${colors.reset}`);
        process.exit(1);
    }

    console.log(`${colors.gray}📊 Configured Accounts: ${accounts.length}${colors.reset}`);
    for (const account of accounts) {
        console.log(`${colors.gray}   - ${account.name} (${account.isPaper ? 'PAPER' : 'LIVE'})${colors.reset}`);
    }
    console.log();

    // Check market schedule (unless skipped)
    if (!skipMarketCheck) {
        console.log(`${colors.blue}🕐 Checking market schedule...${colors.reset}`);

        try {
            // Use first account to check market status (all accounts share the same market)
            const testClient = new AlpacaClient(accounts[0].key, accounts[0].secret, accounts[0].isPaper);
            const marketStatus = await getMarketStatus(testClient);

            console.log(`${colors.gray}   Market is: ${marketStatus.isOpen ? 'OPEN' : 'CLOSED'}${colors.reset}`);

            if (!marketStatus.isOpen) {
                console.error(`${colors.red}❌ Market is currently CLOSED${colors.reset}`);
                console.log(`${colors.gray}   Next open: ${new Date(marketStatus.nextOpen).toLocaleString()}${colors.reset}`);
                console.log(`${colors.yellow}\n💡 Tip: Use --skip-market-check to bypass this check for testing${colors.reset}\n`);
                process.exit(1);
            }

            console.log(`${colors.green}✓ Market is open${colors.reset}`);

            // Check if appropriate timing for MOC orders
            const mocCheck = await isAppropriateForMOC(testClient, 30, 5);

            if (mocCheck.minutesToClose !== undefined) {
                const timeStr = formatMinutes(mocCheck.minutesToClose);
                console.log(`${colors.gray}   Time to close: ${timeStr}${colors.reset}`);
            }

            if (!mocCheck.appropriate && mocCheck.reason) {
                // This is a warning, not a hard stop
                console.log(`${colors.yellow}⚠️  WARNING: ${mocCheck.reason}${colors.reset}`);
                console.log(`${colors.yellow}   This strategy typically executes MOC (Market-On-Close) orders.${colors.reset}`);
                console.log(`${colors.yellow}   Proceeding anyway, but timing may not be optimal.${colors.reset}`);
            } else if (mocCheck.appropriate) {
                console.log(`${colors.green}✓ Good timing for MOC orders${colors.reset}`);
            }

            console.log();

        } catch (error) {
            console.error(`${colors.red}❌ Failed to check market schedule:${colors.reset}`, error);
            console.log(`${colors.yellow}💡 Tip: Use --skip-market-check to bypass this check${colors.reset}\n`);
            process.exit(1);
        }
    }

    // Initialize shared PolygonLiveDataFeed
    console.log(`${colors.blue}🔄 Initializing Polygon data feed...${colors.reset}`);
    const dataFeed = new PolygonLiveDataFeed();
    console.log(`${colors.green}✓ Data feed initialized${colors.reset}\n`);

    // Track execution results
    const results: Array<{ success: boolean; accountName: string; error?: Error }> = [];

    // Execute for each account sequentially
    // Sequential execution avoids rate limit issues and makes debugging easier
    for (let i = 0; i < accounts.length; i++) {
        const result = await executeAccount(i, accounts.length, dataFeed, isDryRun);
        results.push(result);

        // Add delay between accounts to be nice to APIs (except for last account)
        if (i < accounts.length - 1) {
            const delayMs = 2000; // 2 seconds
            console.log(`${colors.gray}\n⏱️  Waiting ${delayMs / 1000}s before next account...${colors.reset}`);
            await delay(delayMs);
        }
    }

    // Print summary
    console.log(`\n\n${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}                    EXECUTION SUMMARY${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}\n`);

    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;

    console.log(`${colors.gray}Total Accounts: ${results.length}${colors.reset}`);
    console.log(`${colors.green}✓ Successful: ${successCount}${colors.reset}`);
    console.log(`${colors.red}✗ Failed: ${failureCount}${colors.reset}\n`);

    // List failed accounts if any
    if (failureCount > 0) {
        console.log(`${colors.red}Failed Accounts:${colors.reset}`);
        for (const result of results) {
            if (!result.success) {
                console.log(`${colors.red}  - ${result.accountName}: ${result.error?.message}${colors.reset}`);
            }
        }
        console.log();
    }

    // Exit with appropriate code
    if (failureCount > 0) {
        console.log(`${colors.red}❌ Exiting with errors (${failureCount} account(s) failed)${colors.reset}\n`);
        process.exit(1);
    } else {
        console.log(`${colors.green}✅ All accounts executed successfully${colors.reset}\n`);
        process.exit(0);
    }
}

// Execute main function
main().catch(error => {
    console.error(`\n${colors.red}❌ Fatal error:${colors.reset}`, error);
    process.exit(1);
});
