import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { BacktestResult } from '@/lib/backtest/backtestEngine';

interface EquityChartProps {
    equityCurve: BacktestResult['equityCurve'];
}

const EquityChart = React.memo(({ equityCurve }: EquityChartProps) => {
    // Memoize tooltip formatter to avoid recreating on every render
    const tooltipFormatter = useMemo(() => (val: number) => [`${val.toFixed(2)}%`, ''], []);

    const tooltipLabelFormatter = useMemo(() => (label: string) => {
        const date = new Date(label);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(2)}`;
    }, []);

    const xAxisTickFormatter = useMemo(() => (val: string) => {
        const date = new Date(val);
        return `${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`;
    }, []);

    const yAxisTickFormatter = useMemo(() => (val: number) => `${val.toFixed(0)}%`, []);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Equity Curve
                </h2>
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-600" />
                        <span className="text-gray-600 font-medium">Strategy</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-400" />
                        <span className="text-gray-600 font-medium">QQQ</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        <span className="text-gray-600 font-medium">TQQQ</span>
                    </div>
                </div>
            </div>
            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={equityCurve}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke="#9ca3af"
                            tick={{ fontSize: 12 }}
                            interval="preserveStartEnd"
                            tickFormatter={xAxisTickFormatter}
                        />
                        <YAxis
                            domain={['auto', 'auto']}
                            tick={{ fontSize: 12 }}
                            tickFormatter={yAxisTickFormatter}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            formatter={tooltipFormatter}
                            labelFormatter={tooltipLabelFormatter}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="equity"
                            name="Strategy"
                            stroke="#2563eb"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="benchmark"
                            name="Benchmark (QQQ)"
                            stroke="#9ca3af"
                            strokeWidth={2}
                            dot={false}
                            strokeDasharray="5 5"
                        />
                        <Line
                            type="monotone"
                            dataKey="benchmarkTQQQ"
                            name="Benchmark (TQQQ)"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            dot={false}
                            strokeDasharray="3 3"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
});

EquityChart.displayName = 'EquityChart';

export default EquityChart;
