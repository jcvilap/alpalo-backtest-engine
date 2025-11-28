#!/usr/bin/env tsx

/**
 * Test All Broker Connections
 *
 * This script tests connections to all configured broker accounts and provides
 * a comprehensive summary of results.
 *
 * Tests performed:
 * - Validates account configuration
 * - Tests API authentication
 * - Retrieves account information
 * - Fetches portfolio state
 * - Verifies broker-specific features
 *
 * Usage:
 *   pnpm test-connection
 *
 * Environment Variables Required:
 *   - ACCOUNTS: JSON array of account configurations
 *   OR
 *   - Legacy Alpaca credentials (PAPER/LIVE_ALPACA_KEY_ID, etc.)
 */

import dotenv from 'dotenv';
import { getConfiguredAccounts, BrokerType, AccountConfig } from '../config/accounts';
import { AlpacaClient } from '../live/alpacaClient';
import { AlpacaBroker } from '../live/AlpacaBroker';
import { RobinhoodBroker } from '../live/RobinhoodBroker';

// Load environment variables
dotenv.config({ path: '.env.local' });

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

interface TestResult {
    accountName: string;
    broker: string;
    isPaper: boolean;
    success: boolean;
    details?: {
        accountId?: string;
        cash?: number;
        equity?: number;
        status?: string;
    };
    error?: string;
}

/**
 * Test Alpaca broker connection
 */
