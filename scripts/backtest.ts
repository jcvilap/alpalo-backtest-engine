import { BacktestEngine } from '../src/lib/backtest/backtestEngine';
import { PolygonClient } from '../src/lib/polygon/client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

type CliOptions = {
    from?: string;
    to?: string;
    capital?: number;
};

type CacheRange = {
    start?: string;
    end?: string;
};

function getCacheRange(ticker: string): CacheRange {
    const cachePath = path.join(process.cwd(), 'cache', `${ticker}.json`);
    if (!fs.existsSync(cachePath)) {
        return {};
    }

    try {
        const data = JSON.parse(fs.readFileSync(cachePath, 'utf-8')) as { date: string }[];
        if (data.length === 0) {
            return {};
        }

        return {
            start: data[0].date,
            end: data[data.length - 1].date
        };
    } catch (error) {
        console.warn(`Unable to read cache for ${ticker}:`, error);
        return {};
    }
}

function parseArgs(): CliOptions {
    const args = process.argv.slice(2);
    const options: CliOptions = {};

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg === '--from' && args[i + 1]) {
            options.from = args[i + 1];
            i++;
        } else if (arg === '--to' && args[i + 1]) {
            options.to = args[i + 1];
            i++;
        } else if (arg === '--capital' && args[i + 1]) {
            options.capital = Number(args[i + 1]);
            i++;
        }
    }

    return options;
}

async function main() {
    const cacheRange = getCacheRange('TQQQ');
    const defaultFrom = cacheRange.start ?? '2015-11-25';
    const defaultTo = cacheRange.end ?? new Date().toISOString().slice(0, 10);

    const { from = defaultFrom, to = defaultTo, capital = 1_000_000 } = parseArgs();

    console.log(`Running CLI backtest from ${from} to ${to} with $${capital.toLocaleString()} starting capital...`);
    const client = new PolygonClient();

    const [tqqq, sqqq, qqq] = await Promise.all([
        client.fetchAggregates('TQQQ', from, to),
        client.fetchAggregates('SQQQ', from, to),
        client.fetchAggregates('QQQ', from, to)
    ]);

    const engine = new BacktestEngine(capital);
    const result = engine.run(qqq, tqqq, sqqq);

    const metrics = result.metrics;

    console.log('\n===== Strategy Performance =====');
    console.log(`Total Return: ${metrics.totalReturn.toFixed(2)}%`);
    console.log(`CAGR: ${metrics.cagr.toFixed(2)}%`);
    console.log(`Max Drawdown: ${metrics.maxDrawdown.toFixed(2)}%`);
    console.log(`Avg Position Size: ${metrics.avgPositionSize.toFixed(2)}%`);
    console.log(`Win Rate: ${metrics.winRate.winPct.toFixed(2)}% (${metrics.winRate.wins} wins / ${metrics.winRate.losses} losses)`);

    console.log('\n===== Benchmark (QQQ) =====');
    console.log(`Total Return: ${metrics.benchmark.totalReturn.toFixed(2)}% | CAGR: ${metrics.benchmark.cagr.toFixed(2)}% | Max DD: ${metrics.benchmark.maxDrawdown.toFixed(2)}%`);

    console.log('\n===== Benchmark (TQQQ) =====');
    console.log(`Total Return: ${metrics.benchmarkTQQQ.totalReturn.toFixed(2)}% | CAGR: ${metrics.benchmarkTQQQ.cagr.toFixed(2)}% | Max DD: ${metrics.benchmarkTQQQ.maxDrawdown.toFixed(2)}%`);

    console.log(`\nTrades executed: ${result.trades.length}`);
}

main().catch(error => {
    console.error('Backtest failed:', error);
    process.exit(1);
});
