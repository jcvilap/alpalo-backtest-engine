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

import dotenv from 'dotenv';
import { BacktestEngine, BacktestResult } from '../src/lib/backtest/backtestEngine';
import { PolygonClient } from '../src/lib/polygon/client';
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

async function runBacktest(
    qqqData: any[],
    tqqqData: any[],
    sqqqData: any[],
    capital: number,
    displayFrom: string
): Promise<BacktestResult> {
    const engine = new BacktestEngine(capital);
    return engine.run(qqqData, tqqqData, sqqqData, displayFrom);
}

function printSingleResult(result: BacktestResult, displayFrom: string, endDate: string, capital: number) {
    console.log(`${colors.gray}Date Range: ${displayFrom} → ${endDate}${colors.reset}`);
    console.log(`${colors.gray}Capital:    $${capital.toLocaleString()}${colors.reset}\n`);

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
}

function printComparisonTable(results: { range: string; result: BacktestResult }[]) {
    console.log(`\n${colors.bright}${colors.blue}PERFORMANCE COMPARISON${colors.reset}`);
    console.log(`${colors.bright}──────────────────────────────────────────────────────────────────────────────────────────${colors.reset}`);

    // Header
    const headers = ['Metric', ...results.map(r => r.range)];
    const colWidth = 12;
    const labelWidth = 20;

    const headerRow = headers.map((h, i) => {
        if (i === 0) return h.padEnd(labelWidth);
        return h.padEnd(colWidth);
    }).join('');

    console.log(`${colors.cyan}${headerRow}${colors.reset}`);
    console.log(`${colors.bright}──────────────────────────────────────────────────────────────────────────────────────────${colors.reset}`);

    const rows = [
        { label: 'Total Return', getValue: (r: BacktestResult) => formatPercent(r.metrics.totalReturn) },
        { label: 'CAGR', getValue: (r: BacktestResult) => formatPercent(r.metrics.cagr) },
        { label: 'Max Drawdown', getValue: (r: BacktestResult) => formatPercent(r.metrics.maxDrawdown) },
        { label: 'Win Rate', getValue: (r: BacktestResult) => formatPercent(r.metrics.winRate.winPct) },
        { label: 'Sharpe Ratio', getValue: (r: BacktestResult) => formatNumber(r.metrics.sharpeRatio) },
        { label: 'Trades', getValue: (r: BacktestResult) => r.trades.length.toString() },
    ];

    rows.forEach(row => {
        let line = row.label.padEnd(labelWidth);
        results.forEach(({ result }) => {
            line += row.getValue(result).padEnd(colWidth + 10); // +10 for ANSI codes length
        });
        console.log(line);
    });

    console.log(`${colors.bright}──────────────────────────────────────────────────────────────────────────────────────────${colors.reset}`);

    // Benchmark Comparison (Total Return)
    console.log(`\n${colors.bright}${colors.blue}BENCHMARK COMPARISON (Total Return)${colors.reset}`);
    console.log(`${colors.bright}──────────────────────────────────────────────────────────────────────────────────────────${colors.reset}`);

    const benHeaders = ['Range', 'Strategy', 'QQQ', 'TQQQ'];
    const benHeaderRow = benHeaders.map((h, i) => h.padEnd(i === 0 ? labelWidth : colWidth)).join('');
    console.log(`${colors.cyan}${benHeaderRow}${colors.reset}`);
    console.log(`${colors.bright}──────────────────────────────────────────────────────────────────────────────────────────${colors.reset}`);

    results.forEach(({ range, result }) => {
        let line = range.padEnd(labelWidth);
        line += formatPercent(result.metrics.totalReturn).padEnd(colWidth + 10);
        line += formatPercent(result.metrics.benchmark.totalReturn).padEnd(colWidth + 10);
        line += formatPercent(result.metrics.benchmarkTQQQ.totalReturn).padEnd(colWidth + 10);
        console.log(line);
    });
    console.log(`${colors.bright}──────────────────────────────────────────────────────────────────────────────────────────${colors.reset}\n`);
}

async function main() {
    console.log(`\n${colors.bright}═══════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}         ALPALO BACKTEST ENGINE - CLI MODE${colors.reset}`);
    console.log(`${colors.bright}═══════════════════════════════════════════════════════════${colors.reset}\n`);

    const args = process.argv.slice(2);
    let capital: number = 1_000_000;
    let ranges: string[] = [];

    // Parse arguments
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg === '--capital') {
            if (i + 1 < args.length) {
                capital = Number(args[i + 1]);
                i++;
            }
        } else if (!arg.startsWith('--')) {
            // Handle comma-separated list
            if (arg.includes(',')) {
                ranges = arg.split(',').map(r => r.trim());
            } else {
                ranges.push(arg);
            }
        }
    }

    if (ranges.length === 0) {
        ranges = ['10YR']; // Default
    }

    // 1. Determine Fetch Range (widest possible)
    let minDate = new Date().toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];

    const rangeConfigs = ranges.map(r => {
        let start: string;
        let end: string = today;

        if (DATE_RANGE_OPTIONS.includes(r as DateRangeKey)) {
            const range = getDateRange(r as DateRangeKey);
            start = range.startDate;
            end = range.endDate;
        } else {
            // Assume custom date or just start date
            start = r;
        }

        if (start < minDate) minDate = start;
        return { label: r, start, end };
    });

    // Fetch start date (1 year prior for warmup)
    const fetchStartDate = new Date(minDate);
    fetchStartDate.setFullYear(fetchStartDate.getFullYear() - 1);
    const fetchStartStr = fetchStartDate.toISOString().split('T')[0];

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

        if (ranges.length === 1) {
            // Single Mode
            const config = rangeConfigs[0];
            console.log(`${colors.gray}⚡ Running backtest for ${config.label}...${colors.reset}`);
            const result = await runBacktest(qqqData, tqqqData, sqqqData, capital, config.start);
            printSingleResult(result, config.start, config.end, capital);
        } else {
            // Multi Mode
            console.log(`${colors.gray}⚡ Running backtests for: ${ranges.join(', ')}...${colors.reset}`);

            const results = [];
            for (const config of rangeConfigs) {
                const result = await runBacktest(qqqData, tqqqData, sqqqData, capital, config.start);
                results.push({ range: config.label, result });
            }

            printComparisonTable(results);
        }

    } catch (error) {
        console.error(`\n${colors.red}❌ Error running backtest:${colors.reset}`, error);
        process.exit(1);
    }
}

main();
