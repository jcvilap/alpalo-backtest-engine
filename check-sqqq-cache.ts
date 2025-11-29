import 'dotenv/config';
import { createClient } from 'redis';

async function checkCache() {
    const redis = createClient({ url: process.env.REDIS_URL });
    await redis.connect();

    const key = 'ohlc:SQQQ';
    const data = await redis.get(key);

    if (data) {
        const ohlc = JSON.parse(data);
        const last = ohlc[ohlc.length - 1];
        console.log(`SQQQ Cache Length: ${ohlc.length}`);
        console.log(`Last Cached Date: ${last.date}`);

        // Check for specific dates
        const nov27 = ohlc.find((d: any) => d.date === '2025-11-27');
        const nov28 = ohlc.find((d: any) => d.date === '2025-11-28');

        console.log('Entry for 2025-11-27 (Holiday):', nov27 || 'None');
        console.log('Entry for 2025-11-28 (Trading Day):', nov28 || 'None');
    } else {
        console.log('SQQQ Cache NOT found.');
    }

    await redis.quit();
}

checkCache();
