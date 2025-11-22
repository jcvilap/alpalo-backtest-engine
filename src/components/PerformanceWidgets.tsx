import React, { useMemo } from 'react';
import { BacktestResult } from '@/lib/backtest/backtestEngine';
import MetricCard from './MetricCard';

interface PerformanceWidgetsProps {
    metrics: BacktestResult['metrics'];
}

const PerformanceWidgets = React.memo(({ metrics }: PerformanceWidgetsProps) => {
    // Memoize benchmark data to avoid recalculation on every render
    const benchmarkData = useMemo(() => ({
        totalReturn: [
            { label: 'QQQ', value: `${metrics.benchmark.totalReturn.toFixed(2)}%` },
            { label: 'TQQQ', value: `${metrics.benchmarkTQQQ.totalReturn.toFixed(2)}%` }
        ],
        cagr: [
            { label: 'QQQ', value: `${metrics.benchmark.cagr.toFixed(2)}%` },
            { label: 'TQQQ', value: `${metrics.benchmarkTQQQ.cagr.toFixed(2)}%` }
        ],
        maxDrawdown: [
            { label: 'QQQ', value: `${metrics.benchmark.maxDrawdown.toFixed(2)}%` },
            { label: 'TQQQ', value: `${metrics.benchmarkTQQQ.maxDrawdown.toFixed(2)}%` }
        ]
    }), [metrics]);

    const avgTradesSubValues = useMemo(() => [
        { label: 'Daily', value: metrics.avgTrades.daily.toFixed(2) },
        { label: 'Monthly', value: metrics.avgTrades.monthly.toFixed(1) },
        { label: 'Annually', value: metrics.avgTrades.annually.toFixed(0) }
    ], [metrics.avgTrades]);

    const winRateSubValues = useMemo(() => [
        { label: 'Wins', value: metrics.winRate.wins.toString() },
        { label: 'Losses', value: metrics.winRate.losses.toString() }
    ], [metrics.winRate]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <MetricCard
                label="Total Return"
                value={`${metrics.totalReturn.toFixed(2)}%`}
                benchmarks={benchmarkData.totalReturn}
                trend={metrics.totalReturn >= 0 ? 'up' : 'down'}
            />
            <MetricCard
                label="CAGR"
                value={`${metrics.cagr.toFixed(2)}%`}
                benchmarks={benchmarkData.cagr}
                trend={metrics.cagr >= 0 ? 'up' : 'down'}
                tooltip="Compound Annual Growth Rate: The mean annual growth rate of an investment over a specified time period longer than one year."
            />
            <MetricCard
                label="Max Drawdown"
                value={`${metrics.maxDrawdown.toFixed(2)}%`}
                benchmarks={benchmarkData.maxDrawdown}
                trend="down"
                inverse
                tooltip="The maximum observed loss from a peak to a trough of a portfolio, before a new peak is attained."
            />
            <MetricCard
                label="Avg Trades"
                value={metrics.avgTrades.monthly.toFixed(1)}
                subValues={avgTradesSubValues}
                trend="neutral"
                tooltip="Average number of trades executed over different timeframes."
            />
            <MetricCard
                label="Win Rate"
                value={`${metrics.winRate.winPct.toFixed(1)}%`}
                subValues={winRateSubValues}
                trend={metrics.winRate.winPct >= 50 ? 'up' : 'down'}
                tooltip="Percentage of winning trades out of total trades."
            />
            <MetricCard
                label="Avg Position Size"
                value={`${metrics.avgPositionSize.toFixed(1)}%`}
                trend="neutral"
                tooltip="Average percentage of portfolio allocated to each trade."
            />
        </div>
    );
});

PerformanceWidgets.displayName = 'PerformanceWidgets';

export default PerformanceWidgets;
