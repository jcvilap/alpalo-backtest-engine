/**
 * Utility functions for calculating predefined date ranges
 */

export type DateRangeKey = '1M' | '2M' | '3M' | '4M' | '5M' | '6M' | 'YTD' | '1YR' | '2YR' | '3YR' | '4YR' | '5YR' | '10YR';

export interface DateRange {
    startDate: string;
    endDate: string;
}

/**
 * Calculate the start date for a given date range
 * @param range - The date range key (e.g., '1M', 'YTD', '1YR')
 * @param referenceDate - The reference date (defaults to today)
 * @returns ISO date string (YYYY-MM-DD)
 */
export function getStartDateForRange(range: DateRangeKey, referenceDate: Date = new Date()): string {
    const date = new Date(referenceDate);

    switch (range) {
        case '1M':
            date.setMonth(date.getMonth() - 1);
            break;
        case '2M':
            date.setMonth(date.getMonth() - 2);
            break;
        case '3M':
            date.setMonth(date.getMonth() - 3);
            break;
        case '4M':
            date.setMonth(date.getMonth() - 4);
            break;
        case '5M':
            date.setMonth(date.getMonth() - 5);
            break;
        case '6M':
            date.setMonth(date.getMonth() - 6);
            break;
        case 'YTD':
            // Year to date - January 1st of current year
            date.setMonth(0);
            date.setDate(1);
            break;
        case '1YR':
            date.setFullYear(date.getFullYear() - 1);
            break;
        case '2YR':
            date.setFullYear(date.getFullYear() - 2);
            break;
        case '3YR':
            date.setFullYear(date.getFullYear() - 3);
            break;
        case '4YR':
            date.setFullYear(date.getFullYear() - 4);
            break;
        case '5YR':
            date.setFullYear(date.getFullYear() - 5);
            break;
        case '10YR':
            date.setFullYear(date.getFullYear() - 10);
            break;
    }

    return date.toISOString().split('T')[0];
}

/**
 * Get a complete date range object
 * @param range - The date range key
 * @param referenceDate - The reference date (defaults to today)
 * @returns Object with startDate and endDate
 */
export function getDateRange(range: DateRangeKey, referenceDate: Date = new Date()): DateRange {
    const endDate = referenceDate.toISOString().split('T')[0];
    const startDate = getStartDateForRange(range, referenceDate);

    return { startDate, endDate };
}

/**
 * All available date range options
 */
export const DATE_RANGE_OPTIONS: DateRangeKey[] = [
    '1M', '2M', '3M', '4M', '5M', '6M',
    'YTD',
    '1YR', '2YR', '3YR', '4YR', '5YR', '10YR'
];
