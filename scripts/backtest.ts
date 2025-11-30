#!/usr/bin/env tsx

/**
 * CLI Backtest Tool
 * Run backtests from the command line without opening the browser
 *
 * Usage:
 *   pnpm run backtest                                    # All timeframes with current (default) strategy
 *   pnpm run backtest --timeframes=1YR                   # Last 1 year with current strategy
 *   pnpm run backtest --timeframes=3M,1YR,YTD            # Multiple timeframes with current strategy
 *   pnpm run backtest --timeframes=2011-01-01:2011-12-31 # Custom date range with current strategy
 *   pnpm run backtest --timeframes=2011-01-01:2011-12-31 --strategies=current,proposed-volatility-protected
 *                                                        # Compare strategies on 2011 data
 *   pnpm run backtest --timeframes=1YR,3YR,5YR --strategies=current,proposed-volatility-protected
 *                                                        # Compare strategies on multiple timeframes
 *
 * Available strategies:
 *   current                       - Ensemble strategy (trend-following + mean reversion) [DEFAULT]
 *   trend-following               - Simple MA250 crossover (original baseline)
 *   proposed-volatility-protected - Enhanced strategy with ADX/RSI/ATR filters
 */

// Load environment variables BEFORE other imports (PolygonClient initializes Redis at module level)
// Load environment variables BEFORE other imports (PolygonClient initializes Redis at module level)
import 'dotenv/config'; // Loads .env file from project root

import { OHLC, Strategy } from '../src/lib/types';
import { BacktestResult } from '../src/lib/backtest/backtestEngine';
import { PolygonClient } from '../src/lib/polygon/client';
import { getDateRange, DATE_RANGE_OPTIONS, DateRangeKey, getNYNow, formatNYDate, toNYDate } from '../src/lib/utils/dateUtils';
import { fetchBacktestData } from '../src/lib/backtest/dataFetcher';
import { printBacktestResult, printComparisonTable } from '../src/lib/utils/resultPrinter';
import { BacktestDataFeed } from '../src/backtest/BacktestDataFeed';
import { BacktestBroker } from '../src/backtest/BacktestBroker';
import { BacktestRunner } from '../src/backtest/BacktestRunner';
import { createDefaultStrategyParams } from '../src/strategy/engine';
import { StrategyRegistry } from '../src/lib/strategy/strategyRegistry';

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

async function runBacktest(
    qqqData: OHLC[],
    tqqqData: OHLC[],
    sqqqData: OHLC[],
    capital: number,
    displayFrom: string,
    displayTo?: string,
    strategy?: Strategy
): Promise<BacktestResult> {
    // Filter data to match the requested range (up to displayTo)
    // We don't filter start here because the engine needs warmup data before displayFrom
    let filteredQQQ = qqqData;
    let filteredTQQQ = tqqqData;
    let filteredSQQQ = sqqqData;

    if (displayTo) {
        const toDate = toNYDate(displayTo);
        filteredQQQ = qqqData.filter(d => toNYDate(d.date) <= toDate);
        filteredTQQQ = tqqqData.filter(d => toNYDate(d.date) <= toDate);
        filteredSQQQ = sqqqData.filter(d => toNYDate(d.date) <= toDate);
    }

    const dataFeed = new BacktestDataFeed(filteredQQQ, filteredTQQQ, filteredSQQQ);
    const broker = new BacktestBroker(capital);
    const params = createDefaultStrategyParams();
    const runner = new BacktestRunner(dataFeed, broker, params, strategy);

    const { firstDate, lastDate } = dataFeed.getAvailableDateRange();

    return runner.run({
        startDate: firstDate,
        endDate: lastDate,
        initialCapital: capital,
        displayFrom
    });
}

