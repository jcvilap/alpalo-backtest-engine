import 'dotenv/config';
import { PolygonClient } from './src/lib/polygon/client';
import { getNYNow, formatNYDate } from './src/lib/utils/dateUtils';

async function debugSave() {
    const client = new PolygonClient();
    const now = getNYNow();
    const todayStr = formatNYDate(now);
    const minutes = now.getHours() * 60 + now.getMinutes();
    const marketCloseMinutes = 16 * 60;

    console.log('Current NY Time:', now.toString());
    console.log('Today String:', todayStr);
    console.log('Current Minutes:', minutes);
    console.log('Market Close Minutes:', marketCloseMinutes);
    console.log('Is After Close:', minutes >= marketCloseMinutes);

    // Simulate fetchAggregates logic
    const ticker = 'SQQQ';
    const from = '2025-11-27';
    const to = '2025-11-28';

    console.log(`\nFetching ${ticker} from ${from} to ${to}...`);
    const data = await client.fetchAggregates(ticker, from, to);

    console.log(`Fetched ${data.length} records.`);
    if (data.length > 0) {
        console.log('Last record:', data[data.length - 1]);
    }

    // Check if it's in cache now
    // We can't easily check cache via client private methods, but we can infer from the fetch logs
    // or run the check script again.
}

debugSave();
