import { createClient } from 'redis';
// Load environment variables
import 'dotenv/config';

async function testRedis() {
    console.log('Starting Redis connection test...');
    console.log('REDIS_URL configured:', !!process.env.REDIS_URL);

    if (!process.env.REDIS_URL) {
        console.error('ERROR: REDIS_URL environment variable not set');
        process.exit(1);
    }

    const redis = createClient({ url: process.env.REDIS_URL });

    redis.on('connect', () => console.log('[REDIS] Connected successfully'));
    redis.on('error', (err) => console.error('[REDIS] Connection error:', err.message));

    await redis.connect();

    try {
        // Test 1: Write a simple value
        console.log('\n--- Test 1: Simple key-value write ---');
        await redis.set('test:simple', 'Hello Redis!');
        console.log('✓ Successfully wrote simple value');

        // Test 2: Read the simple value
        console.log('\n--- Test 2: Simple key-value read ---');
        const simpleValue = await redis.get('test:simple');
        console.log('✓ Read value:', simpleValue);

        // Test 3: Write OHLC data (similar to what PolygonClient does)
        console.log('\n--- Test 3: Write OHLC array ---');
        const mockOHLC = [
            { date: '2024-01-01', open: 100, high: 105, low: 99, close: 103 },
            { date: '2024-01-02', open: 103, high: 108, low: 102, close: 107 },
            { date: '2024-01-03', open: 107, high: 110, low: 106, close: 109 },
        ];
        await redis.set('ohlc:TEST', JSON.stringify(mockOHLC));
        console.log('✓ Successfully wrote OHLC data');

        // Test 4: Read OHLC data
        console.log('\n--- Test 4: Read OHLC array ---');
        const cachedOHLC = await redis.get('ohlc:TEST');
        if (cachedOHLC) {
            const parsed = JSON.parse(cachedOHLC);
            console.log('✓ Successfully read OHLC data:');
            console.log(`  - Records: ${parsed.length}`);
            console.log(`  - First record:`, parsed[0]);
            console.log(`  - Last record:`, parsed[parsed.length - 1]);
        }

        // Test 5: Write market calendar data
        console.log('\n--- Test 5: Write market calendar ---');
        const mockCalendar = {
            year: 2024,
            fetchedAt: new Date().toISOString(),
            holidaysArray: ['2024-01-01', '2024-07-04', '2024-12-25'],
            tradingDaysArray: ['2024-01-02', '2024-01-03', '2024-01-04'],
        };
        await redis.set('market-calendar-2024', JSON.stringify(mockCalendar));
        console.log('✓ Successfully wrote calendar data');

        // Test 6: Read market calendar data
        console.log('\n--- Test 6: Read market calendar ---');
        const cachedCalendar = await redis.get('market-calendar-2024');
        if (cachedCalendar) {
            const parsed = JSON.parse(cachedCalendar);
            console.log('✓ Successfully read calendar data:');
            console.log(`  - Year: ${parsed.year}`);
            console.log(`  - Holidays: ${parsed.holidaysArray.length}`);
            console.log(`  - Trading days: ${parsed.tradingDaysArray.length}`);
        }

        // Test 7: List all keys
        console.log('\n--- Test 7: List all test keys ---');
        const keys = await redis.keys('test:*');
        console.log('✓ Found keys:', keys);

        // Cleanup
        console.log('\n--- Cleanup ---');
        await redis.del(['test:simple', 'ohlc:TEST', 'market-calendar-2024']);
        console.log('✓ Cleaned up test keys');

        console.log('\n✅ All Redis tests passed successfully!');
    } catch (error) {
        console.error('\n❌ Redis test failed:', error);
        process.exit(1);
    } finally {
        await redis.disconnect();
        console.log('\n[REDIS] Connection closed');
    }
}

testRedis();
