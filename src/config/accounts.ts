/**
 * Multi-Account Configuration
 *
 * This module handles the configuration for multiple Alpaca accounts.
 * It supports reading from a JSON-based environment variable (TRADING_ACCOUNTS_CONFIG)
 * or falling back to legacy single-account environment variables.
 */

import { TradingMode, getTradingMode } from './env';

/**
 * Configuration for a single trading account
 */
export interface AccountConfig {
    /** Unique identifier for the account (e.g., "PAPER_1", "LIVE_MAIN") */
    id: string;

    /** Trading mode for this account */
    mode: TradingMode;

    /** Alpaca API credentials */
    alpaca: {
        keyId: string;
        secretKey: string;
    };

    /** Safety and behavior settings */
    settings: {
        /** Maximum equity to allocate to this strategy (in dollars) */
        maxEquity: number;

        /** Whether short selling is allowed */
        allowShorting: boolean;

        /** Whether to run in dry-run mode (no actual orders placed) */
        isDryRun: boolean;
    };
}

/**
 * Get all configured trading accounts
 *
 * Priority:
 * 1. TRADING_ACCOUNTS_CONFIG environment variable (JSON array)
 * 2. Legacy environment variables (PAPER_ALPACA_KEY_ID, etc.)
 *
 * @returns Array of validated account configurations
 * @throws Error if no valid configuration is found
 */
export function getConfiguredAccounts(): AccountConfig[] {
    // 1. Try to parse JSON config from env var
    const jsonConfig = process.env.TRADING_ACCOUNTS_CONFIG;
    if (jsonConfig) {
        try {
            const accounts = JSON.parse(jsonConfig) as AccountConfig[];
            if (Array.isArray(accounts) && accounts.length > 0) {
                validateAccounts(accounts);
                return accounts;
            }
        } catch (error) {
            // @ts-expect-error
            console.warn(`Failed to parse TRADING_ACCOUNTS_CONFIG: ${error.message}`);
        }
    }

    // 2. Fallback to legacy single-account config
    console.log('Using legacy environment variables for account configuration');
    return [getLegacyAccountConfig()];
}

/**
 * Create an account config from legacy environment variables
 */
function getLegacyAccountConfig(): AccountConfig {
    const mode = getTradingMode();
    const isPaper = mode !== TradingMode.LIVE;

    // Determine keys based on mode
    const keyId = isPaper ? process.env.PAPER_ALPACA_KEY_ID : process.env.LIVE_ALPACA_KEY_ID;
    const secretKey = isPaper ? process.env.PAPER_ALPACA_SECRET_KEY : process.env.LIVE_ALPACA_SECRET_KEY;

    if (!keyId || !secretKey) {
        throw new Error(`Missing Alpaca credentials for ${mode} mode. Please set ${isPaper ? 'PAPER' : 'LIVE'}_ALPACA_KEY_ID and _SECRET_KEY.`);
    }

    return {
        id: `DEFAULT_${mode}`,
        mode: mode,
        alpaca: {
            keyId,
            secretKey
        },
        settings: {
            // Default settings for legacy mode
            maxEquity: 100_000, // Default cap
            allowShorting: true, // Default to allowing shorting
            isDryRun: false
        }
    };
}

/**
 * Validate a list of account configurations
 */
function validateAccounts(accounts: AccountConfig[]): void {
    const ids = new Set<string>();

    for (const account of accounts) {
        // Check for duplicate IDs
        if (ids.has(account.id)) {
            throw new Error(`Duplicate account ID found: ${account.id}`);
        }
        ids.add(account.id);

        // Validate required fields
        if (!account.id) throw new Error('Account ID is required');
        if (!account.mode) throw new Error(`Account ${account.id}: Mode is required`);
        if (!account.alpaca?.keyId) throw new Error(`Account ${account.id}: Alpaca Key ID is required`);
        if (!account.alpaca?.secretKey) throw new Error(`Account ${account.id}: Alpaca Secret Key is required`);

        // Safety check for LIVE accounts
        if (account.mode === TradingMode.LIVE) {
            if (account.settings.isDryRun === undefined) {
                console.warn(`Account ${account.id} (LIVE): isDryRun not specified, defaulting to TRUE for safety`);
                account.settings.isDryRun = true;
            }
        }
    }
}
