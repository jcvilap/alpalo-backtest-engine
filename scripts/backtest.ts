#!/usr/bin/env tsx

/**
 * CLI Backtest Tool
 * Run backtests from the command line without opening the browser
 * 
 * Usage:
 *   npm run backtest              # Full 10-year backtest
 *   npm run backtest 1YR          # Last 1 year
 *   npm run backtest 3M,1YR,YTD   # Compare multiple ranges
 *   npm run backtest ALL          # Full history
 */

// Load environment variables BEFORE other imports (PolygonClient initializes Redis at module level)
// Load environment variables BEFORE other imports (PolygonClient initializes Redis at module level)
import 'dotenv/config'; // Loads .env file from project root

import { OHLC } from '../src/lib/types';
import { BacktestResult } from '../src/lib/backtest/backtestEngine';
import { PolygonClient } from '../src/lib/polygon/client';
import { getDateRange, DATE_RANGE_OPTIONS, DateRangeKey, getNYNow, formatNYDate, toNYDate } from '../src/lib/utils/dateUtils';
import { fetchBacktestData } from '../src/lib/backtest/dataFetcher';
import { printBacktestResult } from '../src/lib/utils/resultPrinter';
import { BacktestDataFeed } from '../src/backtest/BacktestDataFeed';
import { BacktestBroker } from '../src/backtest/BacktestBroker';
import { BacktestRunner } from '../src/backtest/BacktestRunner';
import { createDefaultStrategyParams } from '../src/strategy/engine';

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

import { getStrategy, AVAILABLE_STRATEGIES } from '../src/strategy/registry';

async function runBacktests(
    qqqData: OHLC[],
    tqqqData: OHLC[],
    sqqqData: OHLC[],
    capital: number,
    displayFrom: string,
    displayTo: string | undefined,
    strategyNames: string[]
): Promise<{ strategy: string; result: BacktestResult }[]> {
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

    const strategyConfigs = strategyNames.map(name => ({
        name,
        broker: new BacktestBroker(capital),
        params: createDefaultStrategyParams(),
        strategyFunction: getStrategy(name)
    }));

    const runner = new BacktestRunner(
        dataFeed,
        strategyConfigs[0].broker,
        strategyConfigs[0].params,
        strategyConfigs[0].strategyFunction
    );

    const { firstDate, lastDate } = dataFeed.getAvailableDateRange();

    const results = await runner.runMultiple(
        {
            startDate: firstDate,
            endDate: lastDate,
            initialCapital: capital,
            displayFrom
        },
        strategyConfigs
    );

    return strategyNames.map(strategy => ({ strategy, result: results[strategy] }));
}

