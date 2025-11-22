import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { OHLC } from '@/lib/types';

export async function GET() {
    try {
        const cacheDir = path.join(process.cwd(), 'cache');
        if (!fs.existsSync(cacheDir)) {
            return NextResponse.json({ oldestDate: '2020-01-01' }); // Default fallback
        }

        const files = fs.readdirSync(cacheDir).filter(f => f.endsWith('.json'));
        let oldestDate = new Date().toISOString().split('T')[0];

        for (const file of files) {
            const content = fs.readFileSync(path.join(cacheDir, file), 'utf-8');
            const data: OHLC[] = JSON.parse(content);
            if (data.length > 0) {
                const firstDate = data[0].date;
                if (firstDate < oldestDate) {
                    oldestDate = firstDate;
                }
            }
        }

        return NextResponse.json({ oldestDate });
    } catch (error) {
        console.error('Error reading cache for date range:', error);
        return NextResponse.json({ oldestDate: '2020-01-01' });
    }
}
