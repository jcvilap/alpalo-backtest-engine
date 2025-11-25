import { NextResponse } from 'next/server';
import { PolygonClient } from '@/lib/polygon/client';
import { BacktestEngine } from '@/lib/backtest/backtestEngine';
import { fetchBacktestData } from '@/lib/backtest/dataFetcher';

export async function POST(request: Request) {
    try {
        const { from, to, displayFrom } = await request.json();

        console.log('[BACKTEST API] Request params:', { from, to, displayFrom });

        if (!from || !to) {
            return NextResponse.json({ error: 'Missing from or to date' }, { status: 400 });
        }

        const client = new PolygonClient();

        // Fetch data using shared utility
        const { qqqData, tqqqData, sqqqData } = await fetchBacktestData(client, from, to);

        console.log('[BACKTEST API] Data fetched:', {
            qqqCount: qqqData.length,
            tqqqCount: tqqqData.length,
            sqqqCount: sqqqData.length,
            qqqDateRange: qqqData.length > 0 ? { first: qqqData[0].date, last: qqqData[qqqData.length - 1].date } : null,
            tqqqDateRange: tqqqData.length > 0 ? { first: tqqqData[0].date, last: tqqqData[tqqqData.length - 1].date } : null
        });

        if (tqqqData.length === 0) {
            return NextResponse.json({ error: 'No data available for TQQQ' }, { status: 404 });
        }

        // Run backtest
        const capital = 1_000_000;
        console.log('[BACKTEST API] Running backtest with capital:', capital);

        const engine = new BacktestEngine(capital);
        const result = engine.run(qqqData, tqqqData, sqqqData, displayFrom);

        console.log('[BACKTEST API] Backtest complete:', {
            totalReturn: result.metrics.totalReturn.toFixed(2),
            cagr: result.metrics.cagr.toFixed(2),
            maxDrawdown: result.metrics.maxDrawdown.toFixed(2),
            totalTrades: result.trades.length,
            equityCurveLength: result.equityCurve.length
        });

        return NextResponse.json(result);

    } catch (error: unknown) {
        console.error('Backtest error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
