import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { OHLC } from '@/lib/types';

export async function GET() {
    try {
        const cacheDir = path.join(process.cwd(), 'cache');
        if (!fs.existsSync(cacheDir)) {
            const today = new Date().toISOString().split('T')[0];
            return NextResponse.json({ oldestDate: '2020-01-01', newestDate: today }); // Default fallback
        }

        const files = fs.readdirSync(cacheDir).filter(f => f.endsWith('.json'));
        let oldestDate = new Date().toISOString().split('T')[0];
        let newestDate = '1900-01-01';

        for (const file of files) {
            const content = fs.readFileSync(path.join(cacheDir, file), 'utf-8');
            const data: OHLC[] = JSON.parse(content);
            if (data.length > 0) {
                const firstDate = data[0].date;
                const lastDate = data[data.length - 1].date;

                if (firstDate < oldestDate) {
                    oldestDate = firstDate;
                }

                if (lastDate > newestDate) {
                    newestDate = lastDate;
                }
            }
        }

        // If no data was found, fall back to sensible defaults
        if (newestDate === '1900-01-01') {
            newestDate = new Date().toISOString().split('T')[0];
        }

        return NextResponse.json({ oldestDate, newestDate });
    } catch (error) {
        console.error('Error reading cache for date range:', error);
        const today = new Date().toISOString().split('T')[0];
        return NextResponse.json({ oldestDate: '2020-01-01', newestDate: today });
    }
}
