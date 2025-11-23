import React from 'react';
import { Info } from 'lucide-react';

interface MetricCardProps {
    label: string;
    value: string | number;
    benchmarks?: { label: string; value: string | number }[];
    subValues?: { label: string; value: string | number }[];
    trend: 'up' | 'down' | 'neutral';
    inverse?: boolean;
    tooltip?: string;
}

export default function MetricCard({
    label,
    value,
    benchmarks,
    subValues,
    trend,
    inverse,
    tooltip
}: MetricCardProps) {
    const isPositive = trend === 'up';

    let colorClass = 'text-gray-900';
    if (trend !== 'neutral') {
        if (inverse) {
            colorClass = isPositive ? 'text-red-600' : 'text-green-600';
        } else {
            colorClass = isPositive ? 'text-green-600' : 'text-red-600';
        }
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group relative flex flex-col justify-between h-full">
            <div className="flex items-center gap-2 mb-3">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{label}</p>
                {tooltip && (
                    <div className="relative group/tooltip">
                        <Info className="w-4 h-4 text-gray-400 cursor-help hover:text-gray-600 transition-colors" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 pointer-events-none leading-relaxed">
                            {tooltip}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                    <h3 className={`text-3xl font-bold tracking-tight ${colorClass}`}>{value}</h3>
                    {trend !== 'neutral' && (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {isPositive ? '↑' : '↓'}
                        </span>
                    )}
                </div>

                {benchmarks && (
                    <div className="space-y-1 pt-2 border-t border-gray-50">
                        {benchmarks.map((b, i) => (
                            <div key={i} className="flex justify-between text-xs">
                                <span className={`font-medium ${b.label === 'QQQ' ? 'text-gray-400' : 'text-purple-500'}`}>{b.label}</span>
                                <span className="text-gray-600 font-mono">{b.value}</span>
                            </div>
                        ))}
                    </div>
                )}

                {subValues && (
                    <div className="space-y-1 pt-2 border-t border-gray-50">
                        {subValues.map((s, i) => (
                            <div key={i} className="flex justify-between text-xs">
                                <span className="text-gray-400 font-medium">{s.label}</span>
                                <span className="text-gray-600 font-mono">{s.value}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