async function testAlpacaAccount(accountName: string, key: string, secret: string): Promise<Omit<TestResult, 'accountName' | 'broker' | 'isPaper'>> {
    try {
        const client = new AlpacaClient(key, secret);
        const broker = new AlpacaBroker(client);

        // Get account info
        const account = await client.getAccount();

        // Get portfolio state
        const portfolio = await broker.getPortfolioState();

        return {
            success: true,
            details: {
                accountId: account.id,
                cash: portfolio.cash,
                equity: portfolio.totalEquity,
                status: account.status
            }
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}

/**
 * Test Robinhood broker connection
 */
async function testRobinhoodAccount(accountName: string, key: string, secret: string): Promise<Omit<TestResult, 'accountName' | 'broker' | 'isPaper'>> {
    try {
        const broker = new RobinhoodBroker(key, secret);

        // Attempt to get portfolio state (will fail with placeholder)
        try {
            const portfolio = await broker.getPortfolioState();
            return {
                success: true,
                details: {
                    cash: portfolio.cash,
                    equity: portfolio.totalEquity
                }
            };
        } catch (error) {
            // Check if it's the expected "not implemented" error
            if (error instanceof Error && error.message.includes('not yet implemented')) {
                return {
                    success: false,
                    error: 'Placeholder - Robinhood API not yet implemented'
                };
            }
            throw error;
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}

/**
 * Test a single account connection
 */
async function testAccount(account: AccountConfig): Promise<TestResult> {
    const brokerType = account.broker || BrokerType.ALPACA;
    const result: TestResult = {
        accountName: account.name,
        broker: brokerType,
        isPaper: account.isPaper,
        success: false
    };

    console.log(`${colors.blue}Testing ${account.name} (${brokerType})...${colors.reset}`);

    try {
        if (brokerType === BrokerType.ALPACA) {
            const testResult = await testAlpacaAccount(account.name, account.key, account.secret);
            Object.assign(result, testResult);
        } else if (brokerType === BrokerType.ROBINHOOD) {
            const testResult = await testRobinhoodAccount(account.name, account.key, account.secret);
            Object.assign(result, testResult);
        } else {
            result.error = `Unsupported broker: ${brokerType}`;
        }
    } catch (error) {
        result.error = error instanceof Error ? error.message : String(error);
    }

    // Print immediate result
    if (result.success) {
        console.log(`${colors.green}✓ ${account.name} - Connected successfully${colors.reset}`);
        if (result.details) {
            console.log(`${colors.gray}  Equity: $${result.details.equity?.toFixed(2) || 'N/A'}${colors.reset}`);
        }
    } else {
        console.log(`${colors.red}✗ ${account.name} - ${result.error}${colors.reset}`);
    }
    console.log();

    return result;
}

/**
 * Print summary table
 */
function printSummary(results: TestResult[]) {
    console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}                    CONNECTION SUMMARY${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}\n`);

    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;

    console.log(`${colors.gray}Total Accounts: ${results.length}${colors.reset}`);
    console.log(`${colors.green}✓ Successful: ${successCount}${colors.reset}`);
    console.log(`${colors.red}✗ Failed: ${failureCount}${colors.reset}\n`);

    // Detailed results table
    console.log(`${colors.bright}Account Details:${colors.reset}`);
    console.log(`${colors.gray}${'─'.repeat(80)}${colors.reset}`);

    for (const result of results) {
        const statusIcon = result.success ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
        const brokerTag = `[${result.broker}]`;
        const modeTag = result.isPaper ? '[PAPER]' : '[LIVE]';

        console.log(`${statusIcon} ${colors.bright}${result.accountName}${colors.reset} ${colors.gray}${brokerTag} ${modeTag}${colors.reset}`);

        if (result.success && result.details) {
            if (result.details.accountId) {
                console.log(`${colors.gray}   ID: ${result.details.accountId}${colors.reset}`);
            }
            if (result.details.status) {
                console.log(`${colors.gray}   Status: ${result.details.status}${colors.reset}`);
            }
            if (result.details.cash !== undefined) {
                console.log(`${colors.gray}   Cash: $${result.details.cash.toFixed(2)}${colors.reset}`);
            }
            if (result.details.equity !== undefined) {
                console.log(`${colors.gray}   Equity: $${result.details.equity.toFixed(2)}${colors.reset}`);
            }
        } else if (result.error) {
            console.log(`${colors.red}   Error: ${result.error}${colors.reset}`);
        }
        console.log();
    }

    console.log(`${colors.gray}${'─'.repeat(80)}${colors.reset}\n`);

    // Broker breakdown
    const alpacaResults = results.filter(r => r.broker === BrokerType.ALPACA);
    const robinhoodResults = results.filter(r => r.broker === BrokerType.ROBINHOOD);

    if (alpacaResults.length > 0) {
        const alpacaSuccess = alpacaResults.filter(r => r.success).length;
        console.log(`${colors.blue}Alpaca:${colors.reset} ${alpacaSuccess}/${alpacaResults.length} connected`);
    }

    if (robinhoodResults.length > 0) {
        const robinhoodSuccess = robinhoodResults.filter(r => r.success).length;
        console.log(`${colors.blue}Robinhood:${colors.reset} ${robinhoodSuccess}/${robinhoodResults.length} connected`);
        if (robinhoodSuccess === 0) {
            console.log(`${colors.yellow}  Note: Robinhood integration is a placeholder - implement API client to enable${colors.reset}`);
        }
    }

    console.log();

    // Final status
    if (failureCount === 0) {
        console.log(`${colors.bright}${colors.green}✅ ALL CONNECTIONS SUCCESSFUL${colors.reset}\n`);
        return 0;
    } else if (successCount > 0) {
        console.log(`${colors.bright}${colors.yellow}⚠️  PARTIAL SUCCESS - Some connections failed${colors.reset}\n`);
        return 1;
    } else {
        console.log(`${colors.bright}${colors.red}❌ ALL CONNECTIONS FAILED${colors.reset}\n`);
        return 1;
    }
}

/**
 * Main test function
 */
async function main() {
    console.log(`\n${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}         BROKER CONNECTION TEST - ALL ACCOUNTS${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}\n`);

    // Load accounts
    let accounts;
    try {
        accounts = getConfiguredAccounts();
    } catch (error) {
        console.error(`${colors.red}❌ Failed to load account configuration${colors.reset}`);
        console.error(`${colors.red}Error: ${error instanceof Error ? error.message : String(error)}${colors.reset}\n`);
        process.exit(1);
    }

    if (accounts.length === 0) {
        console.error(`${colors.red}❌ No accounts configured${colors.reset}`);
        console.error(`${colors.yellow}Please configure accounts using ACCOUNTS env var or legacy credentials${colors.reset}\n`);
        process.exit(1);
    }

    console.log(`${colors.gray}Found ${accounts.length} account(s) to test\n${colors.reset}`);

    // Test each account
    const results: TestResult[] = [];
    for (let i = 0; i < accounts.length; i++) {
        console.log(`${colors.gray}[${i + 1}/${accounts.length}]${colors.reset}`);
        const result = await testAccount(accounts[i]);
        results.push(result);
    }

    // Print summary
    const exitCode = printSummary(results);

    process.exit(exitCode);
}

// Run the test
main().catch(error => {
    console.error(`\n${colors.red}❌ Fatal error:${colors.reset}`, error);
    process.exit(1);
});
