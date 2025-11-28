#!/usr/bin/env tsx

/**
 * Test Robinhood Broker Connection
 *
 * This script tests the connection to Robinhood broker and verifies:
 * - API credentials are configured
 * - RobinhoodBroker can be instantiated
 *
 * ⚠️  IMPORTANT: Robinhood integration is currently a PLACEHOLDER.
 * This test will show that the broker structure is correct, but actual
 * API calls will fail until RobinhoodClient is implemented.
 *
 * Usage:
 *   pnpm test-connection:robinhood
 *
 * Environment Variables Required:
 *   - ROBINHOOD_USERNAME (or use ACCOUNTS env var)
 *   - ROBINHOOD_PASSWORD (or use ACCOUNTS env var)
 *
 * To implement full Robinhood support:
 * 1. Create src/live/robinhoodClient.ts with OAuth authentication
 * 2. Update src/live/RobinhoodBroker.ts with actual API calls
 * 3. Test with real Robinhood credentials
 */

import dotenv from 'dotenv';
import { RobinhoodBroker } from '../live/RobinhoodBroker';
import { getConfiguredAccounts, BrokerType } from '../config/accounts';

// Load environment variables
dotenv.config({ path: '.env.local' });

// ANSI color codes
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    gray: '\x1b[90m',
};

async function testRobinhoodConnection() {
    console.log(`\n${colors.bright}${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.blue}       ROBINHOOD BROKER CONNECTION TEST${colors.reset}`);
    console.log(`${colors.bright}${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}\n`);

    console.log(`${colors.yellow}⚠️  NOTE: Robinhood integration is currently a placeholder${colors.reset}`);
    console.log(`${colors.yellow}This test verifies the broker structure but will not connect to Robinhood${colors.reset}\n`);

    // Try to find Robinhood account in configuration
    let robinhoodAccount = null;

    try {
        const accounts = getConfiguredAccounts();
        robinhoodAccount = accounts.find(acc => acc.broker === BrokerType.ROBINHOOD);

        if (!robinhoodAccount) {
            console.error(`${colors.red}❌ ERROR: No Robinhood account found in configuration${colors.reset}`);
            console.error(`\n${colors.yellow}Please add a Robinhood account to your ACCOUNTS env var:${colors.reset}`);
            console.error(`${colors.gray}ACCOUNTS='[
  {
    "name": "Robinhood Live",
    "key": "your_username",
    "secret": "your_password",
    "isPaper": false,
    "broker": "Robinhood"
  }
]'${colors.reset}\n`);
            process.exit(1);
        }

    } catch (error) {
        // If no ACCOUNTS env var, try individual credentials
        const username = process.env.ROBINHOOD_USERNAME;
        const password = process.env.ROBINHOOD_PASSWORD;

        if (!username || !password) {
            console.error(`${colors.red}❌ ERROR: Missing Robinhood credentials${colors.reset}`);
            console.error(`${colors.red}Please set ROBINHOOD_USERNAME and ROBINHOOD_PASSWORD in .env.local${colors.reset}`);
            console.error(`${colors.red}Or add a Robinhood account to the ACCOUNTS env var${colors.reset}\n`);
            process.exit(1);
        }

        robinhoodAccount = {
            name: 'Robinhood Test Account',
            key: username,
            secret: password,
            isPaper: false,
            broker: BrokerType.ROBINHOOD
        };
    }

    console.log(`${colors.gray}Account Name: ${colors.bright}${robinhoodAccount.name}${colors.reset}`);
    console.log(`${colors.gray}Username: ${robinhoodAccount.key}${colors.reset}`);
    console.log(`${colors.gray}Mode: ${colors.bright}LIVE${colors.reset} ${colors.yellow}(Robinhood doesn't support paper trading)${colors.reset}\n`);

    try {
        // Step 1: Test broker instantiation
        console.log(`${colors.blue}[1/3] Testing RobinhoodBroker instantiation...${colors.reset}`);
        const broker = new RobinhoodBroker(robinhoodAccount.key, robinhoodAccount.secret);
        console.log(`${colors.green}✓ RobinhoodBroker created successfully${colors.reset}`);
        console.log();

        // Step 2: Attempt to get portfolio state (will fail with helpful error)
        console.log(`${colors.blue}[2/3] Testing portfolio state retrieval...${colors.reset}`);
        console.log(`${colors.yellow}   (Expected to fail - implementation pending)${colors.reset}`);

        try {
            await broker.getPortfolioState();
            console.log(`${colors.green}✓ Portfolio state retrieved${colors.reset}`);
        } catch (error) {
            if (error instanceof Error && error.message.includes('not yet implemented')) {
                console.log(`${colors.yellow}⚠  Placeholder detected (as expected)${colors.reset}`);
                console.log(`${colors.gray}   ${error.message}${colors.reset}`);
            } else {
                throw error;
            }
        }
        console.log();

        // Step 3: Verification
        console.log(`${colors.blue}[3/3] Verification...${colors.reset}`);
        console.log(`${colors.green}✓ Broker structure is correct${colors.reset}`);
        console.log(`${colors.green}✓ Ready for Robinhood API implementation${colors.reset}`);
        console.log();

        console.log(`${colors.bright}${colors.yellow}═══════════════════════════════════════════════════════════${colors.reset}`);
        console.log(`${colors.bright}${colors.yellow}⚠  PARTIAL SUCCESS - Placeholder verified${colors.reset}`);
        console.log(`${colors.bright}${colors.yellow}═══════════════════════════════════════════════════════════${colors.reset}`);

        console.log(`\n${colors.yellow}Next Steps to Enable Robinhood Trading:${colors.reset}`);
        console.log(`${colors.gray}1. Implement src/live/robinhoodClient.ts${colors.reset}`);
        console.log(`${colors.gray}   - Add OAuth authentication${colors.reset}`);
        console.log(`${colors.gray}   - Add account fetching${colors.reset}`);
        console.log(`${colors.gray}   - Add position fetching${colors.reset}`);
        console.log(`${colors.gray}   - Add order placement with notional support${colors.reset}`);
        console.log(`\n${colors.gray}2. Update src/live/RobinhoodBroker.ts${colors.reset}`);
        console.log(`${colors.gray}   - Replace placeholder implementations${colors.reset}`);
        console.log(`${colors.gray}   - Use robinhoodClient for API calls${colors.reset}`);
        console.log(`\n${colors.gray}3. Test with real Robinhood credentials${colors.reset}`);
        console.log(`${colors.gray}   - Run this test script again${colors.reset}`);
        console.log(`${colors.gray}   - Verify portfolio state can be fetched${colors.reset}\n`);

        process.exit(0);

    } catch (error) {
        console.log();
        console.error(`${colors.bright}${colors.red}═══════════════════════════════════════════════════════════${colors.reset}`);
        console.error(`${colors.bright}${colors.red}❌ TEST FAILED - Unexpected error${colors.reset}`);
        console.error(`${colors.bright}${colors.red}═══════════════════════════════════════════════════════════${colors.reset}`);
        console.error(`\n${colors.red}Error:${colors.reset}`, error);
        console.error(`\n${colors.yellow}Troubleshooting:${colors.reset}`);
        console.error(`${colors.gray}1. Check your Robinhood credentials${colors.reset}`);
        console.error(`${colors.gray}2. Review src/live/RobinhoodBroker.ts for implementation status${colors.reset}`);
        console.error(`${colors.gray}3. See error message above for details${colors.reset}\n`);

        process.exit(1);
    }
}

// Run the test
testRobinhoodConnection();
