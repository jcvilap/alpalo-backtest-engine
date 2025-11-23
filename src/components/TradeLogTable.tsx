import React, { useMemo, useCallback } from 'react';
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Trade Log</h2>
            </div>
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200 relative">
                    <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exit Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Position %</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Trade Return %</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Portfolio Return %</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {trades.map((trade, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{formatDate(trade.entryDate)}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{trade.exitDate ? formatDate(trade.exitDate) : '-'}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                        {trade.symbol}
                                    </span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">
                                    {trade.positionSizePct ? `${trade.positionSizePct.toFixed(1)}%` : '-'}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{trade.daysHeld || '-'}</td>
                                <td className={`px-4 py-3 whitespace-nowrap text-sm text-right font-medium ${(trade.returnPct || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {trade.returnPct ? `${trade.returnPct.toFixed(2)}%` : '-'}
                                </td>
                                <td className={`px-4 py-3 whitespace-nowrap text-sm text-right font-medium ${(trade.portfolioReturnPct || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
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