async function main() {
    console.log(`\n${colors.bright}═══════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}         ALPALO BACKTEST ENGINE - CLI MODE${colors.reset}`);
    console.log(`${colors.bright}═══════════════════════════════════════════════════════════${colors.reset}\n`);

    const args = process.argv.slice(2);
    let capital: number = 1_000_000;
    let ranges: string[] = [];
    let strategyNames: string[] = [];
    let strategiesExplicitlySet = false;

    // Parse arguments (only --flag=value notation supported)
    for (const arg of args) {
        if (arg.startsWith('--capital=')) {
            capital = Number(arg.split('=')[1]);
        } else if (arg.startsWith('--timeframes=')) {
            const value = arg.split('=')[1];
            ranges = value.split(',').map(r => r.trim());
        } else if (arg.startsWith('--strategies=')) {
            const value = arg.split('=')[1];
            strategyNames = value.split(',').map(s => s.trim());
            strategiesExplicitlySet = true;
        } else if (arg.startsWith('--')) {
            console.warn(`Unknown flag: ${arg}`);
        }
    }

    // Default to all predefined timeframes if none specified
    if (ranges.length === 0) {
        ranges = [...DATE_RANGE_OPTIONS];
    }

    // Default to 'current' strategy if none specified
    if (strategyNames.length === 0) {
        strategyNames = ['current'];
    }

    // 1. Determine Fetch Range (widest possible)
    let minDate = getNYNow().toISOString().split('T')[0];
    const today = formatNYDate(getNYNow());

    const rangeConfigs = ranges.map(r => {
        let start: string;
        let end: string = today;

        if (DATE_RANGE_OPTIONS.includes(r as DateRangeKey)) {
            // Use new dateUtils logic
            const range = getDateRange(r as DateRangeKey, getNYNow());
            start = range.startDate;
            end = range.endDate;
        } else if (r.includes(':')) {
            // Custom range: YYYY-MM-DD:YYYY-MM-DD
            const [s, e] = r.split(':');
            start = s;
            end = e;
        } else {
            // Assume custom date or just start date
            start = r;
        }

        if (start < minDate) minDate = start;
        return { label: r, start, end };
    });

    // Fetch start date (1 year prior for warmup)
    const fetchStartDate = toNYDate(minDate);
    fetchStartDate.setFullYear(fetchStartDate.getFullYear() - 1);
    const fetchStartStr = formatNYDate(fetchStartDate);

    try {
        // Initialize Polygon client
        const polygonClient = new PolygonClient();

        console.log(`${colors.blue}📊 Fetching historical data...${colors.reset}`);

        // Fetch data once
        const { qqqData, tqqqData, sqqqData } = await fetchBacktestData(polygonClient, fetchStartStr, today);

        if (tqqqData.length === 0) {
            console.error(`${colors.red}❌ No data available for TQQQ${colors.reset}`);
            return;
        }

        console.log(`${colors.green}✓ Loaded ${qqqData.length} trading days${colors.reset}\n`);

        // Strategy Comparison Mode (when strategies explicitly specified)
        if (strategiesExplicitlySet) {
            console.log(`${colors.gray}⚡ Running strategy comparison...${colors.reset}`);
            console.log(`${colors.gray}   Strategies: ${strategyNames.join(', ')}${colors.reset}`);
            console.log(`${colors.gray}   Timeframes: ${ranges.join(', ')}${colors.reset}\n`);

            // Use first range config (or default if empty)
            const config = rangeConfigs[0];

            // Run backtest for each strategy
            const strategyResults: { strategy: string; result: BacktestResult }[] = [];

            for (const strategyName of strategyNames) {
                try {
                    const strategy = StrategyRegistry.get(strategyName);
                    console.log(`${colors.gray}   Running ${strategyName}...${colors.reset}`);
                    const result = await runBacktest(qqqData, tqqqData, sqqqData, capital, config.start, config.end, strategy);
                    strategyResults.push({ strategy: strategyName, result });
                } catch (error) {
                    console.error(`${colors.red}   ❌ Error with strategy "${strategyName}": ${error}${colors.reset}`);
                }
            }

            // Print strategy comparison table
            console.log(`\n${colors.bright}═══════════════════════════════════════════════════════════${colors.reset}`);
            console.log(`${colors.bright}${colors.cyan}         STRATEGY COMPARISON${colors.reset}`);
            console.log(`${colors.bright}═══════════════════════════════════════════════════════════${colors.reset}\n`);

            console.log(`${colors.cyan}Date Range: ${config.start} → ${config.end}${colors.reset}`);
            console.log(`${colors.cyan}Initial Capital: $${capital.toLocaleString()}${colors.reset}\n`);

            // Print table header
            console.log(`${colors.bright}${'Strategy'.padEnd(25)} ${'Return'.padEnd(12)} ${'CAGR'.padEnd(10)} ${'MaxDD'.padEnd(10)} ${'Trades'.padEnd(10)}${colors.reset}`);
            console.log('─'.repeat(80));

            // Print each strategy
            for (const { strategy, result } of strategyResults) {
                const totalReturn = result.metrics.totalReturn;
                const returnStr = totalReturn >= 0
                    ? `${colors.green}+${totalReturn.toFixed(2)}%${colors.reset}`
                    : `${colors.red}${totalReturn.toFixed(2)}%${colors.reset}`;

                console.log(
                    `${strategy.padEnd(25)} ` +
                    `${returnStr.padEnd(22)} ` +
                    `${result.metrics.cagr?.toFixed(2) || 'N/A'}% `.padEnd(20) +
                    `${result.metrics.maxDrawdown?.toFixed(2) || 'N/A'}% `.padEnd(20) +
                    `${result.trades.length || 0}`
                );
            }

            // Print benchmarks
            if (strategyResults.length > 0) {
                const firstResult = strategyResults[0].result;
                const qqqReturn = firstResult.metrics.benchmark.totalReturn || 0;
                const tqqqReturn = firstResult.metrics.benchmarkTQQQ.totalReturn || 0;

                console.log('─'.repeat(80));
                console.log(`${'QQQ (benchmark)'.padEnd(25)} ${qqqReturn >= 0 ? colors.green : colors.red}+${qqqReturn.toFixed(2)}%${colors.reset}`);
                console.log(`${'TQQQ (3x leverage)'.padEnd(25)} ${tqqqReturn >= 0 ? colors.green : colors.red}+${tqqqReturn.toFixed(2)}%${colors.reset}`);
            }

            console.log();
        }
        // Regular mode (default strategy, no comparison)
        else {
            // Get the default strategy
            const strategy = StrategyRegistry.get(strategyNames[0]);

            if (ranges.length === 1) {
                // Single timeframe mode
                const config = rangeConfigs[0];
                console.log(`${colors.gray}⚡ Running backtest for ${config.label} with ${strategyNames[0]} strategy...${colors.reset}`);
                const result = await runBacktest(qqqData, tqqqData, sqqqData, capital, config.start, config.end, strategy);
                printBacktestResult(result, config.start, config.end, capital, { mode: 'cli' });
            } else {
                // Multi timeframe mode
                console.log(`${colors.gray}⚡ Running backtests for: ${ranges.join(', ')} with ${strategyNames[0]} strategy...${colors.reset}`);

                const results = await Promise.all(rangeConfigs.map(async (config) => {
                    const result = await runBacktest(qqqData, tqqqData, sqqqData, capital, config.start, config.end, strategy);
                    return { range: config.label, result };
                }));

                printComparisonTable(results, { mode: 'cli' });
            }
        }

    } catch (error) {
        console.error(`\n${colors.red}❌ Error running backtest:${colors.reset}`, error);
        process.exit(1);
    }
}

main();
