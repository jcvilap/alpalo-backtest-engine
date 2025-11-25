import fs from 'fs';
import path from 'path';
import { parseISO, isWeekend } from 'date-fns';

const cacheDir = path.join(process.cwd(), 'cache');

function fixFile(filename: string) {
    console.log(`\nFixing ${filename}...`);
    const filePath = path.join(cacheDir, filename);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const cleanData = data.filter((d: any) => !isWeekend(parseISO(d.date)));

    if (cleanData.length < data.length) {
        console.log(`Removed ${data.length - cleanData.length} weekend entries.`);
        fs.writeFileSync(filePath, JSON.stringify(cleanData, null, 2));
        console.log(`Saved ${filename}.`);
    } else {
        console.log('No changes needed.');
    }
}

fixFile('TQQQ.json');
fixFile('QQQ.json');
fixFile('SQQQ.json');
