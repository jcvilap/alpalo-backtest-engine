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
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Monthly Performance Matrix</h2>
            <table className="min-w-full text-xs">
                <thead className="bg-gray-50 sticky top-0">
                    <tr>
                        <th className="px-3 py-2 text-center font-bold text-gray-700 cursor-pointer sticky left-0 bg-gray-50 z-10" onClick={() => setSortConfig({ key: 'year', direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' })}>
                            Year {sortConfig.key === 'year' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                        </th>
                        {months.map(month => (
                            <th key={month} className="px-2 py-2 text-center font-bold text-gray-700">{month}</th>
                        ))}
                        <th className="px-3 py-2 text-center font-bold text-gray-700 bg-gray-100 cursor-pointer sticky right-0 z-10" onClick={() => setSortConfig({ key: 'ytdStrat', direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' })}>
                            YTD {sortConfig.key === 'ytdStrat' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedYears.map(year => {
                        const ytd = ytdReturns[year];
                        const ytdStrat = ytd?.strategy || 0;
                        const ytdBen = ytd?.benchmark || 0;
                        const ytdTQQQ = ytd?.benchmarkTQQQ || 0;

                        return (
                            <tr key={year} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="px-3 py-3 text-center font-bold text-gray-900 sticky left-0 bg-white z-10">{year}</td>
                                {months.map((_, monthIdx) => {
                                    const data = monthlyReturns[year][monthIdx];
                                    if (!data) {
                                        return <td key={monthIdx} className="px-2 py-3 text-center text-gray-300">-</td>;
                                    }

                                    const stratColor = data.strategy >= 0 ? 'text-green-600' : 'text-red-600';

                                    return (
                                        <td key={monthIdx} className="px-2 py-3 text-center text-xs">
                                            <div className={`font-bold ${stratColor}`}>{data.strategy.toFixed(1)}%</div>
                                            <div className="flex justify-center gap-1 text-[9px] mt-0.5">
                                                <span className="text-gray-400" title="QQQ">{data.benchmark.toFixed(1)}%</span>
                                                <span className="text-purple-500" title="TQQQ">{data.benchmarkTQQQ.toFixed(1)}%</span>
                                            </div>
                                        </td>
                                    );
                                })}
                                <td className="px-4 py-3 text-center text-sm font-bold bg-gray-50 sticky right-0 z-10">
                                    <div className={ytdStrat >= 0 ? 'text-green-600' : 'text-red-600'}>{ytdStrat.toFixed(1)}%</div>
                                    <div className="flex justify-center gap-2 text-[10px] mt-1">
                                        <span className="text-gray-400" title="QQQ">{ytdBen.toFixed(1)}%</span>
                                        <span className="text-purple-500" title="TQQQ">{ytdTQQQ.toFixed(1)}%</span>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
});

MonthlyPerformanceMatrix.displayName = 'MonthlyPerformanceMatrix';

export default MonthlyPerformanceMatrix;
