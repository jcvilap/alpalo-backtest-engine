/**
 * Test script for Alpaca client
 *
 * Verifies that the Alpaca client can connect and fetch basic account information.
 * Run with: PAPER_ALPACA_KEY_ID=xxx PAPER_ALPACA_SECRET_KEY=yyy npx tsx scripts/test-alpaca.ts
 */

import { AlpacaClient } from '../src/live/alpacaClient';

async function testAlpacaClient() {
    console.log('Testing Alpaca client...\n');

    try {
        // Create a paper trading client
        const client = new AlpacaClient(true);
        console.log('✓ Alpaca client created (paper trading mode)\n');

        // Test 1: Get account information
        console.log('Test 1: Fetching account information...');
        const account = await client.getAccount();
        console.log('✓ Account fetched successfully');
        console.log(`  Account ID: ${account.id}`);
        console.log(`  Status: ${account.status}`);
        console.log(`  Cash: $${parseFloat(account.cash).toFixed(2)}`);
        console.log(`  Portfolio Value: $${parseFloat(account.portfolio_value).toFixed(2)}`);
        console.log(`  Buying Power: $${parseFloat(account.buying_power).toFixed(2)}`);
        console.log();

        // Test 2: Get market clock
        console.log('Test 2: Fetching market clock...');
        const clock = await client.getClock();
        console.log('✓ Market clock fetched successfully');
        console.log(`  Market Open: ${clock.is_open ? 'Yes' : 'No'}`);
        console.log(`  Current Time: ${clock.timestamp}`);
        console.log(`  Next Open: ${clock.next_open}`);
        console.log(`  Next Close: ${clock.next_close}`);
        console.log();

        // Test 3: Get current positions
        console.log('Test 3: Fetching current positions...');
        const positions = await client.getPositions();
        console.log(`✓ Positions fetched successfully (${positions.length} positions)`);
        if (positions.length > 0) {
            positions.forEach(pos => {
                console.log(`  ${pos.symbol}: ${pos.qty} shares @ $${pos.avg_entry_price} (${pos.side})`);
                console.log(`    Market Value: $${pos.market_value}`);
                console.log(`    Unrealized P&L: $${pos.unrealized_pl} (${pos.unrealized_plpc}%)`);
            });
        } else {
            console.log('  No positions currently held');
        }
        console.log();

        // Test 4: Get open orders
        console.log('Test 4: Fetching open orders...');
        const orders = await client.getOrders('open');
        console.log(`✓ Orders fetched successfully (${orders.length} open orders)`);
        if (orders.length > 0) {
            orders.forEach(order => {
                console.log(`  ${order.symbol}: ${order.side} ${order.qty} @ ${order.type}`);
                console.log(`    Status: ${order.status}`);
                console.log(`    Created: ${order.created_at}`);
            });
        } else {
            console.log('  No open orders');
        }
        console.log();

        console.log('✅ All tests passed!\n');
    } catch (error) {
        console.error('❌ Test failed:', error);
        process.exit(1);
    }
}

testAlpacaClient();
