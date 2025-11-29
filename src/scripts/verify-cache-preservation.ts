#!/usr/bin/env tsx

import 'dotenv/config';
import { createClient } from 'redis';

async function verifyPreservation() {
    const redis = createClient({ url: process.env.REDIS_URL });
    await redis.connect();

    try {
        const ticker = 'QQQ';
        const key = `ohlc:${ticker}`;

        // 1. Check initial count
        const initialDataStr = await redis.get(key);
        const initialData = initialDataStr ? JSON.parse(initialDataStr) : [];
        console.log(`Initial ${ticker} count: ${initialData.length}`);

        if (initialData.length === 0) {
            console.error('No initial data found. Please migrate cache first.');
            process.exit(1);
        }

        // 2. Run populate-cache (simulated by calling the script via exec, or we can trust the user will run it)
        // For this script, we'll just check the count. The user can run populate-cache separately or we can run it here.
        // Let's run it here.
        console.log('Running pnpm populate-cache...');
        const { execSync } = await import('child_process');
        try {
            execSync('pnpm populate-cache', { stdio: 'inherit' });
        } catch (e) {
            console.error('populate-cache failed', e);
            process.exit(1);
        }

        // 3. Check final count
        const finalDataStr = await redis.get(key);
        const finalData = finalDataStr ? JSON.parse(finalDataStr) : [];
        console.log(`Final ${ticker} count: ${finalData.length}`);

        if (finalData.length < initialData.length) {
            console.error(`❌ FAILURE: Data was lost! ${initialData.length} -> ${finalData.length}`);
            process.exit(1);
        } else {
            console.log(`✅ SUCCESS: Data preserved/added. ${initialData.length} -> ${finalData.length}`);
        }

    } finally {
        await redis.disconnect();
    }
}

verifyPreservation();
