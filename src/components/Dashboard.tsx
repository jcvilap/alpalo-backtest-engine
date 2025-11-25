'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { getDateRange, DATE_RANGE_OPTIONS, getNYNow, formatNYDate, DateRangeKey } from '@/lib/utils/dateUtils';
import { Calendar, Play, Activity, AlertTriangle, BarChart2, List, Terminal } from 'lucide-react';
import { BacktestResult } from '@/lib/backtest/backtestEngine';
import PerformanceWidgets from './PerformanceWidgets';
import EquityChart from './EquityChart';
import TradeLogTable from './TradeLogTable';
import MonthlyPerformanceMatrix from './MonthlyPerformanceMatrix';
import { printBacktestResult, CliLine } from '@/lib/utils/resultPrinter';
import CliOutput from './CliOutput';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

function DashboardContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [minDate, setMinDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<BacktestResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'trades' | 'monthly' | 'cli'>('overview');
    const [cliLines, setCliLines] = useState<CliLine[]>([]);
    const [selectedRange, setSelectedRange] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    // Auto-populate dates from cache
    useEffect(() => {
        fetch('/api/data-range')
            .then(res => res.json())
            .then(data => {
                if (data.oldestDate) {
                    setMinDate(data.oldestDate);
                }
                // Set default start date to earliest cached data (March 10, 1999)
                if (!startDate) {
                    setStartDate('1999-03-10');
                }

                // Set default end date if not set
                if (!endDate) {
                    if (data.newestDate) {
                        setEndDate(data.newestDate);
                    } else {
                        setEndDate(formatNYDate(getNYNow()));
                    }
                }
                setIsInitialized(true);
            })
            .catch(() => {
                if (!endDate) setEndDate(formatNYDate(getNYNow()));
                setIsInitialized(true);
            });
    }, []);

    // Helper to parse range parameter
    const parseRangeParam = (rangeParam: string): { type: 'predefined' | 'custom' | 'invalid'; start?: string; end?: string; range?: string } => {
        // Check if it's a predefined range
        if (DATE_RANGE_OPTIONS.includes(rangeParam as DateRangeKey)) {
            return { type: 'predefined', range: rangeParam };
        }

        // Check if it's a custom date range (format: YYYY-MM-DD,YYYY-MM-DD)
        const customDatePattern = /^(\d{4}-\d{2}-\d{2}),(\d{4}-\d{2}-\d{2})$/;
        const match = rangeParam.match(customDatePattern);
        if (match) {
            const [, start, end] = match;
            // Validate dates
            const startDate = new Date(start);
            const endDate = new Date(end);
            if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime()) && startDate <= endDate) {
                return { type: 'custom', start, end };
            }
        }

        return { type: 'invalid' };
    };

    // Helper to check if current dates match any predefined range
    const findMatchingPredefinedRange = (start: string, end: string): DateRangeKey | null => {
        if (!start || !end) return null;

        // Try each predefined range to see if it matches
        for (const range of DATE_RANGE_OPTIONS) {
            const anchor = end ? new Date(end) : undefined;
            const calculated = getDateRange(range, anchor);
            if (calculated.startDate === start && calculated.endDate === end) {
                return range;
            }
        }
        return null;
    };

    // Auto-select predefined range if manual dates match
    useEffect(() => {
        if (!isInitialized || !startDate || !endDate) return;

        // Only check if there's no currently selected range (to avoid overriding user's predefined selection)
        if (!selectedRange) {
            const matchingRange = findMatchingPredefinedRange(startDate, endDate);
            if (matchingRange) {
                setSelectedRange(matchingRange);
                // Update URL to use the predefined range instead of custom dates
                updateUrl(matchingRange);
            }
        }
    }, [startDate, endDate, isInitialized, selectedRange]);


    // Handle Deep Linking
    useEffect(() => {
        if (!isInitialized) return;

        const rangeParam = searchParams.get('range');
        const tabParam = searchParams.get('tab');

        // Handle Range Param
        if (rangeParam) {
            const parsed = parseRangeParam(rangeParam);

            if (parsed.type === 'predefined') {
                // Valid predefined range
                if (parsed.range !== selectedRange) {
                    const anchor = endDate ? new Date(endDate) : undefined;
                    const { startDate: newStart, endDate: newEnd } = getDateRange(parsed.range as DateRangeKey, anchor);

                    setStartDate(newStart);
                    setEndDate(newEnd);
                    setSelectedRange(parsed.range!);

                    if (!result && !loading) {
                        runBacktest(newStart, newEnd, parsed.range);
                    }
                }
            } else if (parsed.type === 'custom') {
                // Valid custom date range
                const customRangeStr = `${parsed.start},${parsed.end}`;
                if (parsed.start !== startDate || parsed.end !== endDate || selectedRange) {
                    setStartDate(parsed.start!);
                    setEndDate(parsed.end!);
                    setSelectedRange(''); // Clear predefined range selection

                    if (!result && !loading) {
                        runBacktest(parsed.start!, parsed.end!, customRangeStr);
                    }
                }
            } else {
                // Invalid range - redirect to base
                router.replace(pathname);
            }
        }

        // Handle Tab Param
        if (tabParam) {
            if (['overview', 'trades', 'monthly', 'cli'].includes(tabParam)) {
                setActiveTab(tabParam as 'overview' | 'trades' | 'monthly' | 'cli');
            }
        }
    }, [isInitialized, searchParams, endDate, loading, pathname, result, router, selectedRange, startDate]);

    // Update URL when state changes
    const updateUrl = (range?: string | null, tab?: string, customStart?: string, customEnd?: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (customStart && customEnd) {
            // Custom date range
            params.set('range', `${customStart},${customEnd}`);
        } else if (range) {
            // Predefined range
            params.set('range', range);
        } else if (range === null) {
            params.delete('range');
        }

        if (tab) {
            params.set('tab', tab);
        }

        // Update URL
        router.push(pathname + '?' + params.toString(), { scroll: false });
    };

    const runBacktest = async (overrideStart?: string, overrideEnd?: string, rangeLabel?: string) => {
        const start = overrideStart || startDate;
        const end = overrideEnd || endDate;

        if (!start || !end) {
            setError('Please select both start and end dates');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Calculate fetch start date (1 year prior for warmup)
            const fetchStartDate = new Date(start);
            fetchStartDate.setFullYear(fetchStartDate.getFullYear() - 1);
            const fetchStartStr = fetchStartDate.toISOString().split('T')[0];

            const res = await fetch('/api/backtest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    from: fetchStartStr,
                    to: end,
                    displayFrom: start
                })
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || 'Backtest failed');
            }

            const data = await res.json();
            setResult(data);

            // Print to console if a predefined range was selected
            if (rangeLabel) {
                setTimeout(() => {
                    const lines = printBacktestResult(data, start, end, 1000000, { mode: 'capture' });
                    setCliLines(lines);
                }, 100);
            } else {
                setCliLines([]);
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setError('Backtest error: ' + message);
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (tab: 'overview' | 'trades' | 'monthly' | 'cli') => {
        setActiveTab(tab);
        updateUrl(undefined, tab);
    };

    const handleRangeSelect = (range: string) => {
        // Always use today as the anchor for predefined ranges
        const { startDate: newStart, endDate: newEnd } = getDateRange(range as DateRangeKey);

        setStartDate(newStart);
        setEndDate(newEnd);
        setSelectedRange(range);
        updateUrl(range);

        if (newStart && newEnd) {
            runBacktest(newStart, newEnd, range);
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
                                    <input
                                        type="date"
                                        value={startDate}
                                        min={minDate}
                                        onChange={(e) => {
                                            const newStart = e.target.value;
                                            setStartDate(newStart);
                                            setSelectedRange(null);
                                            // Update URL with custom date range if both dates are set
                                            if (newStart && endDate) {
                                                updateUrl(undefined, undefined, newStart, endDate);
                                            }
                                        }}
                                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <span className="text-gray-400">→</span>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => {
                                            const newEnd = e.target.value;
                                            setEndDate(newEnd);
                                            setSelectedRange(null);
                                            // Update URL with custom date range if both dates are set
                                            if (startDate && newEnd) {
                                                updateUrl(undefined, undefined, startDate, newEnd);
                                            }
                                        }}
                                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <button
                                    onClick={() => runBacktest()}
                                    disabled={loading}
                                    className={'px-4 py-1.5 text-sm rounded-lg font-semibold transition-all flex items-center gap-2 ' + (loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white')}
                                >
                                    <Play className="w-4 h-4" />
                                    {loading ? 'Running...' : 'Run'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className={'max-w-[1400px] mx-auto px-6 ' + (result ? 'pb-6' : 'p-6')}>
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
                                    <input
                                        type="date"
                                        value={startDate}
                                        min={minDate}
                                        onChange={(e) => {
                                            const newStart = e.target.value;
                                            setStartDate(newStart);
                                            setSelectedRange(null);
                                            // Update URL with custom date range if both dates are set
                                            if (newStart && endDate) {
                                                updateUrl(undefined, undefined, newStart, endDate);
                                            }
                                        }}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => {
                                            const newEnd = e.target.value;
                                            setEndDate(newEnd);
                                            setSelectedRange(null);
                                            // Update URL with custom date range if both dates are set
                                            if (startDate && newEnd) {
                                                updateUrl(undefined, undefined, startDate, newEnd);
                                            }
                                        }}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={() => runBacktest()}
                                    disabled={loading}
                                    className={'w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ' + (loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl')}
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
                <div className={'mb-6 ' + (result ? 'mt-6' : 'mt-4')}>
                    <p className="text-xs text-gray-500 mb-2 font-medium">Quick Select:</p>
                    <div className="flex flex-wrap gap-2">
                        {DATE_RANGE_OPTIONS.map((range) => (
                            <button
                                key={range}
                                onClick={() => handleRangeSelect(range)}
                                disabled={loading}
                                className={'px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors ' + (loading ? 'opacity-50 cursor-not-allowed ' : '') + (selectedRange === range ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400')}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loader - shown when loading and no results yet */}
                {loading && !result && (
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-blue-700 font-semibold text-lg animate-pulse">Running Backtest...</p>
                        </div>
                    </div>
                )}

                {/* Results */}
                {result && (
                    <div className="relative min-h-[400px]">
                        {loading && (
                            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-40 flex items-center justify-center rounded-2xl">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-blue-700 font-medium animate-pulse">Running Backtest...</p>
                                </div>
                            </div>
                        )}
                        <div className="space-y-8">
                            {/* Tabs */}
                            <div className="flex gap-2 border-b border-gray-200 mt-6">
                                <button
                                    onClick={() => handleTabChange('overview')}
                                    className={'px-4 py-2 font-medium flex items-center gap-2 border-b-2 transition-colors ' + (activeTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900')}
                                >
                                    <BarChart2 className="w-4 h-4" />
                                    Overview
                                </button>
                                <button
                                    onClick={() => handleTabChange('trades')}
                                    className={'px-4 py-2 font-medium flex items-center gap-2 border-b-2 transition-colors ' + (activeTab === 'trades' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900')}
                                >
                                    <List className="w-4 h-4" />
                                    Trades
                                </button>
                                <button
                                    onClick={() => handleTabChange('monthly')}
                                    className={'px-4 py-2 font-medium flex items-center gap-2 border-b-2 transition-colors ' + (activeTab === 'monthly' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900')}
                                >
                                    <Calendar className="w-4 h-4" />
                                    Monthly
                                </button>
                                {selectedRange && cliLines.length > 0 && (
                                    <button
                                        onClick={() => handleTabChange('cli')}
                                        className={'px-4 py-2 font-medium flex items-center gap-2 border-b-2 transition-colors ' + (activeTab === 'cli' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-600 hover:text-gray-900')}
                                    >
                                        <Terminal className="w-4 h-4" />
                                        CLI Output
                                    </button>
                                )}
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

                                {/* CLI OUTPUT TAB */}
                                {activeTab === 'cli' && (
                                    <CliOutput lines={cliLines} />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Dashboard() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DashboardContent />
        </Suspense>
    );
}
