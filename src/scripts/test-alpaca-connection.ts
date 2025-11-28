#!/usr/bin/env tsx

/**
 * Test Alpaca Broker Connection
 *
 * This script tests the connection to Alpaca broker and verifies:
 * - API credentials are valid
 * - Account information can be retrieved
 * - Portfolio state can be fetched
 *
 * Usage:
 *   pnpm test-connection:alpaca
 *
 * Environment Variables Required:
 *   - PAPER_ALPACA_KEY_ID or LIVE_ALPACA_KEY_ID
 *   - PAPER_ALPACA_SECRET_KEY or LIVE_ALPACA_SECRET_KEY
 *   - TRADING_MODE (optional, defaults to PAPER)
 */

import dotenv from 'dotenv';
import { AlpacaClient } from '../live/alpacaClient';
import { AlpacaBroker } from '../live/AlpacaBroker';
import { getTradingMode, TradingMode } from '../config/env';

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

async function testAlpacaConnection() {
    console.log(`\n${colors.bright}${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.blue}         ALPACA BROKER CONNECTION TEST${colors.reset}`);
    console.log(`${colors.bright}${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}\n`);

    // Determine trading mode
    const mode = getTradingMode();
    const isPaper = mode !== TradingMode.LIVE;

    console.log(`${colors.gray}Trading Mode: ${colors.bright}${mode}${colors.reset}`);
    console.log(`${colors.gray}Account Type: ${colors.bright}${isPaper ? 'PAPER' : 'LIVE'}${colors.reset}\n`);

    // Get credentials
    const keyId = isPaper ? process.env.PAPER_ALPACA_KEY_ID : process.env.LIVE_ALPACA_KEY_ID;
    const secretKey = isPaper ? process.env.PAPER_ALPACA_SECRET_KEY : process.env.LIVE_ALPACA_SECRET_KEY;

    if (!keyId || !secretKey) {
        console.error(`${colors.red}❌ ERROR: Missing Alpaca credentials${colors.reset}`);
        console.error(`${colors.red}Please set ${isPaper ? 'PAPER' : 'LIVE'}_ALPACA_KEY_ID and _SECRET_KEY in .env.local${colors.reset}\n`);
        process.exit(1);
    }

    console.log(`${colors.gray}API Key ID: ${keyId.substring(0, 8)}...${colors.reset}`);
    console.log();

    try {
        // Step 1: Test AlpacaClient connection
        console.log(`${colors.blue}[1/3] Testing AlpacaClient connection...${colors.reset}`);
        const client = new AlpacaClient(keyId, secretKey);

        const account = await client.getAccount();
        console.log(`${colors.green}✓ Connected to Alpaca API${colors.reset}`);
        console.log(`${colors.gray}   Account ID: ${account.id}${colors.reset}`);
        console.log(`${colors.gray}   Account Status: ${account.status}${colors.reset}`);
        console.log();

        // Step 2: Test market clock
        console.log(`${colors.blue}[2/3] Testing market clock...${colors.reset}`);
        const clock = await client.getClock();
        console.log(`${colors.green}✓ Market clock retrieved${colors.reset}`);
        console.log(`${colors.gray}   Market is ${clock.is_open ? 'OPEN' : 'CLOSED'}${colors.reset}`);
        console.log(`${colors.gray}   Next open: ${new Date(clock.next_open).toLocaleString()}${colors.reset}`);
        console.log(`${colors.gray}   Next close: ${new Date(clock.next_close).toLocaleString()}${colors.reset}`);
        console.log();

        // Step 3: Test AlpacaBroker
        console.log(`${colors.blue}[3/3] Testing AlpacaBroker...${colors.reset}`);
        const broker = new AlpacaBroker(client);
        const portfolio = await broker.getPortfolioState();
        console.log(`${colors.green}✓ Portfolio state retrieved${colors.reset}`);
        console.log(`${colors.gray}   Cash: $${portfolio.cash.toFixed(2)}${colors.reset}`);
        console.log(`${colors.gray}   Total Equity: $${portfolio.totalEquity.toFixed(2)}${colors.reset}`);

        if (portfolio.position) {
            console.log(`${colors.gray}   Position: ${portfolio.position.shares} shares of ${portfolio.position.symbol} @ $${portfolio.position.avgEntryPrice.toFixed(2)}${colors.reset}`);
        } else {
            console.log(`${colors.gray}   Position: None${colors.reset}`);
        }

        console.log();
        console.log(`${colors.bright}${colors.green}═══════════════════════════════════════════════════════════${colors.reset}`);
        console.log(`${colors.bright}${colors.green}✓ ALL TESTS PASSED - Alpaca connection successful!${colors.reset}`);
        console.log(`${colors.bright}${colors.green}═══════════════════════════════════════════════════════════${colors.reset}\n`);

        process.exit(0);

    } catch (error) {
        console.log();
        console.error(`${colors.bright}${colors.red}═══════════════════════════════════════════════════════════${colors.reset}`);
        console.error(`${colors.bright}${colors.red}❌ TEST FAILED - Connection error${colors.reset}`);
        console.error(`${colors.bright}${colors.red}═══════════════════════════════════════════════════════════${colors.reset}`);
        console.error(`\n${colors.red}Error:${colors.reset}`, error);
        console.error(`\n${colors.yellow}Troubleshooting:${colors.reset}`);
        console.error(`${colors.gray}1. Verify your API credentials are correct${colors.reset}`);
        console.error(`${colors.gray}2. Check if your Alpaca account is active${colors.reset}`);
        console.error(`${colors.gray}3. Ensure you're using the correct environment (PAPER vs LIVE)${colors.reset}`);
        console.error(`${colors.gray}4. Check your internet connection${colors.reset}\n`);

        process.exit(1);
    }
}

// Run the test
testAlpacaConnection();
