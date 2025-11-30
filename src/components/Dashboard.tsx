'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
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
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import LoadingOverlay from '@/components/LoadingOverlay';

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
    const [strategy, setStrategy] = useState<string>('current');
    const [isInitialized, setIsInitialized] = useState(false);
    const resultCache = useRef<Record<string, BacktestResult>>({});

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

        // Only check if there's no currently selected range AND no range in URL
        // This prevents overriding user's explicit range selection
        const currentRangeParam = searchParams.get('range');
        if (!selectedRange && !currentRangeParam) {
            const matchingRange = findMatchingPredefinedRange(startDate, endDate);
            if (matchingRange) {
                setSelectedRange(matchingRange);
                // Update URL to use the predefined range instead of custom dates
                updateUrl(matchingRange);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate, isInitialized, selectedRange]);


    // Handle Deep Linking
    useEffect(() => {
        if (!isInitialized) return;

        const rangeParam = searchParams.get('range');
        const tabParam = searchParams.get('tab');
        const strategyParam = searchParams.get('strategy');

        // Handle Strategy Param
        if (strategyParam && strategyParam !== strategy) {
            setStrategy(strategyParam);
        }

        // Handle Range Param
        if (rangeParam) {
            const parsed = parseRangeParam(rangeParam);

            if (parsed.type === 'predefined') {
                // Valid predefined range
                if (parsed.range !== selectedRange || !result) {
                    const { startDate: newStart, endDate: newEnd } = getDateRange(parsed.range as DateRangeKey);

                    // Only update state and run if dates actually changed or no results yet
                    const datesChanged = newStart !== startDate || newEnd !== endDate;

                    // Prevent double-execution: if loading, we are likely already running the backtest for this range
                    if (datesChanged || (!result && !loading)) {
                        setStartDate(newStart);
                        setEndDate(newEnd);
                        setSelectedRange(parsed.range as DateRangeKey);

                        // Run backtest only if dates changed or no results
                        if (datesChanged || !result) {
                            runBacktest(newStart, newEnd, parsed.range);
                        }
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInitialized, searchParams, endDate, loading, pathname, result, router, selectedRange, startDate, strategy]);

    // Update URL when state changes
    const updateUrl = (range?: string | null, tab?: string, customStart?: string, customEnd?: string, newStrategy?: string) => {
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

        if (newStrategy) {
            params.set('strategy', newStrategy);
        } else if (strategy && !params.has('strategy')) {
            // Ensure current strategy is preserved if not explicitly changed
            params.set('strategy', strategy);
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

        const cacheKey = `${start}:${end}:${strategy}`;
        const cachedResult = resultCache.current[cacheKey];

        if (cachedResult) {
            setError(null);
            setResult(cachedResult);
            setCliLines(rangeLabel ? printBacktestResult(cachedResult, start, end, 1000000, { mode: 'capture' }) : []);
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);
        setCliLines([]); // Clear previous output

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
                    displayFrom: start,
                    strategy: strategy
                })
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || 'Backtest failed');
            }

            const data = await res.json();
            resultCache.current[cacheKey] = data;
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

    const buildRangeHref = (range: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('range', range);
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="min-h-screen bg-background text-text-primary font-display transition-theme">
            <LoadingOverlay isLoading={loading} />

            {/* Sticky Header - shown when results are loaded */}
            {result && (
                <div className="sticky top-0 z-50 bg-surface border-b border-border shadow-md animate-slide-down transition-theme">
                    <div className="max-w-[1400px] mx-auto px-3 sm:px-6 py-2 sm:py-3">
                        {/* Title Row with Theme Toggle */}
                        <div className="flex items-center justify-between gap-2 mb-2 sm:mb-0">
                            <div className="flex items-center gap-2 min-w-0">
                                <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-primary transition-theme flex-shrink-0" />
                                <h1 className="text-base sm:text-xl font-bold text-text-primary transition-theme truncate">Alpalo Backtest Engine</h1>
                            </div>
                            <ThemeToggle />
                        </div>

                        {/* Inputs Row - Full Width on Mobile */}
                        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                            <select
                                value={strategy}
                                onChange={(e) => {
                                    const newStrategy = e.target.value;
                                    setStrategy(newStrategy);
                                    updateUrl(undefined, undefined, undefined, undefined, newStrategy);
                                }}
                                className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-theme text-text-primary sm:min-w-[120px]"
                            >
                                <option value="current">Current</option>
                                <option value="proposed-volatility-protected">Proposed (Vol Protected)</option>
                            </select>
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
                                className="flex-1 sm:flex-none px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-theme text-text-primary sm:min-w-[120px]"
                            />
                            <span className="text-text-tertiary transition-theme hidden sm:inline">→</span>
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
                                className="flex-1 sm:flex-none px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-theme text-text-primary sm:min-w-[120px]"
                            />
                            <button
                                onClick={() => runBacktest()}
                                disabled={loading}
                                className={'flex-shrink-0 px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-lg font-semibold transition-theme flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ' + (loading ? 'bg-gray-300 cursor-not-allowed text-gray-600' : 'bg-primary hover:bg-primary-hover text-white')}
                            >
                                <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                                {loading ? 'Running...' : 'Run'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className={'max-w-[1400px] mx-auto px-6 ' + (result ? 'pb-6' : 'p-6')}>
                {/* Initial Header - hidden when results are loaded */}
                {!result && (
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <Activity className="w-8 h-8 text-primary transition-theme" />
                                <h1 className="text-4xl font-bold text-text-primary transition-theme">Alpalo Backtest Engine</h1>
                            </div>
                            <ThemeToggle />
                        </div>
                        <p className="text-text-secondary text-lg transition-theme">Leveraged ETF Momentum Strategy</p>
                        <div className="relative group inline-block mt-2">
                            <div className="text-xs text-text-tertiary cursor-help flex items-center gap-1 transition-theme">
                                {/* Omitted for brevity - Strategy info tooltip */}
                            </div>
                        </div>
                    </div>
                )}

                {/* Input Panel - hidden when results are loaded */}
                {!result && (
                    <div className="bg-surface rounded-2xl shadow-lg border border-border-light p-6 mb-8 transition-theme">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-text-secondary mb-2 transition-theme">Start Date</label>
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
                                        className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-theme text-text-primary"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-text-secondary mb-2 transition-theme">End Date</label>
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
                                        className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-theme text-text-primary"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={() => runBacktest()}
                                    disabled={loading}
                                    className={'w-full py-3 rounded-xl font-semibold transition-theme flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ' + (loading ? 'bg-gray-300 cursor-not-allowed text-gray-600' : 'bg-primary hover:bg-primary-hover text-white')}
                                >
                                    <Play className="w-5 h-5" />
                                    {loading ? 'Running...' : 'Run Backtest'}
                                </button>
                            </div>
                        </div>

                        {/* Strategy Selector */}
                        <div className="mt-4 pt-4 border-t border-border transition-theme">
                            <label className="block text-sm font-semibold text-text-secondary mb-2 transition-theme">Strategy</label>
                            <div className="relative">
                                <select
                                    value={strategy}
                                    onChange={(e) => {
                                        const newStrategy = e.target.value;
                                        setStrategy(newStrategy);
                                        updateUrl(undefined, undefined, undefined, undefined, newStrategy);
                                    }}
                                    className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-theme text-text-primary appearance-none"
                                >
                                    <option value="current">Current Strategy</option>
                                    <option value="proposed-volatility-protected">Proposed Strategy (Volatility Protected)</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                    <svg className="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="mt-4 p-4 bg-danger-bg border border-danger rounded-xl flex items-start gap-3 transition-theme">
                                <AlertTriangle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5 transition-theme" />
                                <p className="text-danger-text text-sm transition-theme">{error}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Predefined Date Range Buttons - Always Visible */}
                <div className={'mb-6 ' + (result ? 'mt-6' : 'mt-4')}>
                    <p className="text-xs text-text-tertiary mb-2 font-medium transition-theme">Quick Select:</p>
                    <div className="flex flex-wrap gap-2">
                        {DATE_RANGE_OPTIONS.map((range) => {
                            const isSelected = selectedRange === range;
                            const isDisabled = loading || isSelected;
                            const href = buildRangeHref(range);
                            return (
                                <Link
                                    key={range}
                                    href={href}
                                    scroll={false}
                                    prefetch={false}
                                    onClick={(e) => {
                                        if (isDisabled) {
                                            e.preventDefault();
                                        }
                                    }}
                                    aria-disabled={isDisabled}
                                    tabIndex={isDisabled ? -1 : 0}
                                    className={'px-3 py-1.5 text-xs font-medium border rounded-lg transition-theme inline-flex items-center justify-center ' + (isDisabled ? 'cursor-not-allowed ' : '') + (isSelected ? 'bg-primary text-white border-primary opacity-90' : loading ? 'opacity-50 text-text-secondary bg-surface border-border' : 'text-text-primary bg-surface border-border hover:bg-surface-hover hover:border-border-hover')}
                                >
                                    {range}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Loader - shown when loading and no results yet */}


                {/* Results */}
                {
                    result && (
                        <div className="relative min-h-[400px]">

                            <div className="space-y-8">
                                {/* Tabs */}
                                <div className="flex gap-2 border-b border-border mt-6 transition-theme overflow-x-auto scrollbar-hide">
                                    <button
                                        onClick={() => handleTabChange('overview')}
                                        className={'px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2 border-b-2 transition-theme whitespace-nowrap ' + (activeTab === 'overview' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary')}
                                    >
                                        <BarChart2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        Overview
                                    </button>
                                    <button
                                        onClick={() => handleTabChange('trades')}
                                        className={'px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2 border-b-2 transition-theme whitespace-nowrap ' + (activeTab === 'trades' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary')}
                                    >
                                        <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        Trades
                                    </button>
                                    <button
                                        onClick={() => handleTabChange('monthly')}
                                        className={'px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2 border-b-2 transition-theme whitespace-nowrap ' + (activeTab === 'monthly' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary')}
                                    >
                                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        Monthly
                                    </button>
                                    {selectedRange && cliLines.length > 0 && (
                                        <button
                                            onClick={() => handleTabChange('cli')}
                                            className={'px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2 border-b-2 transition-theme whitespace-nowrap ' + (activeTab === 'cli' ? 'border-success text-success' : 'border-transparent text-text-secondary hover:text-text-primary')}
                                        >
                                            <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                            <span className="hidden sm:inline">CLI Output</span>
                                            <span className="sm:hidden">CLI</span>
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
                    )
                }
            </div >
        </div >
    );
}

export default function Dashboard() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DashboardContent />
        </Suspense>
    );
}
