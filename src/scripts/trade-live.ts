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
import 'dotenv/config'; // Loads .env file from project root

import { getConfiguredAccounts } from '../config/accounts';
import { PolygonLiveDataFeed } from '../live/PolygonLiveDataFeed';
import { createBroker } from '../live/brokerFactory';
import { SlackNotifier } from '../adapters/SlackNotifier';
import { LiveRunner } from '../live/LiveRunner';
import { createDefaultStrategyParams } from '../strategy/engine';
import { StrategyDecision, MarketSnapshot } from '../strategy/types';
import { AlpacaClient } from '../live/alpacaClient';
import { getMarketStatus, isAppropriateForMOC, formatMinutes, getNyDate } from '../lib/market/schedule';

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
 * Execute trading for a single account using a pre-calculated decision
 */
async function executeAccount(
    accountIndex: number,
    totalAccounts: number,
    dataFeed: PolygonLiveDataFeed,
    isDryRun: boolean,
    decision: StrategyDecision,
    snapshot: MarketSnapshot
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

        // Get strategy parameters (not used directly here, but LiveRunner expects it)
        const params = createDefaultStrategyParams();

        // Create LiveRunner for this account
        const runner = new LiveRunner(
            dataFeed,
            broker,
            params,
            notifier,
            account
        );

        // Execute the trading run using the global decision
        if (isDryRun) {
            await runner.dryRunDecision(decision, snapshot);
        } else {
            await runner.executeDecision(decision, snapshot);
        }

        console.log(`${colors.green}✓ Account ${account.name} completed successfully${colors.reset}`);
        return { success: true, accountName: account.name };

    } catch (error) {
        console.error(`${colors.red}✗ Account ${account.name} FAILED${colors.reset}`);
        console.error(error);
        return { success: false, accountName: account.name, error: error instanceof Error ? error : new Error(String(error)) };
    }
}

async function main() {
    console.log(`\n${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}    ALPALO LIVE TRADING - MULTI-ACCOUNT ORCHESTRATOR    ${colors.reset}`);
    console.log(`${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}\n`);

    // Parse command line arguments
    const args = process.argv.slice(2);
    const isDryRun = args.includes('--dry-run');
    const skipMarketCheck = args.includes('--skip-market-check');

    if (isDryRun) {
        console.log(`${colors.yellow}⚠️  DRY RUN MODE - No real orders will be placed${colors.reset}\n`);
    }

    // 1. Check Market Schedule (unless skipped)
    if (!skipMarketCheck) {
        // Initialize Alpaca client just for market status check (using first account)
        const accounts = getConfiguredAccounts();
        if (accounts.length === 0) {
            console.error(`${colors.red}No accounts configured!${colors.reset}`);
            process.exit(1);
        }

        const alpaca = new AlpacaClient(
            accounts[0].key,
            accounts[0].secret,
            accounts[0].isPaper
        );

        console.log('Checking market schedule...');
        const status = await getMarketStatus(alpaca);
        const mocCheck = await isAppropriateForMOC(alpaca);

        if (!mocCheck.appropriate) {
            console.error(`${colors.red}❌ Market check failed: ${mocCheck.reason}${colors.reset}`);
            console.log(`Market Open: ${status.isOpen}`);
            console.log(`Time to Close: ${status.minutesToClose !== null ? formatMinutes(status.minutesToClose) : 'N/A'}`);
            process.exit(1);
        }

        console.log(`${colors.green}✓ Market is open and within trading window (${formatMinutes(mocCheck.minutesToClose!)} to close)${colors.reset}\n`);
    } else {
        console.log(`${colors.yellow}⚠️  SKIPPING MARKET SCHEDULE CHECK${colors.reset}\n`);
    }

    // 2. Validate Configuration
    const accounts = getConfiguredAccounts();
    if (accounts.length === 0) {
        console.error(`${colors.red}No accounts configured in ACCOUNTS environment variable.${colors.reset}`);
        process.exit(1);
    }

    // Warn about live accounts
    const liveAccounts = accounts.filter(a => !a.isPaper);
    if (liveAccounts.length > 0) {
        console.log(`${colors.red}⚠️  Account "${liveAccounts[0].name}" is configured for LIVE TRADING with Alpaca. Ensure you have appropriate safety measures in place.${colors.reset}`);
    }

    console.log(`📊 Configured Accounts: ${accounts.length}`);
    accounts.forEach(a => console.log(`   - ${a.name} (${a.isPaper ? 'PAPER' : 'LIVE'})`));
    console.log('');

    // 3. Initialize Data Feed (Once)
    console.log('🔄 Initializing Polygon data feed...');
    const dataFeed = new PolygonLiveDataFeed();
    console.log(`${colors.green}✓ Data feed initialized${colors.reset}\n`);

    // 4. Fetch Market Data & Run Strategy (Once)
    console.log('🔄 Fetching market data and generating strategy signal...');

    const executionDate = getNyDate();
    const snapshot = await dataFeed.getSnapshotForDate(executionDate);

    if (!snapshot) {
        console.error(`${colors.red}❌ Failed to fetch market snapshot for ${executionDate}${colors.reset}`);
        process.exit(1);
    }

    const params = createDefaultStrategyParams();
    // Dummy portfolio for signal generation
    const dummyPortfolio = { cash: 0, position: null, totalEquity: 0 };

    // Import runStrategy dynamically or statically. Statically is fine since we are in tsx.
    // But we need to import it. It is not imported at top level?
    // Ah, I see `import { createDefaultStrategyParams } from '../strategy/engine';` at top.
    // I need to add `runStrategy` to that import.
    // Wait, I will add it to the import list in this file content.
    const { runStrategy } = await import('../strategy/engine');

    const decision = runStrategy(snapshot, dummyPortfolio, params);

    console.log(`${colors.green}✓ Strategy signal generated: ${decision.action} ${decision.symbol} (${(decision.weight * 100).toFixed(1)}%)${colors.reset}`);
    console.log(`${colors.gray}Reason: ${decision.reason}${colors.reset}\n`);

    // 5. Execute for Each Account
    const results = [];
    for (let i = 0; i < accounts.length; i++) {
        // Add a small delay between accounts to avoid rate limits
        if (i > 0) await delay(2000);

        const result = await executeAccount(i, accounts.length, dataFeed, isDryRun, decision, snapshot);
        results.push(result);
    }

    // 6. Summary
    console.log(`\n\n${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`                    EXECUTION SUMMARY                    `);
    console.log(`${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}\n`);

    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log(`Total Accounts: ${accounts.length}`);
    console.log(`${colors.green}✓ Successful: ${successful}${colors.reset}`);
    if (failed > 0) {
        console.log(`${colors.red}✗ Failed: ${failed}${colors.reset}`);
        results.filter(r => !r.success).forEach(r => {
            console.log(`  - ${r.accountName}: ${r.error?.message}`);
        });
    }

    if (failed > 0) {
        console.log(`\n${colors.red}❌ Some accounts failed to execute${colors.reset}`);
        process.exit(1);
    } else {
        console.log(`\n${colors.green}✅ All accounts executed successfully${colors.reset}`);
        process.exit(0);
    }
}

// Run main
main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
});
