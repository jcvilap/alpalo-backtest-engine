'use client';

import React, { useState, useEffect } from 'react';
import { getDateRange, DATE_RANGE_OPTIONS, DateRangeKey } from '@/lib/utils/dateRanges';
import { Calendar, Play, Activity, AlertTriangle, BarChart2, List } from 'lucide-react';
import { BacktestResult } from '@/lib/backtest/backtestEngine';
import PerformanceWidgets from './PerformanceWidgets';
import EquityChart from './EquityChart';
import TradeLogTable from './TradeLogTable';
import MonthlyPerformanceMatrix from './MonthlyPerformanceMatrix';

export default function Dashboard() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [minDate, setMinDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<BacktestResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'trades' | 'monthly'>('overview');

    // Auto-populate dates from cache
    useEffect(() => {
        fetch('/api/data-range')
            .then(res => res.json())
            .then(data => {
                if (data.oldestDate) {
                    setStartDate(data.oldestDate);
                    setMinDate(data.oldestDate);
                }
                if (data.newestDate) {
                    setEndDate(data.newestDate);
                } else {
                    // Fallback to current date
                    setEndDate(new Date().toISOString().split('T')[0]);
                }
            })
            .catch(() => {
                // Fallback on error
                setEndDate(new Date().toISOString().split('T')[0]);
            });
    }, []);

    const runBacktest = async () => {
        if (!startDate || !endDate) {
            setError('Please select both start and end dates');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/backtest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ from: startDate, to: endDate })
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || 'Backtest failed');
            }

            const data = await res.json();
            setResult(data);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setError(`Backtest error: ${message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Sticky Header - shown when results are loaded */}
            {result && (
                <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-md animate-slide-down">
                    <div className="max-w-[1400px] mx-auto px-6 py-3">
                        <div className="flex items-center justify-between gap-4">
                            {/* Title */}
                            <div className="flex items-center gap-2">
                                <Activity className="w-6 h-6 text-blue-600" />
                                <h1 className="text-xl font-bold text-gray-900">Alpalo Backtest Engine</h1>
                            </div>

                            {/* Condensed Inputs */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <input
                                        type="date"
                                        value={startDate}
                                        min={minDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <span className="text-gray-400">→</span>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <button
                                    onClick={runBacktest}
                                    disabled={loading}
                                    className={`px-4 py-1.5 text-sm rounded-lg font-semibold transition-all flex items-center gap-2 ${loading
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                                        }`}
                                >
                                    <Play className="w-4 h-4" />
                                    {loading ? 'Running...' : 'Run'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className={`max-w-[1400px] mx-auto px-6 ${result ? 'pb-6' : 'p-6'}`}>
                {/* Initial Header - hidden when results are loaded */}
                {!result && (
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <Activity className="w-8 h-8 text-blue-600" />
                            <h1 className="text-4xl font-bold text-gray-900">Alpalo Backtest Engine</h1>
                        </div>
                        <p className="text-gray-600 text-lg">Leveraged ETF Momentum Strategy</p>
                        <div className="relative group inline-block mt-2">
                            <div className="text-xs text-gray-500 cursor-help flex items-center gap-1">
                                {/* Omitted for brevity - Strategy info tooltip */}
                            </div>
                        </div>
                    </div>
                )}

                {/* Input Panel - hidden when results are loaded */}
                {!result && (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="date"
                                        value={startDate}
                                        min={minDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={runBacktest}
                                    disabled={loading}
                                    className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${loading
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
                                        }`}
                                >
                                    <Play className="w-5 h-5" />
                                    {loading ? 'Running...' : 'Run Backtest'}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <p className="text-red-800 text-sm">{error}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Predefined Date Range Buttons - Always Visible */}
                <div className={`mb-6 ${result ? 'mt-20' : 'mt-4'}`}>
                    <p className="text-xs text-gray-500 mb-2 font-medium">Quick Select:</p>
                    <div className="flex flex-wrap gap-2">
                        {DATE_RANGE_OPTIONS.map((range) => (
                            <button
                                key={range}
                                onClick={() => {
                                    const { startDate: newStart, endDate: newEnd } = getDateRange(range, new Date(endDate || new Date()));
                                    setStartDate(newStart);
                                    setEndDate(newEnd);
                                    // Trigger backtest immediately with new dates
                                    // We need to use the new values directly since state update is async
                                    if (newStart && newEnd) {
                                        setLoading(true);
                                        setError(null);
                                        fetch('/api/backtest', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ from: newStart, to: newEnd })
                                        })
                                            .then(async res => {
                                                if (!res.ok) {
                                                    const errorText = await res.text();
                                                    throw new Error(errorText || 'Backtest failed');
                                                }
                                                return res.json();
                                            })
                                            .then(data => setResult(data))
                                            .catch(err => {
                                                const message = err instanceof Error ? err.message : 'Unknown error';
                                                setError(`Backtest error: ${message}`);
                                            })
                                            .finally(() => setLoading(false));
                                    }
                                }}
                                className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results */}
                {result && (
                    <div className="space-y-8">
                        {/* Tabs */}
                        <div className="flex gap-2 border-b border-gray-200 mt-6">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`px-4 py-2 font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'overview'
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <BarChart2 className="w-4 h-4" />
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('trades')}
                                className={`px-4 py-2 font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'trades'
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <List className="w-4 h-4" />
                                Trades
                            </button>
                            <button
                                onClick={() => setActiveTab('monthly')}
                                className={`px-4 py-2 font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'monthly'
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <Calendar className="w-4 h-4" />
                                Monthly
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div>
                            {/* OVERVIEW TAB */}
                            {activeTab === 'overview' && (
                                <div className="space-y-8">
                                    <PerformanceWidgets metrics={result.metrics} />
                                    <EquityChart equityCurve={result.equityCurve} />
                                </div>
                            )}

                            {/* TRADES TAB */}
                            {activeTab === 'trades' && (
                                <TradeLogTable trades={result.trades} />
                            )}

                            {/* MONTHLY PERFORMANCE TAB */}
                            {activeTab === 'monthly' && (
                                <MonthlyPerformanceMatrix equityCurve={result.equityCurve} />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
