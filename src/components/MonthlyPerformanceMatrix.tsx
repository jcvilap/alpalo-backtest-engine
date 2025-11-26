import React, { useState, useMemo } from 'react';

interface MonthlyPerformanceMatrixProps {
    equityCurve: { date: string; equity: number; benchmark: number; benchmarkTQQQ: number }[];
}

const MonthlyPerformanceMatrix = React.memo(({ equityCurve }: MonthlyPerformanceMatrixProps) => {
    const [sortConfig, setSortConfig] = useState<{ key: 'year' | 'ytdStrat' | 'ytdBen' | 'ytdTQQQ'; direction: 'asc' | 'desc' }>({ key: 'year', direction: 'desc' });

    const months = useMemo(() => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], []);

    // Memoize monthly returns calculation
    const { monthlyReturns, ytdReturns, years } = useMemo(() => {
        const monthlyReturns: Record<string, Record<string, { strategy: number, benchmark: number, benchmarkTQQQ: number }>> = {};
        const years = Array.from(new Set(equityCurve.map(d => new Date(d.date).getFullYear())));

        // Build the matrix
        years.forEach(year => {
            monthlyReturns[year] = {};
            months.forEach((_, monthIdx) => {
                const monthData = equityCurve.filter(d => {
                    const date = new Date(d.date);
                    return date.getFullYear() === year && date.getMonth() === monthIdx;
                });

                if (monthData.length > 0) {
                    const start = monthData[0];
                    const end = monthData[monthData.length - 1];

                    const startEq = 100 * (1 + start.equity / 100);
                    const endEq = 100 * (1 + end.equity / 100);
                    const stratRet = ((endEq - startEq) / startEq) * 100;

                    const startBen = 100 * (1 + start.benchmark / 100);
                    const endBen = 100 * (1 + end.benchmark / 100);
                    const benRet = ((endBen - startBen) / startBen) * 100;

                    const startTQQQ = 100 * (1 + start.benchmarkTQQQ / 100);
                    const endTQQQ = 100 * (1 + end.benchmarkTQQQ / 100);
                    const tqqqRet = ((endTQQQ - startTQQQ) / startTQQQ) * 100;

                    monthlyReturns[year][monthIdx] = {
                        strategy: stratRet,
                        benchmark: benRet,
                        benchmarkTQQQ: tqqqRet
                    };
                }
            });
        });

        // Calculate YTD returns
        const ytdReturns: Record<string, { strategy: number, benchmark: number, benchmarkTQQQ: number }> = {};
        years.forEach(year => {
            const yearlyMonths = Object.keys(monthlyReturns[year]).map(Number);
            if (yearlyMonths.length > 0) {
                const firstMonth = Math.min(...yearlyMonths);
                const lastMonth = Math.max(...yearlyMonths);

                const firstData = equityCurve.find(d => {
                    const date = new Date(d.date);
                    return date.getFullYear() === year && date.getMonth() === firstMonth;
                });

                const lastData = equityCurve.filter(d => {
                    const date = new Date(d.date);
                    return date.getFullYear() === year && date.getMonth() === lastMonth;
                }).pop();

                if (firstData && lastData) {
                    const startEq = 100 * (1 + firstData.equity / 100);
                    const endEq = 100 * (1 + lastData.equity / 100);
                    const stratRet = ((endEq - startEq) / startEq) * 100;

                    const startBen = 100 * (1 + firstData.benchmark / 100);
                    const endBen = 100 * (1 + lastData.benchmark / 100);
                    const benRet = ((endBen - startBen) / startBen) * 100;

                    const startTQQQ = 100 * (1 + firstData.benchmarkTQQQ / 100);
                    const endTQQQ = 100 * (1 + lastData.benchmarkTQQQ / 100);
                    const tqqqRet = ((endTQQQ - startTQQQ) / startTQQQ) * 100;

                    ytdReturns[year] = { strategy: stratRet, benchmark: benRet, benchmarkTQQQ: tqqqRet };
                }
            }
        });

        return { monthlyReturns, ytdReturns, years };
    }, [equityCurve, months]);

    // Memoize sorted years
    const sortedYears = useMemo(() => {
        const sorted = [...years];
        sorted.sort((a, b) => {
            if (sortConfig.key === 'year') {
                return sortConfig.direction === 'asc' ? a - b : b - a;
            } else {
                // Map ytd keys to data keys
                const keyMap: Record<string, 'strategy' | 'benchmark' | 'benchmarkTQQQ'> = {
                    'ytdStrat': 'strategy',
                    'ytdBen': 'benchmark',
                    'ytdTQQQ': 'benchmarkTQQQ'
                };
                const dataKey = keyMap[sortConfig.key];
                const aVal = ytdReturns[a]?.[dataKey] || 0;
                const bVal = ytdReturns[b]?.[dataKey] || 0;
                return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
            }
        });
        return sorted;
    }, [years, sortConfig, ytdReturns]);

    return (
        <div className="bg-surface rounded-2xl shadow-sm border border-border-light overflow-hidden transition-theme">
            <div className="p-6 border-b border-border-light transition-theme">
                <h2 className="text-lg font-bold text-text-primary transition-theme">Monthly Performance Matrix</h2>
            </div>
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                <table className="min-w-full divide-y divide-border relative">
                    <thead className="bg-surface-elevated sticky top-0 z-20 shadow-sm transition-theme">
                        <tr>
                            <th className="px-4 py-3 text-center text-xs font-medium text-text-tertiary uppercase tracking-wider cursor-pointer sticky left-0 bg-surface-elevated z-30 border-r border-border transition-theme" onClick={() => setSortConfig({ key: 'year', direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' })}>
                                <div className="flex items-center justify-center gap-1">
                                    Year {sortConfig.key === 'year' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                </div>
                            </th>
                            {months.map(month => (
                                <th key={month} className="px-2 py-3 text-center text-xs font-medium text-text-tertiary uppercase tracking-wider transition-theme">{month}</th>
                            ))}
                            <th className="px-4 py-3 text-center text-xs font-medium text-text-tertiary uppercase tracking-wider cursor-pointer sticky right-0 bg-surface-elevated z-30 border-l border-border transition-theme" onClick={() => setSortConfig({ key: 'ytdStrat', direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' })}>
                                <div className="flex items-center justify-center gap-1">
                                    YTD {sortConfig.key === 'ytdStrat' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-surface divide-y divide-border transition-theme">
                        {sortedYears.map(year => {
                            const ytd = ytdReturns[year];
                            const ytdStrat = ytd?.strategy || 0;
                            const ytdBen = ytd?.benchmark || 0;
                            const ytdTQQQ = ytd?.benchmarkTQQQ || 0;

                            return (
                                <tr key={year} className="hover:bg-surface-elevated transition-theme">
                                    <td className="px-4 py-4 text-center text-sm font-bold text-text-primary sticky left-0 bg-surface z-10 border-r border-border-light shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] transition-theme">{year}</td>
                                    {months.map((_, monthIdx) => {
                                        const data = monthlyReturns[year][monthIdx];
                                        if (!data) {
                                            return <td key={monthIdx} className="px-2 py-4 text-center text-text-tertiary text-xs transition-theme">-</td>;
                                        }

                                        const stratColor = data.strategy >= 0 ? 'text-success' : 'text-danger';

                                        return (
                                            <td key={monthIdx} className="px-2 py-4 text-center">
                                                <div className={`text-sm font-bold ${stratColor} transition-theme`}>{data.strategy.toFixed(1)}%</div>
                                                <div className="flex justify-center gap-1.5 text-[10px] mt-1 font-medium">
                                                    <span className="text-text-tertiary transition-theme" title="QQQ">{data.benchmark.toFixed(1)}%</span>
                                                    <span className="text-accent transition-theme" title="TQQQ">{data.benchmarkTQQQ.toFixed(1)}%</span>
                                                </div>
                                            </td>
                                        );
                                    })}
                                    <td className="px-4 py-4 text-center bg-surface-elevated sticky right-0 z-10 border-l border-border shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.05)] transition-theme">
                                        <div className={`text-sm font-bold ${ytdStrat >= 0 ? 'text-success' : 'text-danger'} transition-theme`}>{ytdStrat.toFixed(1)}%</div>
                                        <div className="flex justify-center gap-2 text-[10px] mt-1 font-medium">
                                            <span className="text-text-tertiary transition-theme" title="QQQ">{ytdBen.toFixed(1)}%</span>
                                            <span className="text-accent transition-theme" title="TQQQ">{ytdTQQQ.toFixed(1)}%</span>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

MonthlyPerformanceMatrix.displayName = 'MonthlyPerformanceMatrix';

export default MonthlyPerformanceMatrix;
