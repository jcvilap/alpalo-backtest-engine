module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MetricCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as Info>");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group relative flex flex-col justify-between h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-medium text-gray-500 uppercase tracking-wide",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                        lineNumber: 37,
                        columnNumber: 17
                    }, this),
                    tooltip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative group/tooltip",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                className: "w-4 h-4 text-gray-400 cursor-help hover:text-gray-600 transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                                lineNumber: 40,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 pointer-events-none leading-relaxed",
                                children: [
                                    tooltip,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-baseline gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: `text-3xl font-bold tracking-tight ${colorClass}`,
                                children: value
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                                lineNumber: 51,
                                columnNumber: 21
                            }, this),
                            trend !== 'neutral' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    benchmarks && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1 pt-2 border-t border-gray-50",
                        children: benchmarks.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `font-medium ${b.label === 'QQQ' ? 'text-gray-400' : 'text-purple-500'}`,
                                        children: b.label
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                                        lineNumber: 63,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    subValues && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1 pt-2 border-t border-gray-50",
                        children: subValues.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-400 font-medium",
                                        children: s.label
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx",
                                        lineNumber: 74,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
}),
"[project]/WebstormProjects/alpalo-v2/src/components/PerformanceWidgets.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$MetricCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/src/components/MetricCard.tsx [app-ssr] (ecmascript)");
;
;
;
const PerformanceWidgets = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].memo(({ metrics })=>{
    // Memoize benchmark data to avoid recalculation on every render
    const benchmarkData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            totalReturn: [
                {
                    label: 'QQQ',
                    value: `${metrics.benchmark.totalReturn.toFixed(2)}%`
                },
                {
                    label: 'TQQQ',
                    value: `${metrics.benchmarkTQQQ.totalReturn.toFixed(2)}%`
                }
            ],
            cagr: [
                {
                    label: 'QQQ',
                    value: `${metrics.benchmark.cagr.toFixed(2)}%`
                },
                {
                    label: 'TQQQ',
                    value: `${metrics.benchmarkTQQQ.cagr.toFixed(2)}%`
                }
            ],
            maxDrawdown: [
                {
                    label: 'QQQ',
                    value: `${metrics.benchmark.maxDrawdown.toFixed(2)}%`
                },
                {
                    label: 'TQQQ',
                    value: `${metrics.benchmarkTQQQ.maxDrawdown.toFixed(2)}%`
                }
            ]
        }), [
        metrics
    ]);
    const avgTradesSubValues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>[
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
        ], [
        metrics.avgTrades
    ]);
    const winRateSubValues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>[
            {
                label: 'Wins',
                value: metrics.winRate.wins.toString()
            },
            {
                label: 'Losses',
                value: metrics.winRate.losses.toString()
            }
        ], [
        metrics.winRate
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$MetricCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                label: "Total Return",
                value: `${metrics.totalReturn.toFixed(2)}%`,
                benchmarks: benchmarkData.totalReturn,
                trend: metrics.totalReturn >= 0 ? 'up' : 'down'
            }, void 0, false, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/PerformanceWidgets.tsx",
                lineNumber: 39,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$MetricCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                label: "CAGR",
                value: `${metrics.cagr.toFixed(2)}%`,
                benchmarks: benchmarkData.cagr,
                trend: metrics.cagr >= 0 ? 'up' : 'down',
                tooltip: "Compound Annual Growth Rate: The mean annual growth rate of an investment over a specified time period longer than one year."
            }, void 0, false, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/PerformanceWidgets.tsx",
                lineNumber: 45,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$MetricCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                label: "Max Drawdown",
                value: `${metrics.maxDrawdown.toFixed(2)}%`,
                benchmarks: benchmarkData.maxDrawdown,
                trend: "down",
                inverse: true,
                tooltip: "The maximum observed loss from a peak to a trough of a portfolio, before a new peak is attained."
            }, void 0, false, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/PerformanceWidgets.tsx",
                lineNumber: 52,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$MetricCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                label: "Avg Trades",
                value: metrics.avgTrades.monthly.toFixed(1),
                subValues: avgTradesSubValues,
                trend: "neutral",
                tooltip: "Average number of trades executed over different timeframes."
            }, void 0, false, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/PerformanceWidgets.tsx",
                lineNumber: 60,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$MetricCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                label: "Win Rate",
                value: `${metrics.winRate.winPct.toFixed(1)}%`,
                subValues: winRateSubValues,
                trend: metrics.winRate.winPct >= 50 ? 'up' : 'down',
                tooltip: "Percentage of winning trades out of total trades."
            }, void 0, false, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/PerformanceWidgets.tsx",
                lineNumber: 67,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$MetricCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                label: "Avg Position Size",
                value: `${metrics.avgPositionSize.toFixed(1)}%`,
                trend: "neutral",
                tooltip: "Average percentage of portfolio allocated to each trade."
            }, void 0, false, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/PerformanceWidgets.tsx",
                lineNumber: 74,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/PerformanceWidgets.tsx",
        lineNumber: 38,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
});
PerformanceWidgets.displayName = 'PerformanceWidgets';
const __TURBOPACK__default__export__ = PerformanceWidgets;
}),
"[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/chart/LineChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/cartesian/Line.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/cartesian/XAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/cartesian/YAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/component/Legend.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
;
;
;
;
const EquityChart = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].memo(({ equityCurve })=>{
    // Memoize tooltip formatter to avoid recreating on every render
    const tooltipFormatter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(val)=>[
                `${val.toFixed(2)}%`,
                ''
            ], []);
    const tooltipLabelFormatter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(label)=>{
            const date = new Date(label);
            return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(2)}`;
        }, []);
    const xAxisTickFormatter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(val)=>{
            const date = new Date(val);
            return `${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`;
        }, []);
    const yAxisTickFormatter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(val)=>`${val.toFixed(0)}%`, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white p-6 rounded-2xl shadow-sm border border-gray-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-bold text-gray-900 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                className: "w-5 h-5 text-blue-600"
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 30,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Equity Curve"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                        lineNumber: 29,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded-full bg-blue-600"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                        lineNumber: 35,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-600 font-medium",
                                        children: "Strategy"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                        lineNumber: 36,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 34,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded-full bg-gray-400"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                        lineNumber: 39,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-600 font-medium",
                                        children: "QQQ"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                        lineNumber: 40,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 38,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded-full bg-purple-500"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                        lineNumber: 43,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-600 font-medium",
                                        children: "TQQQ"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                        lineNumber: 44,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 42,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                        lineNumber: 33,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                lineNumber: 28,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-[400px] w-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: "100%",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineChart"], {
                        data: equityCurve,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                strokeDasharray: "3 3",
                                stroke: "#f0f0f0",
                                vertical: false
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 51,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                dataKey: "date",
                                stroke: "#9ca3af",
                                tick: {
                                    fontSize: 12
                                },
                                interval: "preserveStartEnd",
                                tickFormatter: xAxisTickFormatter
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 52,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                domain: [
                                    'auto',
                                    'auto'
                                ],
                                tick: {
                                    fontSize: 12
                                },
                                tickFormatter: yAxisTickFormatter
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 59,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                contentStyle: {
                                    borderRadius: '8px',
                                    border: 'none',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                },
                                formatter: tooltipFormatter,
                                labelFormatter: tooltipLabelFormatter
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 64,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Legend"], {}, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 69,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"], {
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
                                lineNumber: 70,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"], {
                                type: "monotone",
                                dataKey: "benchmark",
                                name: "Benchmark (QQQ)",
                                stroke: "#9ca3af",
                                strokeWidth: 2,
                                dot: false,
                                strokeDasharray: "5 5"
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 79,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"], {
                                type: "monotone",
                                dataKey: "benchmarkTQQQ",
                                name: "Benchmark (TQQQ)",
                                stroke: "#8b5cf6",
                                strokeWidth: 2,
                                dot: false,
                                strokeDasharray: "3 3"
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                                lineNumber: 88,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                        lineNumber: 50,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                    lineNumber: 49,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
                lineNumber: 48,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx",
        lineNumber: 27,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
});
EquityChart.displayName = 'EquityChart';
const __TURBOPACK__default__export__ = EquityChart;
}),
"[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const TradeLogTable = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].memo(({ trades })=>{
    // Memoize date formatter
    const formatDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((dateStr)=>{
        const d = new Date(dateStr);
        return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear().toString().slice(2)}`;
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 border-b border-gray-100",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-lg font-bold text-gray-900",
                    children: "Trade Log"
                }, void 0, false, {
                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                    lineNumber: 18,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                lineNumber: 17,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "min-w-full divide-y divide-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "bg-gray-50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Entry Date"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                        lineNumber: 24,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Exit Date"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                        lineNumber: 25,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Symbol"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                        lineNumber: 26,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Position %"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                        lineNumber: 27,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Days"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                        lineNumber: 28,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Trade Return %"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                        lineNumber: 29,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Portfolio Return %"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                        lineNumber: 30,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                lineNumber: 23,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                            lineNumber: 22,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            className: "bg-white divide-y divide-gray-200",
                            children: trades.map((trade, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "hover:bg-gray-50 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 whitespace-nowrap text-sm text-gray-900",
                                            children: formatDate(trade.entryDate)
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                            lineNumber: 36,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 whitespace-nowrap text-sm text-gray-900",
                                            children: trade.exitDate ? formatDate(trade.exitDate) : '-'
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                            lineNumber: 37,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 whitespace-nowrap text-sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800",
                                                children: trade.symbol
                                            }, void 0, false, {
                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                                lineNumber: 39,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                            lineNumber: 38,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900",
                                            children: trade.positionSizePct ? `${trade.positionSizePct.toFixed(1)}%` : '-'
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                            lineNumber: 43,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900",
                                            children: trade.daysHeld || '-'
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                            lineNumber: 46,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: `px-4 py-3 whitespace-nowrap text-sm text-right font-medium ${(trade.returnPct || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`,
                                            children: trade.returnPct ? `${trade.returnPct.toFixed(2)}%` : '-'
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                            lineNumber: 47,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: `px-4 py-3 whitespace-nowrap text-sm text-right font-medium ${(trade.portfolioReturnPct || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`,
                                            children: trade.portfolioReturnPct ? `${trade.portfolioReturnPct.toFixed(2)}%` : '-'
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                            lineNumber: 50,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                                    lineNumber: 35,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                            lineNumber: 33,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                    lineNumber: 21,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
                lineNumber: 20,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx",
        lineNumber: 16,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
});
TradeLogTable.displayName = 'TradeLogTable';
const __TURBOPACK__default__export__ = TradeLogTable;
}),
"[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const MonthlyPerformanceMatrix = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].memo(({ equityCurve })=>{
    const [sortConfig, setSortConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        key: 'year',
        direction: 'desc'
    });
    const months = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>[
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ], []);
    // Memoize monthly returns calculation
    const { monthlyReturns, ytdReturns, years } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const monthlyReturns = {};
        const years = Array.from(new Set(equityCurve.map((d)=>new Date(d.date).getFullYear())));
        // Build the matrix
        years.forEach((year)=>{
            monthlyReturns[year] = {};
            months.forEach((_, monthIdx)=>{
                const monthData = equityCurve.filter((d)=>{
                    const date = new Date(d.date);
                    return date.getFullYear() === year && date.getMonth() === monthIdx;
                });
                if (monthData.length > 0) {
                    const start = monthData[0];
                    const end = monthData[monthData.length - 1];
                    const startEq = 100 * (1 + start.equity / 100);
                    const endEq = 100 * (1 + end.equity / 100);
                    const stratRet = (endEq - startEq) / startEq * 100;
                    const startBen = 100 * (1 + start.benchmark / 100);
                    const endBen = 100 * (1 + end.benchmark / 100);
                    const benRet = (endBen - startBen) / startBen * 100;
                    const startTQQQ = 100 * (1 + start.benchmarkTQQQ / 100);
                    const endTQQQ = 100 * (1 + end.benchmarkTQQQ / 100);
                    const tqqqRet = (endTQQQ - startTQQQ) / startTQQQ * 100;
                    monthlyReturns[year][monthIdx] = {
                        strategy: stratRet,
                        benchmark: benRet,
                        benchmarkTQQQ: tqqqRet
                    };
                }
            });
        });
        // Calculate YTD returns
        const ytdReturns = {};
        years.forEach((year)=>{
            const yearlyMonths = Object.keys(monthlyReturns[year]).map(Number);
            if (yearlyMonths.length > 0) {
                const firstMonth = Math.min(...yearlyMonths);
                const lastMonth = Math.max(...yearlyMonths);
                const firstData = equityCurve.find((d)=>{
                    const date = new Date(d.date);
                    return date.getFullYear() === year && date.getMonth() === firstMonth;
                });
                const lastData = equityCurve.filter((d)=>{
                    const date = new Date(d.date);
                    return date.getFullYear() === year && date.getMonth() === lastMonth;
                }).pop();
                if (firstData && lastData) {
                    const startEq = 100 * (1 + firstData.equity / 100);
                    const endEq = 100 * (1 + lastData.equity / 100);
                    const stratRet = (endEq - startEq) / startEq * 100;
                    const startBen = 100 * (1 + firstData.benchmark / 100);
                    const endBen = 100 * (1 + lastData.benchmark / 100);
                    const benRet = (endBen - startBen) / startBen * 100;
                    const startTQQQ = 100 * (1 + firstData.benchmarkTQQQ / 100);
                    const endTQQQ = 100 * (1 + lastData.benchmarkTQQQ / 100);
                    const tqqqRet = (endTQQQ - startTQQQ) / startTQQQ * 100;
                    ytdReturns[year] = {
                        strategy: stratRet,
                        benchmark: benRet,
                        benchmarkTQQQ: tqqqRet
                    };
                }
            }
        });
        return {
            monthlyReturns,
            ytdReturns,
            years
        };
    }, [
        equityCurve,
        months
    ]);
    // Memoize sorted years
    const sortedYears = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const sorted = [
            ...years
        ];
        sorted.sort((a, b)=>{
            if (sortConfig.key === 'year') {
                return sortConfig.direction === 'asc' ? a - b : b - a;
            } else {
                // Map ytd keys to data keys
                const keyMap = {
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
    }, [
        years,
        sortConfig,
        ytdReturns
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-bold text-gray-900 mb-6",
                children: "Monthly Performance Matrix"
            }, void 0, false, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx",
                lineNumber: 114,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "min-w-full text-xs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        className: "bg-gray-50 sticky top-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-3 py-2 text-center font-bold text-gray-700 cursor-pointer sticky left-0 bg-gray-50 z-10",
                                    onClick: ()=>setSortConfig({
                                            key: 'year',
                                            direction: sortConfig.direction === 'asc' ? 'desc' : 'asc'
                                        }),
                                    children: [
                                        "Year ",
                                        sortConfig.key === 'year' && (sortConfig.direction === 'asc' ? '▲' : '▼')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx",
                                    lineNumber: 118,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                months.map((month)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-2 py-2 text-center font-bold text-gray-700",
                                        children: month
                                    }, month, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx",
                                        lineNumber: 122,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-3 py-2 text-center font-bold text-gray-700 bg-gray-100 cursor-pointer sticky right-0 z-10",
                                    onClick: ()=>setSortConfig({
                                            key: 'ytdStrat',
                                            direction: sortConfig.direction === 'asc' ? 'desc' : 'asc'
                                        }),
                                    children: [
                                        "YTD ",
                                        sortConfig.key === 'ytdStrat' && (sortConfig.direction === 'asc' ? '▲' : '▼')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx",
                                    lineNumber: 124,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx",
                            lineNumber: 117,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx",
                        lineNumber: 116,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: sortedYears.map((year)=>{
                            const ytd = ytdReturns[year];
                            const ytdStrat = ytd?.strategy || 0;
                            const ytdBen = ytd?.benchmark || 0;
                            const ytdTQQQ = ytd?.benchmarkTQQQ || 0;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-b border-gray-100 hover:bg-gray-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-3 py-3 text-center font-bold text-gray-900 sticky left-0 bg-white z-10",
                                        children: year
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx",
                                        lineNumber: 138,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    months.map((_, monthIdx)=>{
                                        const data = monthlyReturns[year][monthIdx];
                                        if (!data) {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-2 py-3 text-center text-gray-300",
                                                children: "-"
                                            }, monthIdx, false, {
                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx",
                                                lineNumber: 142,
                                                columnNumber: 48
                                            }, ("TURBOPACK compile-time value", void 0));
                                        }
                                        const stratColor = data.strategy >= 0 ? 'text-green-600' : 'text-red-600';
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-2 py-3 text-center text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `font-bold ${stratColor}`,
                                                    children: [
                                                        data.strategy.toFixed(1),
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-center gap-1 text-[9px] mt-0.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-400",
                                                            title: "QQQ",
                                                            children: [
                                                                data.benchmark.toFixed(1),
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx",
                                                            lineNumber: 151,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-purple-500",
                                                            title: "TQQQ",
                                                            children: [
                                                                data.benchmarkTQQQ.toFixed(1),
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx",
                                                            lineNumber: 152,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx",
                                                    lineNumber: 150,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, monthIdx, true, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx",
                                            lineNumber: 148,
                                            columnNumber: 41
                                        }, ("TURBOPACK compile-time value", void 0));
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3 text-center text-sm font-bold bg-gray-50 sticky right-0 z-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: ytdStrat >= 0 ? 'text-green-600' : 'text-red-600',
                                                children: [
                                                    ytdStrat.toFixed(1),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx",
                                                lineNumber: 158,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-center gap-2 text-[10px] mt-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-400",
                                                        title: "QQQ",
                                                        children: [
                                                            ytdBen.toFixed(1),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx",
                                                        lineNumber: 160,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-purple-500",
                                                        title: "TQQQ",
                                                        children: [
                                                            ytdTQQQ.toFixed(1),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx",
                                                        lineNumber: 161,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx",
                                                lineNumber: 159,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx",
                                        lineNumber: 157,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, year, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx",
                                lineNumber: 137,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    }, void 0, false, {
                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx",
                        lineNumber: 129,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx",
                lineNumber: 115,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx",
        lineNumber: 113,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
});
MonthlyPerformanceMatrix.displayName = 'MonthlyPerformanceMatrix';
const __TURBOPACK__default__export__ = MonthlyPerformanceMatrix;
}),
"[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/calendar.js [app-ssr] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/play.js [app-ssr] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/activity.js [app-ssr] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js [app-ssr] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/list.js [app-ssr] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$PerformanceWidgets$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/src/components/PerformanceWidgets.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$EquityChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/src/components/EquityChart.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$TradeLogTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/src/components/TradeLogTable.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$MonthlyPerformanceMatrix$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/src/components/MonthlyPerformanceMatrix.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function Dashboard() {
    const [startDate, setStartDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [endDate, setEndDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [minDate, setMinDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('overview');
    // Auto-populate dates from cache
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetch('/api/data-range').then((res)=>res.json()).then((data)=>{
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
        }).catch(()=>{
            // Fallback on error
            setEndDate(new Date().toISOString().split('T')[0]);
        });
    }, []);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-[1400px] mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 mb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                    className: "w-8 h-8 text-blue-600"
                                }, void 0, false, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 79,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl font-bold text-gray-900",
                                    children: "Alpalo Backtest Engine"
                                }, void 0, false, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 80,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                            lineNumber: 78,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 text-lg",
                            children: "Leveraged ETF Momentum Strategy"
                        }, void 0, false, {
                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                            lineNumber: 82,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative group inline-block mt-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500 cursor-help flex items-center gap-1"
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                lineNumber: 84,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                            lineNumber: 83,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                    lineNumber: 77,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-5 gap-4 items-end",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:col-span-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold text-gray-700 mb-2",
                                            children: "Start Date"
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 94,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                    className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "date",
                                                    value: startDate,
                                                    min: minDate,
                                                    onChange: (e)=>setStartDate(e.target.value),
                                                    className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                }, void 0, false, {
                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 95,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 93,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:col-span-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold text-gray-700 mb-2",
                                            children: "End Date"
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 107,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                    className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                    lineNumber: 109,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "date",
                                                    value: endDate,
                                                    onChange: (e)=>setEndDate(e.target.value),
                                                    className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                }, void 0, false, {
                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                    lineNumber: 110,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 108,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 106,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: runBacktest,
                                        disabled: loading,
                                        className: `w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                lineNumber: 127,
                                                columnNumber: 33
                                            }, this),
                                            loading ? 'Running...' : 'Run Backtest'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 119,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 118,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                            lineNumber: 92,
                            columnNumber: 21
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                    className: "w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                                }, void 0, false, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 135,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-red-800 text-sm",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 136,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                            lineNumber: 134,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                    lineNumber: 91,
                    columnNumber: 17
                }, this),
                result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 border-b border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab('overview'),
                                    className: `px-4 py-2 font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 153,
                                            columnNumber: 33
                                        }, this),
                                        "Overview"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 146,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab('trades'),
                                    className: `px-4 py-2 font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'trades' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 163,
                                            columnNumber: 33
                                        }, this),
                                        "Trades"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 156,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab('monthly'),
                                    className: `px-4 py-2 font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'monthly' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 173,
                                            columnNumber: 33
                                        }, this),
                                        "Monthly"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 166,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                            lineNumber: 145,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                activeTab === 'overview' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$PerformanceWidgets$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            metrics: result.metrics
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 183,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$EquityChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            equityCurve: result.equityCurve
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 184,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 182,
                                    columnNumber: 33
                                }, this),
                                activeTab === 'trades' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$TradeLogTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    trades: result.trades
                                }, void 0, false, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 190,
                                    columnNumber: 33
                                }, this),
                                activeTab === 'monthly' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$components$2f$MonthlyPerformanceMatrix$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    equityCurve: result.equityCurve
                                }, void 0, false, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 195,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                            lineNumber: 179,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                    lineNumber: 143,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
            lineNumber: 75,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
        lineNumber: 74,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ac7be38b._.js.map