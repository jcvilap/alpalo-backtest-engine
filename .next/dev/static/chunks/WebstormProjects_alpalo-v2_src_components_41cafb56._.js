(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MetricCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
;
;
function MetricCard({ label, value, benchmarks, subValues, trend, inverse, tooltip }) {
    const isPositive = trend === 'up';
    let colorClass = 'text-gray-900';
    if (trend !== 'neutral') {
        if (inverse) {
            colorClass = isPositive ? 'text-red-600' : 'text-green-600';
        } else {
            colorClass = isPositive ? 'text-green-600' : 'text-red-600';
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group relative flex flex-col justify-between h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-medium text-gray-500 uppercase tracking-wide",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                        lineNumber: 37,
                        columnNumber: 17
                    }, this),
                    tooltip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative group/tooltip",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                className: "w-4 h-4 text-gray-400 cursor-help hover:text-gray-600 transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                                lineNumber: 40,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 pointer-events-none leading-relaxed",
                                children: [
                                    tooltip,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                                        lineNumber: 43,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                                lineNumber: 41,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                        lineNumber: 39,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                lineNumber: 36,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-baseline gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: `text-3xl font-bold tracking-tight ${colorClass}`,
                                children: value
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                                lineNumber: 51,
                                columnNumber: 21
                            }, this),
                            trend !== 'neutral' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-xs font-bold px-2 py-0.5 rounded-full ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`,
                                children: isPositive ? '↑' : '↓'
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                                lineNumber: 53,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                        lineNumber: 50,
                        columnNumber: 17
                    }, this),
                    benchmarks && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1 pt-2 border-t border-gray-50",
                        children: benchmarks.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-400 font-medium",
                                        children: b.label
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                                        lineNumber: 63,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-600 font-mono",
                                        children: b.value
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                                        lineNumber: 64,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                                lineNumber: 62,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                        lineNumber: 60,
                        columnNumber: 21
                    }, this),
                    subValues && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1 pt-2 border-t border-gray-50",
                        children: subValues.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-400 font-medium",
                                        children: s.label
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                                        lineNumber: 74,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-600 font-mono",
                                        children: s.value
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                                        lineNumber: 75,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                                lineNumber: 73,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                        lineNumber: 71,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                lineNumber: 49,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
        lineNumber: 35,
        columnNumber: 9
    }, this);
}
_c = MetricCard;
var _c;
__turbopack_context__.k.register(_c, "MetricCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/WebstormProjects/alpalo-v2/src/components/PerformanceWidgets.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PerformanceWidgets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx [app-client] (ecmascript)");
;
;
function PerformanceWidgets({ metrics }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                label: "Total Return",
                value: `${metrics.totalReturn.toFixed(2)}%`,
                benchmarks: [
                    {
                        label: 'QQQ',
                        value: `${metrics.benchmark.totalReturn.toFixed(2)}%`
                    },
                    {
                        label: 'TQQQ',
                        value: `${metrics.benchmarkTQQQ.totalReturn.toFixed(2)}%`
                    }
                ],
                trend: metrics.totalReturn >= 0 ? 'up' : 'down'
            }, void 0, false, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/PerformanceWidgets.tsx",
                lineNumber: 12,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                label: "CAGR",
                value: `${metrics.cagr.toFixed(2)}%`,
                benchmarks: [
                    {
                        label: 'QQQ',
                        value: `${metrics.benchmark.cagr.toFixed(2)}%`
                    },
                    {
                        label: 'TQQQ',
                        value: `${metrics.benchmarkTQQQ.cagr.toFixed(2)}%`
                    }
                ],
                trend: metrics.cagr >= 0 ? 'up' : 'down',
                tooltip: "Compound Annual Growth Rate: The mean annual growth rate of an investment over a specified time period longer than one year."
            }, void 0, false, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/PerformanceWidgets.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                label: "Max Drawdown",
                value: `${metrics.maxDrawdown.toFixed(2)}%`,
                benchmarks: [
                    {
                        label: 'QQQ',
                        value: `${metrics.benchmark.maxDrawdown.toFixed(2)}%`
                    },
                    {
                        label: 'TQQQ',
                        value: `${metrics.benchmarkTQQQ.maxDrawdown.toFixed(2)}%`
                    }
                ],
                trend: "down",
                inverse: true,
                tooltip: "The maximum observed loss from a peak to a trough of a portfolio, before a new peak is attained."
            }, void 0, false, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/PerformanceWidgets.tsx",
                lineNumber: 31,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                label: "Avg Trades",
                value: metrics.avgTrades.monthly.toFixed(1),
                subValues: [
                    {
                        label: 'Daily',
                        value: metrics.avgTrades.daily.toFixed(2)
                    },
                    {
                        label: 'Monthly',
                        value: metrics.avgTrades.monthly.toFixed(1)
                    },
                    {
                        label: 'Annually',
                        value: metrics.avgTrades.annually.toFixed(0)
                    }
                ],
                trend: "neutral",
                tooltip: "Average number of trades executed over different timeframes."
            }, void 0, false, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/PerformanceWidgets.tsx",
                lineNumber: 42,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                label: "Win Rate",
                value: `${metrics.winRate.winPct.toFixed(1)}%`,
                subValues: [
                    {
                        label: 'Wins',
                        value: metrics.winRate.wins.toString()
                    },
                    {
                        label: 'Losses',
                        value: metrics.winRate.losses.toString()
                    }
                ],
                trend: metrics.winRate.winPct >= 50 ? 'up' : 'down',
                tooltip: "Percentage of winning trades out of total trades."
            }, void 0, false, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/PerformanceWidgets.tsx",
                lineNumber: 53,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                label: "Avg Position Size",
                value: `${metrics.avgPositionSize.toFixed(1)}%`,
                trend: "neutral",
                tooltip: "Average percentage of portfolio allocated to each trade."
            }, void 0, false, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/PerformanceWidgets.tsx",
                lineNumber: 63,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/PerformanceWidgets.tsx",
        lineNumber: 11,
        columnNumber: 9
    }, this);
}
_c = PerformanceWidgets;
var _c;
__turbopack_context__.k.register(_c, "PerformanceWidgets");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EquityChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
;
;
;
function EquityChart({ equityCurve }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white p-6 rounded-2xl shadow-sm border border-gray-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-bold text-gray-900 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                className: "w-5 h-5 text-blue-600"
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 15,
                                columnNumber: 21
                            }, this),
                            "Equity Curve"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                        lineNumber: 14,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded-full bg-blue-600"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                        lineNumber: 20,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-600 font-medium",
                                        children: "Strategy"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                        lineNumber: 21,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 19,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded-full bg-gray-400"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                        lineNumber: 24,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-600 font-medium",
                                        children: "QQQ"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                        lineNumber: 25,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 23,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded-full bg-purple-500"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                        lineNumber: 28,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-600 font-medium",
                                        children: "TQQQ"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                        lineNumber: 29,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 27,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                        lineNumber: 18,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                lineNumber: 13,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-[400px] w-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: "100%",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                        data: equityCurve,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                strokeDasharray: "3 3",
                                stroke: "#f0f0f0",
                                vertical: false
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 36,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                dataKey: "date",
                                stroke: "#9ca3af",
                                tick: {
                                    fontSize: 12
                                },
                                interval: "preserveStartEnd",
                                tickFormatter: (val)=>{
                                    const date = new Date(val);
                                    return `${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`;
                                }
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 37,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                domain: [
                                    'auto',
                                    'auto'
                                ],
                                tick: {
                                    fontSize: 12
                                },
                                tickFormatter: (val)=>`${val.toFixed(0)}%`
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 47,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                contentStyle: {
                                    borderRadius: '8px',
                                    border: 'none',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                },
                                formatter: (val)=>[
                                        `${val.toFixed(2)}%`,
                                        ''
                                    ],
                                labelFormatter: (label)=>{
                                    const date = new Date(label);
                                    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(2)}`;
                                }
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 52,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {}, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 60,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                type: "monotone",
                                dataKey: "equity",
                                name: "Strategy",
                                stroke: "#2563eb",
                                strokeWidth: 2,
                                dot: false,
                                activeDot: {
                                    r: 6,
                                    strokeWidth: 0
                                }
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 61,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                type: "monotone",
                                dataKey: "benchmark",
                                name: "Benchmark (QQQ)",
                                stroke: "#9ca3af",
                                strokeWidth: 2,
                                dot: false,
                                strokeDasharray: "5 5"
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 70,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                type: "monotone",
                                dataKey: "benchmarkTQQQ",
                                name: "Benchmark (TQQQ)",
                                stroke: "#8b5cf6",
                                strokeWidth: 2,
                                dot: false,
                                strokeDasharray: "3 3"
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 79,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                        lineNumber: 35,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                    lineNumber: 34,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                lineNumber: 33,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
        lineNumber: 12,
        columnNumber: 9
    }, this);
}
_c = EquityChart;
var _c;
__turbopack_context__.k.register(_c, "EquityChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TradeLogTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function TradeLogTable({ trades }) {
    const formatDate = (dateStr)=>{
        const d = new Date(dateStr);
        return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear().toString().slice(2)}`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 border-b border-gray-100",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-lg font-bold text-gray-900",
                    children: "Trade Log"
                }, void 0, false, {
                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                    lineNumber: 17,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                lineNumber: 16,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "min-w-full divide-y divide-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "bg-gray-50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Entry Date"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                        lineNumber: 23,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Exit Date"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                        lineNumber: 24,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Symbol"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                        lineNumber: 25,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Position %"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                        lineNumber: 26,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Days"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                        lineNumber: 27,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Trade Return %"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                        lineNumber: 28,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Portfolio Return %"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                        lineNumber: 29,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                lineNumber: 22,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                            lineNumber: 21,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            className: "bg-white divide-y divide-gray-200",
                            children: trades.map((trade, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "hover:bg-gray-50 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 whitespace-nowrap text-sm text-gray-900",
                                            children: formatDate(trade.entryDate)
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                            lineNumber: 35,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 whitespace-nowrap text-sm text-gray-900",
                                            children: trade.exitDate ? formatDate(trade.exitDate) : '-'
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                            lineNumber: 36,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 whitespace-nowrap text-sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800",
                                                children: trade.symbol
                                            }, void 0, false, {
                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                                lineNumber: 38,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                            lineNumber: 37,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900",
                                            children: trade.positionSizePct ? `${trade.positionSizePct.toFixed(1)}%` : '-'
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                            lineNumber: 42,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900",
                                            children: trade.daysHeld || '-'
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                            lineNumber: 45,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: `px-4 py-3 whitespace-nowrap text-sm text-right font-medium ${(trade.returnPct || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`,
                                            children: trade.returnPct ? `${trade.returnPct.toFixed(2)}%` : '-'
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                            lineNumber: 46,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: `px-4 py-3 whitespace-nowrap text-sm text-right font-medium ${(trade.portfolioReturnPct || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`,
                                            children: trade.portfolioReturnPct ? `${trade.portfolioReturnPct.toFixed(2)}%` : '-'
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                            lineNumber: 49,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                    lineNumber: 34,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                            lineNumber: 32,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                    lineNumber: 20,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                lineNumber: 19,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
        lineNumber: 15,
        columnNumber: 9
    }, this);
}
_c = TradeLogTable;
var _c;
__turbopack_context__.k.register(_c, "TradeLogTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js [app-client] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/list.js [app-client] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$PerformanceWidgets$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/src/components/PerformanceWidgets.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$EquityChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$TradeLogTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module './MonthlyPerformanceMatrix'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function Dashboard() {
    _s();
    const [startDate, setStartDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [endDate, setEndDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [minDate, setMinDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('overview');
    // Auto-populate dates from cache
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            fetch('/api/data-range').then({
                "Dashboard.useEffect": (res)=>res.json()
            }["Dashboard.useEffect"]).then({
                "Dashboard.useEffect": (data)=>{
                    if (data.oldestDate) {
                        setStartDate(data.oldestDate);
                        setMinDate(data.oldestDate);
                    }
                }
            }["Dashboard.useEffect"]).catch({
                "Dashboard.useEffect": ()=>{}
            }["Dashboard.useEffect"]);
        }
    }["Dashboard.useEffect"], []);
    const runBacktest = async ()=>{
        if (!startDate || !endDate) {
            setError('Please select both start and end dates');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/backtest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: startDate,
                    to: endDate
                })
            });
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || 'Backtest failed');
            }
            const data = await res.json();
            setResult(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setError(`Backtest error: ${message}`);
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-[1400px] mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 mb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                    className: "w-8 h-8 text-blue-600"
                                }, void 0, false, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 70,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl font-bold text-gray-900",
                                    children: "Alpalo Engine"
                                }, void 0, false, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 71,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                            lineNumber: 69,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 text-lg",
                            children: "Leveraged ETF Momentum Strategy"
                        }, void 0, false, {
                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                            lineNumber: 73,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative group inline-block mt-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500 cursor-help flex items-center gap-1"
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                lineNumber: 75,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                            lineNumber: 74,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                    lineNumber: 68,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold text-gray-700 mb-2",
                                            children: "Start Date"
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 85,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                    className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "date",
                                                    value: startDate,
                                                    min: minDate,
                                                    onChange: (e)=>setStartDate(e.target.value),
                                                    className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                }, void 0, false, {
                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 86,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 84,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold text-gray-700 mb-2",
                                            children: "End Date"
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 98,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                    className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                    lineNumber: 100,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "date",
                                                    value: endDate,
                                                    onChange: (e)=>setEndDate(e.target.value),
                                                    className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                }, void 0, false, {
                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                    lineNumber: 101,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 99,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 97,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: runBacktest,
                                        disabled: loading,
                                        className: `w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                lineNumber: 118,
                                                columnNumber: 33
                                            }, this),
                                            loading ? 'Running...' : 'Run Backtest'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 110,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 109,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                            lineNumber: 83,
                            columnNumber: 21
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                    className: "w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                                }, void 0, false, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 126,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-red-800 text-sm",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 127,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                            lineNumber: 125,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                    lineNumber: 82,
                    columnNumber: 17
                }, this),
                result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 border-b border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab('overview'),
                                    className: `px-4 py-2 font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 144,
                                            columnNumber: 33
                                        }, this),
                                        "Overview"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 137,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab('trades'),
                                    className: `px-4 py-2 font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'trades' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 154,
                                            columnNumber: 33
                                        }, this),
                                        "Trades"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 147,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab('monthly'),
                                    className: `px-4 py-2 font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'monthly' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 164,
                                            columnNumber: 33
                                        }, this),
                                        "Monthly"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 157,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                            lineNumber: 136,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                activeTab === 'overview' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$PerformanceWidgets$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            metrics: result.metrics
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 174,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$EquityChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            equityCurve: result.equityCurve
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 175,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 173,
                                    columnNumber: 33
                                }, this),
                                activeTab === 'trades' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$TradeLogTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    trades: result.trades
                                }, void 0, false, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 181,
                                    columnNumber: 33
                                }, this),
                                activeTab === 'monthly' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MonthlyPerformanceMatrix, {
                                    equityCurve: result.equityCurve
                                }, void 0, false, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 186,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                            lineNumber: 170,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                    lineNumber: 134,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
            lineNumber: 66,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
        lineNumber: 65,
        columnNumber: 9
    }, this);
}
_s(Dashboard, "OPsPO3L+jt4NT/iIOCLRaC04Tdg=");
_c = Dashboard;
var _c;
__turbopack_context__.k.register(_c, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=WebstormProjects_alpalo-v2_src_components_41cafb56._.js.map