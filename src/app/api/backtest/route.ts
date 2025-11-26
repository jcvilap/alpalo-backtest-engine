import { NextResponse } from 'next/server';
import { PolygonClient } from '@/lib/polygon/client';
import { fetchBacktestData } from '@/lib/backtest/dataFetcher';
import { BacktestDataFeed } from '@/backtest/BacktestDataFeed';
import { BacktestBroker } from '@/backtest/BacktestBroker';
import { BacktestRunner } from '@/backtest/BacktestRunner';
import { createDefaultStrategyParams } from '@/strategy/engine';

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

        const capital = 1_000_000;
        console.log('[BACKTEST API] Running backtest with capital:', capital);

        const dataFeed = new BacktestDataFeed(qqqData, tqqqData, sqqqData);
        const broker = new BacktestBroker(capital);
        const params = createDefaultStrategyParams();
        const runner = new BacktestRunner(dataFeed, broker, params);

        const { firstDate, lastDate } = dataFeed.getAvailableDateRange();

        const result = await runner.run({
            startDate: firstDate,
            endDate: lastDate,
            initialCapital: capital,
            displayFrom
        });

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
