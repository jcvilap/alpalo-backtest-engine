#!/usr/bin/env tsx

/**
 * CLI Backtest Tool
 * Run backtests from the command line without opening the browser
 * 
 * Usage:
 *   npm run backtest              # Full 10-year backtest
 *   npm run backtest 1YR          # Last 1 year
 *   npm run backtest YTD          # Year to date
 *   npm run backtest 2024-01-01   # Custom start date to today
 *   npm run backtest 2024-01-01 2024-12-31  # Custom date range
 */

import dotenv from 'dotenv';
import { BacktestEngine } from '../src/lib/backtest/backtestEngine';
import { PolygonClient } from '../src/lib/polygon/client';
import { StrategyController } from '../src/lib/strategy/strategyController';
import { getDateRange, DATE_RANGE_OPTIONS, DateRangeKey } from '../src/lib/utils/dateRanges';
import { fetchBacktestData } from '../src/lib/backtest/dataFetcher';

// Load .env.local file
dotenv.config({ path: '.env.local' });

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

function formatPercent(value: number, decimals: number = 2): string {
    const color = value >= 0 ? colors.green : colors.red;
    const sign = value >= 0 ? '+' : '';
    return `${color}${sign}${value.toFixed(decimals)}%${colors.reset}`;
}

function formatNumber(value: number, decimals: number = 2): string {
    return value.toFixed(decimals);
}

async function runBacktest(startDate: string, endDate: string, capital: number, displayFrom: string) {
    console.log(`\n${colors.bright}═══════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}         ALPALO BACKTEST ENGINE - CONSOLE MODE${colors.reset}`);
    console.log(`${colors.bright}═══════════════════════════════════════════════════════════${colors.reset}\n`);

    console.log(`${colors.gray}Date Range: ${displayFrom} → ${endDate}${colors.reset}`);
    console.log(`${colors.gray}Capital:    $${capital.toLocaleString()}${colors.reset}\n`);

    try {
        // Initialize Polygon client
        const polygonClient = new PolygonClient();

        console.log(`${colors.blue}📊 Fetching historical data (including warmup)...${colors.reset}`);

        // Fetch data using shared utility
        const { qqqData, tqqqData, sqqqData } = await fetchBacktestData(polygonClient, startDate, endDate);

        if (tqqqData.length === 0) {
            console.error(`${colors.red}❌ No data available for TQQQ${colors.reset}`);
            return;
        }

        console.log(`${colors.green}✓ Loaded ${qqqData.length} trading days${colors.reset}\n`);

        // Run backtest
        console.log(`${colors.gray}⚡ Running backtest...${colors.reset}`);

        const engine = new BacktestEngine(capital);
        const result = engine.run(qqqData, tqqqData, sqqqData, displayFrom);

        console.log(`${colors.green}✓ Backtest complete${colors.reset}\n`);

        // Display results
        console.log(`${colors.bright}${colors.blue}PERFORMANCE METRICS${colors.reset}`);
        console.log(`${colors.bright}───────────────────────────────────────────────────────────${colors.reset}\n`);

        const metrics = [
            ['Total Return', formatPercent(result.metrics.totalReturn)],
            ['CAGR', formatPercent(result.metrics.cagr)],
            ['Max Drawdown', formatPercent(result.metrics.maxDrawdown)],
            ['Win Rate', formatPercent(result.metrics.winRate.winPct)],
            ['Avg Position Size', formatPercent(result.metrics.avgPositionSize)],
            ['Sharpe Ratio', formatNumber(result.metrics.sharpeRatio)],
            ['Total Trades', result.trades.length.toString()],
        ];

        // Calculate column width
        const labelWidth = Math.max(...metrics.map(([label]) => label.length)) + 2;

        metrics.forEach(([label, value]) => {
            const paddedLabel = label.padEnd(labelWidth);
            console.log(`  ${colors.cyan}${paddedLabel}${colors.reset} ${value}`);
        });

        // Benchmarks comparison
        console.log(`\n${colors.bright}${colors.blue}BENCHMARK COMPARISON${colors.reset}`);
        console.log(`${colors.bright}───────────────────────────────────────────────────────────${colors.reset}\n`);

        const benchmarks = [
            ['Strategy', formatPercent(result.metrics.totalReturn)],
            ['QQQ (Nasdaq-100)', formatPercent(result.metrics.benchmark.totalReturn)],
            ['TQQQ (3x Leveraged)', formatPercent(result.metrics.benchmarkTQQQ.totalReturn)],
        ];

        benchmarks.forEach(([label, value]) => {
            const paddedLabel = label.padEnd(labelWidth + 5);
            console.log(`  ${colors.cyan}${paddedLabel}${colors.reset} ${value}`);
        });

        // Trade summary
        const wins = result.metrics.winRate.wins;
        const losses = result.metrics.winRate.losses;

        console.log(`\n${colors.bright}${colors.blue}TRADE SUMMARY${colors.reset}`);
        console.log(`${colors.bright}───────────────────────────────────────────────────────────${colors.reset}\n`);
        console.log(`  ${colors.cyan}Total Trades:${colors.reset}    ${result.trades.length}`);
        console.log(`  ${colors.green}Wins:${colors.reset}            ${wins}`);
        console.log(`  ${colors.red}Losses:${colors.reset}          ${losses}`);
        console.log(`  ${colors.cyan}Win Rate:${colors.reset}        ${formatPercent(result.metrics.winRate.winPct)}`);

        console.log(`\n${colors.bright}═══════════════════════════════════════════════════════════${colors.reset}\n`);

    } catch (error) {
        console.error(`\n${colors.red}❌ Error running backtest:${colors.reset}`, error);
        process.exit(1);
    }
}

// Parse command line arguments
async function main() {
    const args = process.argv.slice(2);
    let startDate: string;
    let endDate: string;
    let capital: number = 1_000_000; // Default capital

    // Parse arguments manually to separate flags from positional args
    const positionalArgs: string[] = [];

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg === '--capital') {
            if (i + 1 < args.length) {
                capital = Number(args[i + 1]);
                i++; // Skip next arg as it's the value
            }
        } else if (!arg.startsWith('--')) {
            positionalArgs.push(arg);
        }
    }

    if (positionalArgs.length === 0) {
        // Default: Full 10-year backtest
        const range = getDateRange('10YR');
        startDate = range.startDate;
        endDate = range.endDate;
    } else if (positionalArgs.length === 1) {
        const arg = positionalArgs[0];

        // Check if it's a predefined range
        if (DATE_RANGE_OPTIONS.includes(arg as DateRangeKey)) {
            const range = getDateRange(arg as DateRangeKey);
            startDate = range.startDate;
            endDate = range.endDate;
        } else {
            // Assume it's a start date, end date is today
            startDate = arg;
            endDate = new Date().toISOString().split('T')[0];
        }
    } else {
        // Both start and end dates provided
        startDate = positionalArgs[0];
        endDate = positionalArgs[1];
    }

    // Calculate fetch start date (1 year prior for warmup)
    const fetchStartDate = new Date(startDate);
    fetchStartDate.setFullYear(fetchStartDate.getFullYear() - 1);
    const fetchStartStr = fetchStartDate.toISOString().split('T')[0];

    await runBacktest(fetchStartStr, endDate, capital, startDate);
}

main();
