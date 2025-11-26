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

    let colorClass = 'text-text-primary';
    if (trend !== 'neutral') {
        if (inverse) {
            colorClass = isPositive ? 'text-danger' : 'text-success';
        } else {
            colorClass = isPositive ? 'text-success' : 'text-danger';
        }
    }

    return (
        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border-light hover:shadow-md transition-theme group relative flex flex-col justify-between h-full">
            <div className="flex items-center gap-2 mb-3">
                <p className="text-sm font-medium text-text-tertiary uppercase tracking-wide transition-theme">{label}</p>
                {tooltip && (
                    <div className="relative group/tooltip">
                        <Info className="w-4 h-4 text-text-tertiary cursor-help hover:text-text-secondary transition-theme" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-text-primary text-background text-xs rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 pointer-events-none leading-relaxed">
                            {tooltip}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--color-text-primary)]" />
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                    <h3 className={`text-3xl font-bold tracking-tight ${colorClass} transition-theme`}>{value}</h3>
                    {trend !== 'neutral' && (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full transition-theme ${isPositive ? 'bg-success-bg text-success-text' : 'bg-danger-bg text-danger-text'}`}>
                            {isPositive ? '↑' : '↓'}
                        </span>
                    )}
                </div>

                {benchmarks && (
                    <div className="space-y-1 pt-2 border-t border-border-light transition-theme">
                        {benchmarks.map((b, i) => (
                            <div key={i} className="flex justify-between text-xs">
                                <span className={`font-medium transition-theme ${b.label === 'QQQ' ? 'text-text-tertiary' : 'text-accent'}`}>{b.label}</span>
                                <span className="text-text-secondary font-mono transition-theme">{b.value}</span>
                            </div>
                        ))}
                    </div>
                )}

                {subValues && (
                    <div className="space-y-1 pt-2 border-t border-border-light transition-theme">
                        {subValues.map((s, i) => (
                            <div key={i} className="flex justify-between text-xs">
                                <span className="text-text-tertiary font-medium transition-theme">{s.label}</span>
                                <span className="text-text-secondary font-mono transition-theme">{s.value}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
