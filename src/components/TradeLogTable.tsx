import React, { useCallback } from 'react';
import { Trade } from '@/lib/backtest/backtestEngine';

interface TradeLogTableProps {
    trades: Trade[];
}

const TradeLogTable = React.memo(({ trades }: TradeLogTableProps) => {
    // Memoize date formatter
    const formatDate = useCallback((dateStr: string) => {
        const d = new Date(dateStr);
        return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear().toString().slice(2)}`;
    }, []);

    return (
        <div className="bg-surface rounded-2xl shadow-sm border border-border-light overflow-hidden transition-theme">
            <div className="p-6 border-b border-border-light transition-theme">
                <h2 className="text-lg font-bold text-text-primary transition-theme">Trade Log</h2>
            </div>
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                <table className="min-w-full divide-y divide-border relative">
                    <thead className="bg-surface-elevated sticky top-0 z-10 shadow-sm transition-theme">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider transition-theme">Entry Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider transition-theme">Exit Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider transition-theme">Symbol</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-text-tertiary uppercase tracking-wider transition-theme">Position %</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-text-tertiary uppercase tracking-wider transition-theme">Days</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-text-tertiary uppercase tracking-wider transition-theme">Trade Return %</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-text-tertiary uppercase tracking-wider transition-theme">Portfolio Return %</th>
                        </tr>
                    </thead>
                    <tbody className="bg-surface divide-y divide-border transition-theme">
                        {trades.map((trade, idx) => (
                            <tr key={idx} className="hover:bg-surface-elevated transition-theme">
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-text-primary transition-theme">{formatDate(trade.entryDate)}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-text-primary transition-theme">{trade.exitDate ? formatDate(trade.exitDate) : '-'}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-surface-elevated text-text-primary transition-theme">
                                        {trade.symbol}
                                    </span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-text-primary transition-theme">
                                    {trade.positionSizePct ? `${trade.positionSizePct.toFixed(1)}%` : '-'}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-text-primary transition-theme">{trade.daysHeld || '-'}</td>
                                <td className={`px-4 py-3 whitespace-nowrap text-sm text-right font-medium transition-theme ${(trade.returnPct || 0) >= 0 ? 'text-success' : 'text-danger'}`}>
                                    {trade.returnPct ? `${trade.returnPct.toFixed(2)}%` : '-'}
                                </td>
                                <td className={`px-4 py-3 whitespace-nowrap text-sm text-right font-medium transition-theme ${(trade.portfolioReturnPct || 0) >= 0 ? 'text-success' : 'text-danger'}`}>
                                    {trade.portfolioReturnPct ? `${trade.portfolioReturnPct.toFixed(2)}%` : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

TradeLogTable.displayName = 'TradeLogTable';

export default TradeLogTable;
