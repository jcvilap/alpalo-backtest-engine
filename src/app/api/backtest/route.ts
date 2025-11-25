import { NextResponse } from 'next/server';
import { PolygonClient } from '@/lib/polygon/client';
import { BacktestEngine } from '@/lib/backtest/backtestEngine';
import { fetchBacktestData } from '@/lib/backtest/dataFetcher';

export async function POST(request: Request) {
    try {
        const { from, to, displayFrom } = await request.json();

        if (!from || !to) {
            return NextResponse.json({ error: 'Missing from or to date' }, { status: 400 });
        }

        const client = new PolygonClient();

        // Fetch data using shared utility
        const { qqqData, tqqqData, sqqqData } = await fetchBacktestData(client, from, to);

        if (tqqqData.length === 0) {
            return NextResponse.json({ error: 'No data available for TQQQ' }, { status: 404 });
        }

        // Run backtest
        const engine = new BacktestEngine(1_000_000);
        const result = engine.run(qqqData, tqqqData, sqqqData, displayFrom);

        return NextResponse.json(result);

    } catch (error: unknown) {
        console.error('Backtest error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
