import { PolygonClient } from '../src/lib/polygon/client';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function prefetch() {
    console.log('Starting data prefetch...');

    const apiKey = process.env.POLYGON_API_KEY;
    if (!apiKey) {
        console.error('Error: POLYGON_API_KEY not found');
        process.exit(1);
    }

    const client = new PolygonClient();
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = '2015-01-01';

    console.log(`Fetching from ${startDate} to ${endDate}...`);

    // Fetch QQQ, TQQQ, and SQQQ
    const symbols = ['QQQ', 'TQQQ', 'SQQQ'];

    for (const symbol of symbols) {
        console.log(`Fetching ${symbol}...`);
        const data = await client.fetchAggregates(symbol, startDate, endDate);
        console.log(`✓ ${symbol}: ${data.length} records`);
    }

    console.log('Prefetch complete.');
}

prefetch();
