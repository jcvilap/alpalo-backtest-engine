import { PolygonClient } from './src/lib/polygon/client';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function testCache() {
    const client = new PolygonClient();

    console.log('Testing NDX data from 2000...');
    const data = await client.fetchAggregates('I:NDX', '2000-01-03', '2000-01-31');
    console.log(`Got ${data.length} records`);
    if (data.length > 0) {
        console.log('First:', data[0]);
        console.log('Last:', data[data.length - 1]);
    }
}

testCache();
