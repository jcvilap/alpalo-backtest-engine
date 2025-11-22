(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js [app-client] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/list.js [app-client] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
function Dashboard() {
    _s();
    const [startDate, setStartDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [endDate, setEndDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [minDate, setMinDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            setEndDate(new Date().toISOString().split('T')[0]);
        }
    }["Dashboard.useEffect"], []);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('overview');
    // Auto-populate start date from cache
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
                "Dashboard.useEffect": (err)=>console.error('Failed to fetch date range:', err)
            }["Dashboard.useEffect"]);
        }
    }["Dashboard.useEffect"], []);
    const runBacktest = async ()=>{
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
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || 'Failed to run backtest');
            }
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 p-8 font-sans",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto space-y-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl shadow-sm p-6 border border-gray-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2",
                                        children: [
                                            "Alpalo Engine",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative group/tooltip",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                        className: "w-5 h-5 text-gray-400 cursor-help"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                        lineNumber: 68,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute top-full left-0 mt-2 w-80 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-20 pointer-events-none leading-relaxed",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-bold mb-1",
                                                                children: "Strategy Logic:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 70,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                className: "list-disc pl-4 space-y-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                children: "Trend Following:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                                lineNumber: 72,
                                                                                columnNumber: 49
                                                                            }, this),
                                                                            " Long TQQQ when QQQ ",
                                                                            '>',
                                                                            " 200-day MA, otherwise SQQQ."
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                        lineNumber: 72,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                children: "Mean Reversion:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                                lineNumber: 73,
                                                                                columnNumber: 49
                                                                            }, this),
                                                                            " Adjusts exposure based on 10-day Rate of Change (ROC)."
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                        lineNumber: 73,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                children: "Goal:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                                lineNumber: 74,
                                                                                columnNumber: 49
                                                                            }, this),
                                                                            " Capture major trends while hedging against volatility."
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                        lineNumber: 74,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 71,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                        lineNumber: 69,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                lineNumber: 67,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 65,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500 mt-1",
                                        children: "Trend Following (MA250) + Mean Reversion (ROC)"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 79,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                lineNumber: 64,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-end gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                        className: "w-3 h-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                        lineNumber: 86,
                                                        columnNumber: 37
                                                    }, this),
                                                    " Start Date"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                lineNumber: 85,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                value: startDate,
                                                min: minDate,
                                                onChange: (e)=>setStartDate(e.target.value),
                                                className: "block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2.5 transition-colors"
                                            }, void 0, false, {
                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                lineNumber: 88,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 84,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                        className: "w-3 h-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 37
                                                    }, this),
                                                    " End Date"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                lineNumber: 97,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                value: endDate,
                                                onChange: (e)=>setEndDate(e.target.value),
                                                className: "block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2.5 transition-colors"
                                            }, void 0, false, {
                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                lineNumber: 100,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 96,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: runBacktest,
                                        disabled: loading,
                                        className: "flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg font-medium",
                                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 41
                                                }, this),
                                                "Running..."
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 41
                                                }, this),
                                                "Run Backtest"
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 107,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                lineNumber: 83,
                                columnNumber: 25
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 animate-in fade-in slide-in-from-top-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                        className: "w-5 h-5 flex-shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 128,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-medium",
                                        children: error
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 129,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                lineNumber: 127,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                        lineNumber: 63,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 bg-gray-50 p-1 rounded-lg border border-gray-200 w-fit mt-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab('overview'),
                                className: `px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                        className: "w-4 h-4 inline mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 140,
                                        columnNumber: 29
                                    }, this),
                                    "Overview"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                lineNumber: 136,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab('trades'),
                                className: `px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'trades' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                                        className: "w-4 h-4 inline mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 147,
                                        columnNumber: 29
                                    }, this),
                                    "Trades"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                lineNumber: 143,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab('monthly'),
                                className: `px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'monthly' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"], {
                                        className: "w-4 h-4 inline mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 154,
                                        columnNumber: 29
                                    }, this),
                                    "Monthly Performance"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                lineNumber: 150,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                        lineNumber: 135,
                        columnNumber: 21
                    }, this),
                    result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500",
                        children: [
                            activeTab === 'overview' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                                                label: "Total Return",
                                                value: `${result.metrics.totalReturn.toFixed(2)}%`,
                                                benchmarks: [
                                                    {
                                                        label: 'QQQ',
                                                        value: `${result.metrics.benchmark.totalReturn.toFixed(2)}%`
                                                    },
                                                    {
                                                        label: 'TQQQ',
                                                        value: `${result.metrics.benchmarkTQQQ.totalReturn.toFixed(2)}%`
                                                    }
                                                ],
                                                trend: result.metrics.totalReturn >= 0 ? 'up' : 'down'
                                            }, void 0, false, {
                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                lineNumber: 168,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                                                label: "CAGR",
                                                value: `${result.metrics.cagr.toFixed(2)}%`,
                                                benchmarks: [
                                                    {
                                                        label: 'QQQ',
                                                        value: `${result.metrics.benchmark.cagr.toFixed(2)}%`
                                                    },
                                                    {
                                                        label: 'TQQQ',
                                                        value: `${result.metrics.benchmarkTQQQ.cagr.toFixed(2)}%`
                                                    }
                                                ],
                                                trend: result.metrics.cagr >= 0 ? 'up' : 'down',
                                                tooltip: "Compound Annual Growth Rate: The mean annual growth rate of an investment over a specified time period longer than one year."
                                            }, void 0, false, {
                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                lineNumber: 177,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                                                label: "Max Drawdown",
                                                value: `${result.metrics.maxDrawdown.toFixed(2)}%`,
                                                benchmarks: [
                                                    {
                                                        label: 'QQQ',
                                                        value: `${result.metrics.benchmark.maxDrawdown.toFixed(2)}%`
                                                    },
                                                    {
                                                        label: 'TQQQ',
                                                        value: `${result.metrics.benchmarkTQQQ.maxDrawdown.toFixed(2)}%`
                                                    }
                                                ],
                                                trend: "down",
                                                inverse: true,
                                                tooltip: "The maximum observed loss from a peak to a trough of a portfolio, before a new peak is attained."
                                            }, void 0, false, {
                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                lineNumber: 187,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                                                label: "Avg Trades",
                                                value: result.metrics.avgTrades.monthly.toFixed(1),
                                                subValues: [
                                                    {
                                                        label: 'Daily',
                                                        value: result.metrics.avgTrades.daily.toFixed(2)
                                                    },
                                                    {
                                                        label: 'Monthly',
                                                        value: result.metrics.avgTrades.monthly.toFixed(1)
                                                    },
                                                    {
                                                        label: 'Annually',
                                                        value: result.metrics.avgTrades.annually.toFixed(0)
                                                    }
                                                ],
                                                trend: "neutral",
                                                tooltip: "Average number of trades executed over different timeframes."
                                            }, void 0, false, {
                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                lineNumber: 198,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                                                label: "Win Rate",
                                                value: `${result.metrics.winRate.winPct.toFixed(1)}%`,
                                                subValues: [
                                                    {
                                                        label: 'Wins',
                                                        value: result.metrics.winRate.wins.toString()
                                                    },
                                                    {
                                                        label: 'Losses',
                                                        value: result.metrics.winRate.losses.toString()
                                                    }
                                                ],
                                                trend: result.metrics.winRate.winPct >= 50 ? 'up' : 'down',
                                                tooltip: "Percentage of winning trades out of total trades."
                                            }, void 0, false, {
                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                lineNumber: 209,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                                                label: "Avg Position Size",
                                                value: `${result.metrics.avgPositionSize.toFixed(1)}%`,
                                                trend: "neutral",
                                                tooltip: "Average percentage of portfolio allocated to each trade."
                                            }, void 0, false, {
                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                lineNumber: 219,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 167,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 231,
                                                                columnNumber: 49
                                                            }, this),
                                                            "Equity Curve"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                        lineNumber: 230,
                                                        columnNumber: 45
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
                                                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                        lineNumber: 236,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-600 font-medium",
                                                                        children: "Strategy"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                        lineNumber: 237,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 235,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-3 h-3 rounded-full bg-gray-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                        lineNumber: 240,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-600 font-medium",
                                                                        children: "QQQ"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                        lineNumber: 241,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 239,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-3 h-3 rounded-full bg-purple-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                        lineNumber: 244,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-600 font-medium",
                                                                        children: "TQQQ"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                        lineNumber: 245,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 243,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                        lineNumber: 234,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                lineNumber: 229,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-[400px] w-full",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                    width: "100%",
                                                    height: "100%",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                                                        data: result.equityCurve,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                                strokeDasharray: "3 3",
                                                                stroke: "#f0f0f0",
                                                                vertical: false
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 252,
                                                                columnNumber: 53
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
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 253,
                                                                columnNumber: 53
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
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 263,
                                                                columnNumber: 53
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
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 268,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {}, void 0, false, {
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 276,
                                                                columnNumber: 53
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
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 277,
                                                                columnNumber: 53
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
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 286,
                                                                columnNumber: 53
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
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 295,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                        lineNumber: 251,
                                                        columnNumber: 49
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                lineNumber: 249,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 228,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                lineNumber: 165,
                                columnNumber: 33
                            }, this),
                            activeTab === 'trades' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-6 border-b border-gray-100",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-bold text-gray-900",
                                            children: "Trade Log"
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 315,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 314,
                                        columnNumber: 37
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
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 321,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                children: "Exit Date"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 322,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                children: "Symbol"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 323,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                children: "Position %"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 324,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                children: "Days"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 325,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                children: "Trade Return %"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 326,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                children: "Portfolio Return %"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 327,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                        lineNumber: 320,
                                                        columnNumber: 49
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                    lineNumber: 319,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    className: "bg-white divide-y divide-gray-200",
                                                    children: result.trades.map((trade, idx)=>{
                                                        const formatDate = (dateStr)=>{
                                                            const d = new Date(dateStr);
                                                            return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear().toString().slice(2)}`;
                                                        };
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            className: "hover:bg-gray-50 transition-colors",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-4 py-3 whitespace-nowrap text-sm text-gray-900",
                                                                    children: formatDate(trade.entryDate)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                    lineNumber: 339,
                                                                    columnNumber: 61
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-4 py-3 whitespace-nowrap text-sm text-gray-900",
                                                                    children: trade.exitDate ? formatDate(trade.exitDate) : '-'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                    lineNumber: 340,
                                                                    columnNumber: 61
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-4 py-3 whitespace-nowrap text-sm",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800`,
                                                                        children: trade.symbol
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                        lineNumber: 342,
                                                                        columnNumber: 65
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                    lineNumber: 341,
                                                                    columnNumber: 61
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900",
                                                                    children: trade.positionSizePct ? `${trade.positionSizePct.toFixed(1)}%` : '-'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                    lineNumber: 346,
                                                                    columnNumber: 61
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900",
                                                                    children: trade.daysHeld || '-'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                    lineNumber: 349,
                                                                    columnNumber: 61
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: `px-4 py-3 whitespace-nowrap text-sm text-right font-medium ${(trade.returnPct || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`,
                                                                    children: trade.returnPct ? `${trade.returnPct.toFixed(2)}%` : '-'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                    lineNumber: 350,
                                                                    columnNumber: 61
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: `px-4 py-3 whitespace-nowrap text-sm text-right font-medium ${(trade.portfolioReturnPct || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`,
                                                                    children: trade.portfolioReturnPct ? `${trade.portfolioReturnPct.toFixed(2)}%` : '-'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                    lineNumber: 353,
                                                                    columnNumber: 61
                                                                }, this)
                                                            ]
                                                        }, idx, true, {
                                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                            lineNumber: 338,
                                                            columnNumber: 57
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                    lineNumber: 330,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 318,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 317,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                lineNumber: 313,
                                columnNumber: 33
                            }, this),
                            activeTab === 'monthly' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MonthlyPerformanceMatrix, {
                                equityCurve: result.equityCurve
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                lineNumber: 367,
                                columnNumber: 33
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                        lineNumber: 161,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                lineNumber: 62,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
            lineNumber: 59,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
        lineNumber: 58,
        columnNumber: 9
    }, this);
}
_s(Dashboard, "7tmERp4JOqUgPbBrOaB2nfUSKm0=");
_c = Dashboard;
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
                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                        lineNumber: 409,
                        columnNumber: 17
                    }, this),
                    tooltip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative group/tooltip",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                className: "w-4 h-4 text-gray-400 cursor-help hover:text-gray-600 transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                lineNumber: 412,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 pointer-events-none leading-relaxed",
                                children: [
                                    tooltip,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 415,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                lineNumber: 413,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                        lineNumber: 411,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                lineNumber: 408,
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
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                lineNumber: 423,
                                columnNumber: 21
                            }, this),
                            trend !== 'neutral' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-xs font-bold px-2 py-0.5 rounded-full ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`,
                                children: isPositive ? '↑' : '↓'
                            }, void 0, false, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                lineNumber: 425,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                        lineNumber: 422,
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
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 435,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-600 font-mono",
                                        children: b.value
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 436,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                lineNumber: 434,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                        lineNumber: 432,
                        columnNumber: 21
                    }, this),
                    subValues && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-2 pt-2 border-t border-gray-50",
                        children: subValues.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[10px] text-gray-400 uppercase font-bold",
                                        children: s.label
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 446,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs font-mono text-gray-700",
                                        children: s.value
                                    }, void 0, false, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 447,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                lineNumber: 445,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                        lineNumber: 443,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                lineNumber: 421,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
        lineNumber: 407,
        columnNumber: 9
    }, this);
}
_c1 = MetricCard;
function MonthlyPerformanceMatrix({ equityCurve }) {
    _s1();
    const [sortConfig, setSortConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        key: 'year',
        direction: 'desc'
    });
    // Calculate monthly returns
    const monthlyReturns = {};
    // Helper to get month/year
    const getMonthYear = (dateStr)=>{
        const date = new Date(dateStr);
        return {
            year: date.getFullYear(),
            month: date.getMonth()
        };
    };
    const years = Array.from(new Set(equityCurve.map((d)=>new Date(d.date).getFullYear())));
    const months = [
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
    ];
    // Build the matrix
    years.forEach((year)=>{
        monthlyReturns[year] = {};
        months.forEach((_, monthIdx)=>{
            const monthData = equityCurve.filter((d)=>{
                const { year: y, month: m } = getMonthYear(d.date);
                return y === year && m === monthIdx;
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
    // Calculate YTD for sorting
    const yearStats = years.map((year)=>{
        const yearData = equityCurve.filter((d)=>new Date(d.date).getFullYear() === year);
        let ytdStrat = 0;
        let ytdBen = 0;
        let ytdTQQQ = 0;
        if (yearData.length > 0) {
            const start = yearData[0];
            const end = yearData[yearData.length - 1];
            const startEq = 100 * (1 + start.equity / 100);
            const endEq = 100 * (1 + end.equity / 100);
            ytdStrat = (endEq - startEq) / startEq * 100;
            const startBen = 100 * (1 + start.benchmark / 100);
            const endBen = 100 * (1 + end.benchmark / 100);
            ytdBen = (endBen - startBen) / startBen * 100;
            const startTQQQ = 100 * (1 + start.benchmarkTQQQ / 100);
            const endTQQQ = 100 * (1 + end.benchmarkTQQQ / 100);
            ytdTQQQ = (endTQQQ - startTQQQ) / startTQQQ * 100;
        }
        return {
            year,
            ytdStrat,
            ytdBen,
            ytdTQQQ
        };
    });
    // Sort
    const sortedYears = [
        ...yearStats
    ].sort((a, b)=>{
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });
    const handleSort = (key)=>{
        setSortConfig((current)=>({
                key,
                direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc'
            }));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 border-b border-gray-100",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-lg font-bold text-gray-900",
                    children: "Monthly Performance (Strategy vs Benchmark)"
                }, void 0, false, {
                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                    lineNumber: 543,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                lineNumber: 542,
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
                                        className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100",
                                        onClick: ()=>handleSort('year'),
                                        children: [
                                            "Year ",
                                            sortConfig.key === 'year' && (sortConfig.direction === 'asc' ? '↑' : '↓')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 549,
                                        columnNumber: 29
                                    }, this),
                                    months.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",
                                            children: m
                                        }, m, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 556,
                                            columnNumber: 33
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100",
                                        onClick: ()=>handleSort('ytdStrat'),
                                        children: [
                                            "YTD ",
                                            sortConfig.key === 'ytdStrat' && (sortConfig.direction === 'asc' ? '↑' : '↓')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                        lineNumber: 558,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                lineNumber: 548,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                            lineNumber: 547,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            className: "bg-white divide-y divide-gray-200",
                            children: sortedYears.map(({ year, ytdStrat, ytdBen, ytdTQQQ })=>{
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "hover:bg-gray-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900",
                                            children: year
                                        }, void 0, false, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 570,
                                            columnNumber: 37
                                        }, this),
                                        months.map((_, monthIdx)=>{
                                            const data = monthlyReturns[year]?.[monthIdx];
                                            if (!data) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-center text-sm text-gray-300",
                                                children: "-"
                                            }, monthIdx, false, {
                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                lineNumber: 573,
                                                columnNumber: 59
                                            }, this);
                                            const stratColor = data.strategy >= 0 ? 'text-green-600' : 'text-red-600';
                                            const benColor = 'text-gray-400';
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-2 py-3 text-center text-xs",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `font-bold ${stratColor}`,
                                                        children: [
                                                            data.strategy.toFixed(1),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                        lineNumber: 580,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-center gap-1 text-[9px] mt-0.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: benColor,
                                                                title: "QQQ",
                                                                children: [
                                                                    data.benchmark.toFixed(1),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 582,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-purple-400",
                                                                title: "TQQQ",
                                                                children: [
                                                                    data.benchmarkTQQQ.toFixed(1),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                                lineNumber: 583,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                        lineNumber: 581,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, monthIdx, true, {
                                                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                lineNumber: 579,
                                                columnNumber: 45
                                            }, this);
                                        }),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 text-center text-sm font-bold",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: ytdStrat >= 0 ? 'text-green-600' : 'text-red-600',
                                                    children: [
                                                        ytdStrat.toFixed(1),
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                    lineNumber: 589,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-center gap-2 text-[10px] mt-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-400",
                                                            title: "QQQ",
                                                            children: [
                                                                ytdBen.toFixed(1),
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                            lineNumber: 591,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-purple-400",
                                                            title: "TQQQ",
                                                            children: [
                                                                ytdTQQQ.toFixed(1),
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                            lineNumber: 592,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                                    lineNumber: 590,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                            lineNumber: 588,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, year, true, {
                                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                                    lineNumber: 569,
                                    columnNumber: 33
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                            lineNumber: 566,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                    lineNumber: 546,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
                lineNumber: 545,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/WebstormProjects/alpalo-v2/src/components/Dashboard.tsx",
        lineNumber: 541,
        columnNumber: 9
    }, this);
}
_s1(MonthlyPerformanceMatrix, "rfmEOgp+bRPIB+ODR3cVH2NcfLg=");
_c2 = MonthlyPerformanceMatrix;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Dashboard");
__turbopack_context__.k.register(_c1, "MetricCard");
__turbopack_context__.k.register(_c2, "MonthlyPerformanceMatrix");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=WebstormProjects_alpalo-v2_src_components_Dashboard_tsx_1efae75c._.js.map