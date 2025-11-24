import { format, toZonedTime } from 'date-fns-tz';
import { startOfDay, subMonths, subYears, subDays, isWeekend } from 'date-fns';

const NY_TIMEZONE = 'America/New_York';

/**
 * Converts a date to New York time.
 * If input is a string, it parses it.
 * If input is a Date, it converts it to the NY timezone.
 */
export function toNYDate(date: Date | string | number): Date {
    return toZonedTime(date, NY_TIMEZONE);
}

/**
 * Returns the current date/time in New York.
 */
export function getNYNow(): Date {
    // Compute current time in New York timezone and return the start of that day.
    const nyNow = toZonedTime(new Date(), NY_TIMEZONE);
    return startOfDay(nyNow);
}

/**
 * Formats a date in New York time.
 * Default format is YYYY-MM-DD.
 */
export function formatNYDate(date: Date | string | number, formatStr: string = 'yyyy-MM-dd'): string {
    const nyDate = toNYDate(date);
    return format(nyDate, formatStr, { timeZone: NY_TIMEZONE });
}

/**
 * Returns the start of the day in New York time for the given date.
 */
export function startOfNYDay(date: Date | string | number): Date {
    const nyDate = toNYDate(date);
    return startOfDay(nyDate);
}

/**
 * Returns the most recent trading day (Monday-Friday) relative to the given date (or today in NY).
 * If the date is a weekend, returns the previous Friday.
 */
export function getMostRecentTradingDay(date?: Date): Date {
    let d = date ? toNYDate(date) : getNYNow();

    // If it's Saturday (6) or Sunday (0), go back to Friday
    while (isWeekend(d)) {
        d = subDays(d, 1);
    }
    return startOfNYDay(d);
}

/**
 * Calculates a date range ending at `anchorDate` (defaulting to today in NY).
 * Returns strings in YYYY-MM-DD format.
 */
export function getDateRange(range: string, anchorDate?: Date): { startDate: string; endDate: string } {
    // Ensure the end date is anchored to the start of the New York day for consistency.
    const end = anchorDate ? toNYDate(anchorDate) : getNYNow();
    const endNYDay = startOfNYDay(end);
    let start = endNYDay;

    switch (range) {
        case '1M':
            start = subMonths(end, 1);
            break;
        case '2M':
            start = subMonths(end, 2);
            break;
        case '3M':
            start = subMonths(end, 3);
            break;
        case '4M':
            start = subMonths(end, 4);
            break;
        case '5M':
            start = subMonths(end, 5);
            break;
        case '6M':
            start = subMonths(end, 6);
            break;
        case 'YTD':
            start = new Date(end.getFullYear(), 0, 1); // Jan 1st of current year
            break;
        case '1YR':
            start = subYears(end, 1);
            break;
        case '2YR':
            start = subYears(end, 2);
            break;
        case '3YR':
            start = subYears(end, 3);
            break;
        case '4YR':
            start = subYears(end, 4);
            break;
        case '5YR':
            start = subYears(end, 5);
            break;
        case '7YR':
            start = subYears(end, 7);
            break;
        case '10YR':
            start = subYears(end, 10);
            break;
        case '12YR':
            start = subYears(end, 12);
            break;
        case '15YR':
            start = subYears(end, 15);
            break;
        case '20YR':
            start = subYears(end, 20);
            break;
        case 'ALL':
            start = new Date(1999, 2, 10); // March 10, 1999 - earliest cached data
            break;
        // Legacy support
        case '1Y':
            start = subYears(end, 1);
            break;
        case '3Y':
            start = subYears(end, 3);
            break;
        case '5Y':
            start = subYears(end, 5);
            break;
        case 'MAX':
            start = new Date(1999, 2, 10); // March 10, 1999
            break;
        default:
            start = subYears(end, 1); // Default to 1Y
    }

    return {
        startDate: formatNYDate(start, 'yyyy-MM-dd'),
        // Use the anchored NY day for the end date as well.
        endDate: formatNYDate(endNYDay, 'yyyy-MM-dd')
    };
}

export const DATE_RANGE_OPTIONS = ['1M', '2M', '3M', '4M', '5M', '6M', 'YTD', '1YR', '2YR', '3YR', '4YR', '5YR', '7YR', '10YR', '12YR', '15YR', '20YR', 'ALL'] as const;
export type DateRangeKey = typeof DATE_RANGE_OPTIONS[number];
