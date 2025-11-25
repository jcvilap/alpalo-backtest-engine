import fs from 'fs';
import path from 'path';
import { parseISO, isWeekend } from 'date-fns';

const cacheDir = path.join(process.cwd(), 'cache');

function checkFile(filename: string) {
    console.log(`\nChecking ${filename}...`);
    const filePath = path.join(cacheDir, filename);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const weekendDates = [];
    for (const d of data) {
        if (isWeekend(parseISO(d.date))) {
            weekendDates.push(d);
        }
    }

    if (weekendDates.length > 0) {
        console.log(`Found ${weekendDates.length} weekend dates.`);
        weekendDates.forEach(d => console.log(`  ${d.date}: Close ${d.close}`));
    } else {
        console.log('No weekend dates found.');
    }
}

checkFile('TQQQ.json');
checkFile('QQQ.json');
checkFile('SQQQ.json');
