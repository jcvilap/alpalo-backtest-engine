/**
 * Market Schedule Utilities
 *
 * Functions to check market status and timing using Alpaca's Clock API.
 * These utilities ensure trading operations only execute during appropriate
 * market hours.
 *
 * The strategy typically trades at Market-On-Close (MOC), so we need to:
 * 1. Verify the market is open
 * 2. Check we're close enough to market close (within ~20 minutes)
 */

import { AlpacaClient } from '../../live/alpacaClient';

/**
 * Market status information
 */
export interface MarketStatus {
    /** Whether market is currently open */
    isOpen: boolean;
    /** Time until market closes (in minutes), null if market is closed */
    minutesToClose: number | null;
    /** Next market open time (ISO string) */
    nextOpen: string;
    /** Next market close time (ISO string) */
    nextClose: string;
    /** Current timestamp (ISO string) */
    timestamp: string;
}

/**
 * Check if the market is currently open
 *
 * @param alpacaClient - Alpaca client instance
 * @returns True if market is open, false otherwise
 */
export async function isMarketOpen(alpacaClient: AlpacaClient): Promise<boolean> {
    const clock = await alpacaClient.getClock();
    return clock.is_open;
}

/**
 * Get time remaining until market close (in minutes)
 *
 * @param alpacaClient - Alpaca client instance
 * @returns Minutes until close, or null if market is closed
 */
export async function getTimeToClose(alpacaClient: AlpacaClient): Promise<number | null> {
    const clock = await alpacaClient.getClock();

    if (!clock.is_open) {
        return null;
    }

    const now = new Date(clock.timestamp);
    const close = new Date(clock.next_close);
    const msToClose = close.getTime() - now.getTime();
    const minutesToClose = Math.floor(msToClose / (1000 * 60));

    return minutesToClose;
}

/**
 * Get comprehensive market status
 *
 * @param alpacaClient - Alpaca client instance
 * @returns Market status with timing information
 */
export async function getMarketStatus(alpacaClient: AlpacaClient): Promise<MarketStatus> {
    const clock = await alpacaClient.getClock();

    let minutesToClose: number | null = null;
    if (clock.is_open) {
        const now = new Date(clock.timestamp);
        const close = new Date(clock.next_close);
        const msToClose = close.getTime() - now.getTime();
        minutesToClose = Math.floor(msToClose / (1000 * 60));
    }

    return {
        isOpen: clock.is_open,
        minutesToClose,
        nextOpen: clock.next_open,
        nextClose: clock.next_close,
        timestamp: clock.timestamp
    };
}

/**
 * Check if it's an appropriate time to execute MOC (Market-On-Close) orders
 *
 * MOC orders typically need to be submitted within a specific window before
 * market close. For safety, we check if:
 * - Market is open
 * - We're within the acceptable time window (typically 15-30 minutes before close)
 *
 * @param alpacaClient - Alpaca client instance
 * @param maxMinutesBeforeClose - Maximum minutes before close (default 30)
 * @param minMinutesBeforeClose - Minimum minutes before close (default 5)
 * @returns True if it's an appropriate time for MOC orders
 */
export async function isAppropriateForMOC(
    alpacaClient: AlpacaClient,
    maxMinutesBeforeClose: number = 30,
    minMinutesBeforeClose: number = 5
): Promise<{ appropriate: boolean; reason?: string; minutesToClose?: number }> {
    const status = await getMarketStatus(alpacaClient);

    if (!status.isOpen) {
        return {
            appropriate: false,
            reason: 'Market is closed'
        };
    }

    if (status.minutesToClose === null) {
        return {
            appropriate: false,
            reason: 'Unable to determine time to close'
        };
    }

    if (status.minutesToClose > maxMinutesBeforeClose) {
        return {
            appropriate: false,
            reason: `Too early - ${status.minutesToClose} minutes until close (max ${maxMinutesBeforeClose})`,
            minutesToClose: status.minutesToClose
        };
    }

    if (status.minutesToClose < minMinutesBeforeClose) {
        return {
            appropriate: false,
            reason: `Too late - only ${status.minutesToClose} minutes until close (min ${minMinutesBeforeClose})`,
            minutesToClose: status.minutesToClose
        };
    }

    return {
        appropriate: true,
        minutesToClose: status.minutesToClose
    };
}

/**
 * Format a duration in minutes to a human-readable string
 *
 * @param minutes - Number of minutes
 * @returns Formatted string (e.g., "1h 30m", "45m")
 */
export function formatMinutes(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
}