async function main() {
    console.log(`\n${colors.bright}═══════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}         ALPALO BACKTEST ENGINE - CLI MODE${colors.reset}`);
    console.log(`${colors.bright}═══════════════════════════════════════════════════════════${colors.reset}\n`);

    const args = process.argv.slice(2);
    let capital: number = 1_000_000;
    let ranges: string[] = [];
    let strategies: string[] = ['current'];

    // Parse arguments
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg === '--capital') {
            if (i + 1 < args.length) {
                capital = Number(args[i + 1]);
                i++;
            }
        } else if (arg.startsWith('--timeframes=')) {
            const val = arg.split('=')[1];
            ranges = val.split(',').map(r => r.trim());
        } else if (arg.startsWith('--strategies=')) {
            const val = arg.split('=')[1];
            strategies = val.split(',').map(s => s.trim());
        }
    }

    if (ranges.length === 0) {
        // Default to running all predefined timeframes
        ranges = [...DATE_RANGE_OPTIONS];
    }

    // Validate strategies
    const availableStrategies = Object.keys(AVAILABLE_STRATEGIES);
    const invalidStrategies = strategies.filter(s => !availableStrategies.includes(s));
    if (invalidStrategies.length > 0) {
        console.error(`${colors.red}❌ Invalid strategies: ${invalidStrategies.join(', ')}${colors.reset}`);
        console.error(`Available strategies: ${availableStrategies.join(', ')}`);
        process.exit(1);
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

        // Run backtests for all combinations of strategies and timeframes
        const allResults: { strategy: string; range: string; result: BacktestResult }[] = [];

        if (ranges.length === 1 && strategies.length === 1) {
            const config = rangeConfigs[0];
            console.log(`${colors.gray}⚡ Running backtest for ${config.label}...${colors.reset}`);
            const [{ result }] = await runBacktests(qqqData, tqqqData, sqqqData, capital, config.start, config.end, strategies);
            printBacktestResult(result, config.start, config.end, capital, { mode: 'cli' });
        } else {
            console.log(`${colors.gray}⚡ Running backtests for: ${ranges.join(', ')}...${colors.reset}`);

            for (const config of rangeConfigs) {
                const resultsForRange = await runBacktests(qqqData, tqqqData, sqqqData, capital, config.start, config.end, strategies);
                for (const { strategy, result } of resultsForRange) {
                    allResults.push({ strategy, range: config.label, result });
                }
            }
        }

        if (allResults.length > 0 && (ranges.length > 1 || strategies.length > 1)) {
            console.log(`\n${colors.bright}📊 Strategy Comparison${colors.reset}`);

            // Collect all unique ranges
            const uniqueRanges = Array.from(new Set(allResults.map(r => r.range)));

            // Header
            const header = [
                'Range'.padEnd(10),
                ...strategies.map(s => s.padEnd(25)),
                'QQQ'.padEnd(12),
                'TQQQ'.padEnd(12)
            ].join('  ');

            console.log(`${colors.gray}──────────────────────────────────────────────────────────────────────────────────────────${colors.reset}`);
            console.log(header);
            console.log(`${colors.gray}──────────────────────────────────────────────────────────────────────────────────────────${colors.reset}`);

            for (const range of uniqueRanges) {
                const rowParts: string[] = [range.padEnd(10)];

                // Strategy columns
                for (const strategy of strategies) {
                    const result = allResults.find(r => r.range === range && r.strategy === strategy)?.result;
                    if (result) {
                        const totalReturn = result.metrics.totalReturn.toFixed(2) + '%';
                        const cagr = result.metrics.cagr.toFixed(2) + '%';
                        const cell = `${totalReturn} (${cagr} CAGR)`;

                        // Color based on return
                        const color = result.metrics.totalReturn >= 0 ? colors.green : colors.red;
                        rowParts.push(`${color}${cell.padEnd(25)}${colors.reset}`);
                    } else {
                        rowParts.push('-'.padEnd(25));
                    }
                }

                // Benchmark columns (using the first available result for this range)
                const anyResult = allResults.find(r => r.range === range)?.result;
                if (anyResult) {
                    const qqqReturn = anyResult.metrics.benchmark.totalReturn.toFixed(2) + '%';
                    const qqqColor = anyResult.metrics.benchmark.totalReturn >= 0 ? colors.green : colors.red;
                    rowParts.push(`${qqqColor}${qqqReturn.padEnd(12)}${colors.reset}`);

                    const tqqqReturn = anyResult.metrics.benchmarkTQQQ.totalReturn.toFixed(2) + '%';
                    const tqqqColor = anyResult.metrics.benchmarkTQQQ.totalReturn >= 0 ? colors.green : colors.red;
                    rowParts.push(`${tqqqColor}${tqqqReturn.padEnd(12)}${colors.reset}`);
                } else {
                    rowParts.push('-'.padEnd(12));
                    rowParts.push('-'.padEnd(12));
                }

                console.log(rowParts.join('  '));
            }
            console.log(`${colors.gray}──────────────────────────────────────────────────────────────────────────────────────────${colors.reset}`);
        }

    } catch (error) {
        console.error(`\n${colors.red}❌ Error running backtest:${colors.reset}`, error);
        process.exit(1);
    }
    // Force exit to ensure all resources (like Redis) are closed
    process.exit(0);
}

main();
