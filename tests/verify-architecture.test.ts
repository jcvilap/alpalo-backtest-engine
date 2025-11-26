#!/usr/bin/env tsx
/**
 * Quick test to verify that the refactored architecture
 * produces identical results to the old implementation.
 */

import { BacktestEngine as OldEngine } from '../src/lib/backtest/backtestEngine';
import { BacktestDataFeed } from '../src/backtest/BacktestDataFeed';
import { BacktestBroker } from '../src/backtest/BacktestBroker';
import { BacktestRunner } from '../src/backtest/BacktestRunner';
import { createDefaultStrategyParams } from '../src/strategy/engine';
import { OHLC } from '../src/lib/types';

// Generate mock data for testing
function generateMockData(days: number, startPrice: number = 100): OHLC[] {
    const data: OHLC[] = [];
    let price = startPrice;

    for (let i = 0; i < days; i++) {
        const date = new Date(2020, 0, 1 + i).toISOString().split('T')[0];
        // Simulate random walk with slight upward bias
        const change = (Math.random() - 0.48) * 2; // Slight upward bias
        price = Math.max(price + change, 10); // Keep price above 10

        data.push({
            date,
            open: price,
            high: price * 1.01,
            low: price * 0.99,
            close: price
        });
    }

    return data;
}

async function testRefactor() {
    console.log('🧪 Testing refactored architecture...\n');

    const days = 300; // Enough for warmup + trading
    const capital = 1_000_000;

    // Generate test data
    const qqqData = generateMockData(days, 300);
    const tqqqData = generateMockData(days, 100);
    const sqqqData = generateMockData(days, 50);

    const displayFrom = qqqData[200].date; // After warmup

    console.log('📊 Test data generated:');
    console.log(`  - ${days} days of data`);
    console.log(`  - Display from: ${displayFrom}`);
    console.log(`  - Initial capital: $${capital.toLocaleString()}\n`);

    // Run OLD implementation
    console.log('⏳ Running OLD implementation...');
    const startOld = Date.now();
    const oldEngine = new OldEngine(capital);
    const oldResult = oldEngine.run(qqqData, tqqqData, sqqqData, displayFrom);
    const timeOld = Date.now() - startOld;

    console.log('✓ Old implementation complete');
    console.log(`  - Trades: ${oldResult.trades.length}`);
    console.log(`  - Total Return: ${oldResult.metrics.totalReturn.toFixed(2)}%`);
    console.log(`  - CAGR: ${oldResult.metrics.cagr.toFixed(2)}%`);
    console.log(`  - Max Drawdown: ${oldResult.metrics.maxDrawdown.toFixed(2)}%`);
    console.log(`  - Time: ${timeOld}ms\n`);

    // Run NEW implementation
    console.log('⏳ Running NEW implementation...');
    const startNew = Date.now();
    const dataFeed = new BacktestDataFeed(qqqData, tqqqData, sqqqData);
    const broker = new BacktestBroker(capital);
    const params = createDefaultStrategyParams();
    const runner = new BacktestRunner(dataFeed, broker, params);

    const { firstDate, lastDate } = dataFeed.getAvailableDateRange();
    const newResult = await runner.run({
        startDate: firstDate,
        endDate: lastDate,
        initialCapital: capital,
        displayFrom
    });
    const timeNew = Date.now() - startNew;

    console.log('✓ New implementation complete');
    console.log(`  - Trades: ${newResult.trades.length}`);
    console.log(`  - Total Return: ${newResult.metrics.totalReturn.toFixed(2)}%`);
    console.log(`  - CAGR: ${newResult.metrics.cagr.toFixed(2)}%`);
    console.log(`  - Max Drawdown: ${newResult.metrics.maxDrawdown.toFixed(2)}%`);
    console.log(`  - Time: ${timeNew}ms\n`);

    // Compare results
    console.log('📊 Comparison:');

    const tradesMatch = oldResult.trades.length === newResult.trades.length;
    const returnMatch = Math.abs(oldResult.metrics.totalReturn - newResult.metrics.totalReturn) < 0.01;
    const cagrMatch = Math.abs(oldResult.metrics.cagr - newResult.metrics.cagr) < 0.01;
    const ddMatch = Math.abs(oldResult.metrics.maxDrawdown - newResult.metrics.maxDrawdown) < 0.01;

    console.log(`  ✓ Trades count match: ${tradesMatch ? '✅' : '❌'} (old: ${oldResult.trades.length}, new: ${newResult.trades.length})`);
    console.log(`  ✓ Total return match: ${returnMatch ? '✅' : '❌'} (diff: ${Math.abs(oldResult.metrics.totalReturn - newResult.metrics.totalReturn).toFixed(4)}%)`);
    console.log(`  ✓ CAGR match: ${cagrMatch ? '✅' : '❌'} (diff: ${Math.abs(oldResult.metrics.cagr - newResult.metrics.cagr).toFixed(4)}%)`);
    console.log(`  ✓ Max DD match: ${ddMatch ? '✅' : '❌'} (diff: ${Math.abs(oldResult.metrics.maxDrawdown - newResult.metrics.maxDrawdown).toFixed(4)}%)`);

    const allMatch = tradesMatch && returnMatch && cagrMatch && ddMatch;

    console.log('\n' + (allMatch ? '✅ ALL TESTS PASSED!' : '❌ SOME TESTS FAILED'));

    if (!allMatch) {
        process.exit(1);
    }
}

testRefactor().catch(error => {
    console.error('❌ Test failed:', error);
    process.exit(1);
});
