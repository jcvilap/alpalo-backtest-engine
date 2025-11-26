/**
 * Test script for Alpaca connection using official SDK
 */

const Alpaca = require('@alpacahq/alpaca-trade-api');

async function testAlpacaConnection() {
    console.log('Testing Alpaca connection with official SDK...\n');

    try {
        // Create Alpaca client
        const alpaca = new Alpaca({
            keyId: process.env.PAPER_ALPACA_KEY_ID,
            secretKey: process.env.PAPER_ALPACA_SECRET_KEY,
            paper: true,
            usePolygon: false
        });

        console.log('✓ Alpaca client created (paper trading mode)\n');

        // Test 1: Get account information
        console.log('Test 1: Fetching account information...');
        const account = await alpaca.getAccount();
        console.log('✓ Account fetched successfully');
        console.log(`  Account ID: ${account.id}`);
        console.log(`  Status: ${account.status}`);
        console.log(`  Cash: $${parseFloat(account.cash).toFixed(2)}`);
        console.log(`  Portfolio Value: $${parseFloat(account.portfolio_value).toFixed(2)}`);
        console.log(`  Buying Power: $${parseFloat(account.buying_power).toFixed(2)}`);
        console.log(`  Pattern Day Trader: ${account.pattern_day_trader}`);
        console.log();

        // Test 2: Get market clock
        console.log('Test 2: Fetching market clock...');
        const clock = await alpaca.getClock();
        console.log('✓ Market clock fetched successfully');
        console.log(`  Market Open: ${clock.is_open ? 'Yes' : 'No'}`);
        console.log(`  Current Time: ${clock.timestamp}`);
        console.log(`  Next Open: ${clock.next_open}`);
        console.log(`  Next Close: ${clock.next_close}`);
        console.log();

        // Test 3: Get positions
        console.log('Test 3: Fetching current positions...');
        const positions = await alpaca.getPositions();
        console.log(`✓ Positions fetched successfully (${positions.length} positions)`);
        if (positions.length > 0) {
            positions.forEach((pos: any) => {
                console.log(`  ${pos.symbol}: ${pos.qty} shares @ $${pos.avg_entry_price} (${pos.side})`);
                console.log(`    Market Value: $${pos.market_value}`);
                console.log(`    Unrealized P&L: $${pos.unrealized_pl} (${pos.unrealized_plpc}%)`);
            });
        } else {
            console.log('  No positions currently held');
        }
        console.log();

        // Test 4: Get orders
        console.log('Test 4: Fetching open orders...');
        const orders = await alpaca.getOrders({ status: 'open' });
        console.log(`✓ Orders fetched successfully (${orders.length} open orders)`);
        if (orders.length > 0) {
            orders.forEach((order: any) => {
                console.log(`  ${order.symbol}: ${order.side} ${order.qty} @ ${order.type}`);
                console.log(`    Status: ${order.status}`);
                console.log(`    Created: ${order.created_at}`);
            });
        } else {
            console.log('  No open orders');
        }
        console.log();

        console.log('✅ All tests passed!\n');
        console.log('Connection Details:');
        console.log(`  Base URL: ${alpaca.configuration.baseUrl}`);
        console.log(`  Paper Trading: ${alpaca.configuration.paper}`);
        console.log(`  Key ID: ${alpaca.configuration.keyId.substring(0, 8)}...`);

    } catch (error: any) {
        console.error('❌ Test failed:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        process.exit(1);
    }
}

testAlpacaConnection();
