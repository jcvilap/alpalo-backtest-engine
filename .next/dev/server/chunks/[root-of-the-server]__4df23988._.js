module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/WebstormProjects/alpalo-v2/src/lib/polygon/client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PolygonClient",
    ()=>PolygonClient
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const BASE_URL = 'https://api.polygon.io/v2/aggs/ticker';
const CACHE_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'cache');
class PolygonClient {
    constructor(){
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(CACHE_DIR)) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(CACHE_DIR, {
                recursive: true
            });
        }
    }
    getCacheFilePath(ticker) {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(CACHE_DIR, `${ticker}.json`);
    }
    loadCache(ticker) {
        const filePath = this.getCacheFilePath(ticker);
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(filePath)) {
            try {
                const data = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(filePath, 'utf-8');
                return JSON.parse(data);
            } catch (e) {
                console.error(`Error reading cache for ${ticker}:`, e);
                return [];
            }
        }
        return [];
    }
    saveCache(ticker, data) {
        const filePath = this.getCacheFilePath(ticker);
        // Sort by date and deduplicate
        const uniqueData = Array.from(new Map(data.map((item)=>[
                item.date,
                item
            ])).values()).sort((a, b)=>new Date(a.date).getTime() - new Date(b.date).getTime());
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(filePath, JSON.stringify(uniqueData, null, 2));
    }
    async fetchAggregates(ticker, from, to) {
        const apiKey = process.env.POLYGON_API_KEY;
        if (!apiKey) {
            throw new Error('POLYGON_API_KEY is not set');
        }
        // 1. Load Cache
        let cachedData = this.loadCache(ticker);
        // 2. Check what we have
        if (cachedData.length > 0) {
            const cacheStart = cachedData[0].date;
            const cacheEnd = cachedData[cachedData.length - 1].date;
            const reqStart = new Date(from);
            const reqEnd = new Date(to);
            const cStart = new Date(cacheStart);
            const cEnd = new Date(cacheEnd);
            // If request is fully within cache, return cached slice
            if (reqStart >= cStart && reqEnd <= cEnd) {
                console.log(`[CACHE HIT] ${ticker}: ${from} to ${to}`);
                return cachedData.filter((d)=>{
                    const dDate = new Date(d.date);
                    return dDate >= reqStart && dDate <= reqEnd;
                });
            }
            // Identify missing ranges
            const promises = [];
            // Missing Head
            if (reqStart < cStart) {
                const headEnd = new Date(cStart);
                headEnd.setDate(headEnd.getDate() - 1);
                console.log(`[CACHE MISS HEAD] ${ticker}: ${from} to ${headEnd.toISOString().split('T')[0]}`);
                promises.push(this.fetchFromApi(ticker, from, headEnd.toISOString().split('T')[0]));
            }
            // Missing Tail
            if (reqEnd > cEnd) {
                const tailStart = new Date(cEnd);
                tailStart.setDate(tailStart.getDate() + 1);
                console.log(`[CACHE MISS TAIL] ${ticker}: ${tailStart.toISOString().split('T')[0]} to ${to}`);
                promises.push(this.fetchFromApi(ticker, tailStart.toISOString().split('T')[0], to));
            }
            if (promises.length > 0) {
                try {
                    const newSegments = await Promise.all(promises);
                    const allNewData = newSegments.flat();
                    cachedData = [
                        ...cachedData,
                        ...allNewData
                    ];
                    this.saveCache(ticker, cachedData);
                } catch (error) {
                    // If API fetch fails (e.g., Forbidden for old data), continue with cached data
                    console.warn(`Failed to fetch additional data for ${ticker}:`, error instanceof Error ? error.message : error);
                // Don't throw - use cached data we have
                }
            }
            // Return requested range from updated cache
            return cachedData.filter((d)=>{
                const dDate = new Date(d.date);
                return dDate >= reqStart && dDate <= reqEnd;
            });
        } else {
            // No cache - fetch from API
            console.log(`[CACHE EMPTY] ${ticker}: Fetching fresh data`);
            try {
                const data = await this.fetchFromApi(ticker, from, to);
                this.saveCache(ticker, data);
                return data;
            } catch (error) {
                console.error(`Failed to fetch data for ${ticker}:`, error instanceof Error ? error.message : error);
                return []; // Return empty array instead of throwing
            }
        }
    }
    async fetchFromApi(ticker, from, to) {
        const apiKey = process.env.POLYGON_API_KEY;
        // Polygon API errors if from > to (e.g. asking for a weekend gap or invalid range)
        if (new Date(from) > new Date(to)) {
            return [];
        }
        const url = `${BASE_URL}/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&limit=50000&apiKey=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
            // Handle 429 or other errors gracefully? For now throw.
            throw new Error(`Failed to fetch data for ${ticker}: ${response.statusText}`);
        }
        const data = await response.json();
        if (!data.results || data.results.length === 0) {
            return [];
        }
        return data.results.map((res)=>({
                date: new Date(res.t).toISOString().split('T')[0],
                open: res.o,
                high: res.h,
                low: res.l,
                close: res.c,
                volume: res.v
            }));
    }
}
}),
"[project]/WebstormProjects/alpalo-v2/src/lib/strategy/indicators.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Indicators",
    ()=>Indicators
]);
class Indicators {
    static simpleMovingAverage(data, period) {
        if (data.length < period) {
            return [];
        }
        const sma = [];
        for(let i = period - 1; i < data.length; i++){
            const sum = data.slice(i - period + 1, i + 1).reduce((acc, candle)=>acc + candle.close, 0);
            sma.push(sum / period);
        }
        return sma;
    }
    static rateOfChange(data, period) {
        if (data.length < period) {
            return [];
        }
        const roc = [];
        for(let i = period; i < data.length; i++){
            const current = data[i].close;
            const prev = data[i - period].close;
            roc.push((current - prev) / prev * 100);
        }
        return roc;
    }
}
}),
"[project]/WebstormProjects/alpalo-v2/src/lib/strategy/trendFollowingStrategy.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrendFollowingStrategy",
    ()=>TrendFollowingStrategy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$lib$2f$strategy$2f$indicators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/src/lib/strategy/indicators.ts [app-route] (ecmascript)");
;
class TrendFollowingStrategy {
    name = 'TrendFollowing';
    analyze(data) {
        if (data.length < 250) {
            return {
                symbol: 'TQQQ',
                action: 'HOLD',
                weight: 0,
                reason: 'Insufficient data'
            };
        }
        const ma250 = __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$lib$2f$strategy$2f$indicators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Indicators"].simpleMovingAverage(data, 250);
        const currentPrice = data[data.length - 1].close;
        const currentMA250 = ma250[ma250.length - 1];
        if (currentPrice > currentMA250) {
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight: 1.0,
                reason: `Price (${currentPrice.toFixed(2)}) > MA250 (${currentMA250.toFixed(2)})`
            };
        } else {
            return {
                symbol: 'SQQQ',
                action: 'BUY',
                weight: 1.0,
                reason: `Price (${currentPrice.toFixed(2)}) < MA250 (${currentMA250.toFixed(2)})`
            };
        }
    }
}
}),
"[project]/WebstormProjects/alpalo-v2/src/lib/strategy/meanReversionStrategy.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MeanReversionStrategy",
    ()=>MeanReversionStrategy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$lib$2f$strategy$2f$indicators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/src/lib/strategy/indicators.ts [app-route] (ecmascript)");
;
class MeanReversionStrategy {
    name = 'MeanReversion';
    analyze(data) {
        if (data.length < 20) {
            return {
                symbol: 'TQQQ',
                action: 'HOLD',
                weight: 0,
                reason: 'Insufficient data'
            };
        }
        const roc10 = __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$lib$2f$strategy$2f$indicators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Indicators"].rateOfChange(data, 10);
        const currentROC = roc10[roc10.length - 1];
        if (currentROC > 5) {
            return {
                symbol: 'SQQQ',
                action: 'BUY',
                weight: 0.5,
                reason: `ROC (${currentROC.toFixed(2)}) > 5, potential reversal`
            };
        } else if (currentROC < -5) {
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight: 0.5,
                reason: `ROC (${currentROC.toFixed(2)}) < -5, potential bounce`
            };
        }
        return {
            symbol: 'TQQQ',
            action: 'HOLD',
            weight: 0,
            reason: 'Neutral ROC'
        };
    }
}
}),
"[project]/WebstormProjects/alpalo-v2/src/lib/strategy/strategyController.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StrategyController",
    ()=>StrategyController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$lib$2f$strategy$2f$trendFollowingStrategy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/src/lib/strategy/trendFollowingStrategy.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$lib$2f$strategy$2f$meanReversionStrategy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/src/lib/strategy/meanReversionStrategy.ts [app-route] (ecmascript)");
;
;
class StrategyController {
    strategies = [];
    constructor(){
        this.strategies.push(new __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$lib$2f$strategy$2f$trendFollowingStrategy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TrendFollowingStrategy"]());
        this.strategies.push(new __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$lib$2f$strategy$2f$meanReversionStrategy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MeanReversionStrategy"]());
    }
    analyze(data) {
        const signals = this.strategies.map((s)=>s.analyze(data));
        const trendSignal = signals.find((s)=>s.symbol === 'TQQQ' || s.symbol === 'SQQQ');
        return trendSignal || {
            symbol: 'TQQQ',
            action: 'HOLD',
            weight: 0,
            reason: 'No signal'
        };
    }
}
}),
"[project]/WebstormProjects/alpalo-v2/src/lib/backtest/backtestEngine.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BacktestEngine",
    ()=>BacktestEngine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$lib$2f$strategy$2f$strategyController$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/src/lib/strategy/strategyController.ts [app-route] (ecmascript)");
;
class BacktestEngine {
    strategyController;
    initialCapital;
    constructor(initialCapital = 10000){
        this.strategyController = new __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$lib$2f$strategy$2f$strategyController$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StrategyController"]();
        this.initialCapital = initialCapital;
    }
    run(qqqData, tqqqData, sqqqData) {
        let cash = this.initialCapital;
        let shares = 0;
        let currentPosition = null;
        const trades = [];
        const equityCurve = [];
        // Benchmark tracking (NDX)
        const initialBenchmarkPrice = qqqData[0]?.close || 1;
        const benchmarkShares = this.initialCapital / initialBenchmarkPrice;
        // Benchmark tracking (TQQQ)
        // We need to align TQQQ data with NDX data dates
        const tqqqMap = new Map(tqqqData.map((d)=>[
                d.date,
                d
            ]));
        const sqqqMap = new Map(sqqqData.map((d)=>[
                d.date,
                d
            ]));
        const initialTQQQPrice = tqqqMap.get(qqqData[0]?.date)?.close || 1;
        const benchmarkTQQQShares = this.initialCapital / initialTQQQPrice;
        // Iterate over NDX data (the driver)
        for(let i = 250; i < qqqData.length; i++){
            const date = qqqData[i].date;
            const qqqSlice = qqqData.slice(0, i + 1);
            // Get current prices for tradeable assets
            const tqqqCandle = tqqqMap.get(date);
            const sqqqCandle = sqqqMap.get(date);
            if (!tqqqCandle || !sqqqCandle) continue; // Skip if missing data
            const signal = this.strategyController.analyze(qqqSlice);
            // Execute Signal
            if (signal.action === 'BUY') {
                const targetSymbol = signal.symbol; // TQQQ or SQQQ
                const targetPrice = targetSymbol === 'TQQQ' ? tqqqCandle.close : sqqqCandle.close;
                if (currentPosition && currentPosition.symbol !== targetSymbol) {
                    // Close current
                    const exitPrice = currentPosition.symbol === 'TQQQ' ? tqqqCandle.close : sqqqCandle.close;
                    currentPosition.exitDate = date;
                    currentPosition.exitPrice = exitPrice;
                    currentPosition.pnl = (currentPosition.exitPrice - currentPosition.entryPrice) * currentPosition.shares;
                    currentPosition.returnPct = (currentPosition.exitPrice - currentPosition.entryPrice) / currentPosition.entryPrice * 100;
                    currentPosition.portfolioReturnPct = currentPosition.returnPct * (currentPosition.positionSizePct || 0) / 100;
                    const entryTime = new Date(currentPosition.entryDate).getTime();
                    const exitTime = new Date(date).getTime();
                    currentPosition.daysHeld = Math.round((exitTime - entryTime) / (1000 * 60 * 60 * 24));
                    cash += currentPosition.exitPrice * currentPosition.shares;
                    trades.push(currentPosition);
                    currentPosition = null;
                    shares = 0;
                }
                if (!currentPosition) {
                    // Open new position
                    const totalEquityAtEntry = cash;
                    const amountToInvest = cash;
                    shares = Math.floor(amountToInvest / targetPrice);
                    const actualInvestment = shares * targetPrice;
                    cash -= actualInvestment;
                    // Calculate position size percentage
                    let positionSizePct = 100; // Default to 100%
                    if (totalEquityAtEntry > 0 && actualInvestment > 0) {
                        positionSizePct = actualInvestment / totalEquityAtEntry * 100;
                    }
                    currentPosition = {
                        entryDate: date,
                        symbol: targetSymbol,
                        side: 'LONG',
                        entryPrice: targetPrice,
                        shares: shares,
                        positionSizePct: positionSizePct
                    };
                }
            }
            // Calculate Equity
            let positionValue = 0;
            if (currentPosition) {
                const currentPrice = currentPosition.symbol === 'TQQQ' ? tqqqCandle.close : sqqqCandle.close;
                positionValue = currentPosition.shares * currentPrice;
            }
            const totalEquity = cash + positionValue;
            // Benchmark Equity (NDX)
            const benchmarkEquity = benchmarkShares * qqqData[i].close;
            // Benchmark Equity (TQQQ)
            const benchmarkTQQQEquity = benchmarkTQQQShares * tqqqCandle.close;
            // Normalize to Percentage Change
            const equityPct = (totalEquity - this.initialCapital) / this.initialCapital * 100;
            const benchmarkPct = (benchmarkEquity - this.initialCapital) / this.initialCapital * 100;
            const benchmarkTQQQPct = (benchmarkTQQQEquity - this.initialCapital) / this.initialCapital * 100;
            equityCurve.push({
                date,
                equity: equityPct,
                benchmark: benchmarkPct,
                benchmarkTQQQ: benchmarkTQQQPct
            });
        }
        // Close final position
        if (currentPosition) {
            const lastDate = qqqData[qqqData.length - 1].date;
            const tqqqLast = tqqqMap.get(lastDate);
            const sqqqLast = sqqqMap.get(lastDate);
            if (tqqqLast && sqqqLast) {
                const exitPrice = currentPosition.symbol === 'TQQQ' ? tqqqLast.close : sqqqLast.close;
                currentPosition.exitDate = lastDate;
                currentPosition.exitPrice = exitPrice;
                currentPosition.pnl = (currentPosition.exitPrice - currentPosition.entryPrice) * currentPosition.shares;
                currentPosition.returnPct = (currentPosition.exitPrice - currentPosition.entryPrice) / currentPosition.entryPrice * 100;
                currentPosition.portfolioReturnPct = currentPosition.returnPct * (currentPosition.positionSizePct || 0) / 100;
                const entryTime = new Date(currentPosition.entryDate).getTime();
                const exitTime = new Date(lastDate).getTime();
                currentPosition.daysHeld = Math.round((exitTime - entryTime) / (1000 * 60 * 60 * 24));
                trades.push(currentPosition);
            }
        }
        return {
            trades,
            equityCurve,
            metrics: this.calculateMetrics(equityCurve, trades)
        };
    }
    calculateMetrics(equityCurve, trades) {
        if (equityCurve.length === 0) {
            const empty = {
                totalReturn: 0,
                cagr: 0,
                maxDrawdown: 0,
                sharpeRatio: 0
            };
            return {
                ...empty,
                avgTrades: {
                    daily: 0,
                    monthly: 0,
                    annually: 0
                },
                winRate: {
                    wins: 0,
                    losses: 0,
                    winPct: 0
                },
                avgPositionSize: 0,
                benchmark: empty,
                benchmarkTQQQ: empty
            };
        }
        const strategyMetrics = this.getMetrics(equityCurve.map((d)=>({
                date: d.date,
                value: d.equity
            })));
        const benchmarkMetrics = this.getMetrics(equityCurve.map((d)=>({
                date: d.date,
                value: d.benchmark
            })));
        const benchmarkTQQQMetrics = this.getMetrics(equityCurve.map((d)=>({
                date: d.date,
                value: d.benchmarkTQQQ
            })));
        const totalDays = equityCurve.length;
        const years = totalDays / 252;
        const months = years * 12;
        const avgTrades = {
            daily: totalDays > 0 ? trades.length / totalDays : 0,
            monthly: months > 0 ? trades.length / months : 0,
            annually: years > 0 ? trades.length / years : 0
        };
        // Calculate win/loss stats
        const wins = trades.filter((t)=>(t.returnPct || 0) > 0).length;
        const losses = trades.filter((t)=>(t.returnPct || 0) < 0).length;
        const winRate = {
            wins,
            losses,
            winPct: trades.length > 0 ? wins / trades.length * 100 : 0
        };
        // Calculate average position size
        const avgPositionSize = trades.length > 0 ? trades.reduce((sum, t)=>sum + (t.positionSizePct || 0), 0) / trades.length : 0;
        return {
            ...strategyMetrics,
            avgTrades,
            winRate,
            avgPositionSize,
            benchmark: benchmarkMetrics,
            benchmarkTQQQ: benchmarkTQQQMetrics
        };
    }
    getMetrics(data) {
        if (data.length === 0) return {
            totalReturn: 0,
            cagr: 0,
            maxDrawdown: 0,
            sharpeRatio: 0
        };
        // Data is in percentage change (e.g., 0, 5.5, -2.1)
        // Convert back to absolute multiplier for CAGR calculation
        const startVal = 1 + data[0].value / 100;
        const endVal = 1 + data[data.length - 1].value / 100;
        const totalReturn = (endVal - startVal) / startVal;
        const years = data.length / 252;
        const cagr = years > 0 ? Math.pow(endVal / startVal, 1 / years) - 1 : 0;
        let maxPeak = -Infinity;
        let maxDd = 0;
        // Drawdown calculation
        for (const point of data){
            const currentEquity = 100 * (1 + point.value / 100);
            if (currentEquity > maxPeak) maxPeak = currentEquity;
            const dd = (maxPeak - currentEquity) / maxPeak;
            if (dd > maxDd) maxDd = dd;
        }
        return {
            totalReturn: totalReturn * 100,
            cagr: cagr * 100,
            maxDrawdown: maxDd * 100,
            sharpeRatio: 0
        };
    }
}
}),
"[project]/WebstormProjects/alpalo-v2/src/app/api/backtest/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$lib$2f$polygon$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/src/lib/polygon/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$lib$2f$backtest$2f$backtestEngine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebstormProjects/alpalo-v2/src/lib/backtest/backtestEngine.ts [app-route] (ecmascript)");
;
;
;
async function POST(request) {
    try {
        const { from, to } = await request.json();
        if (!from || !to) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Missing from or to date'
            }, {
                status: 400
            });
        }
        const client = new __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$lib$2f$polygon$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PolygonClient"]();
        // Fetch data concurrently
        const [tqqqData, sqqqData, qqqData] = await Promise.all([
            client.fetchAggregates('TQQQ', from, to),
            client.fetchAggregates('SQQQ', from, to),
            client.fetchAggregates('QQQ', from, to)
        ]);
        if (tqqqData.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'No data available for TQQQ'
            }, {
                status: 404
            });
        }
        // Run backtest
        const engine = new __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$src$2f$lib$2f$backtest$2f$backtestEngine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BacktestEngine"](10000);
        const result = engine.run(qqqData, tqqqData, sqqqData);
        return __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
    } catch (error) {
        console.error('Backtest error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return __TURBOPACK__imported__module__$5b$project$5d2f$WebstormProjects$2f$alpalo$2d$v2$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: errorMessage
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4df23988._.js.map