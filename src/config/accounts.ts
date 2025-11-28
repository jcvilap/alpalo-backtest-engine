/**
 * Multi-Account Configuration
 *
 * This module handles the configuration for multiple broker accounts.
 * Supports Alpaca (paper and live) and Robinhood (live only).
 * It reads from a JSON-based environment variable (ACCOUNTS)
 * or falls back to legacy single-account environment variables.
 */

import { TradingMode, getTradingMode } from './env';

/**
 * Supported broker types
 */
export enum BrokerType {
    ALPACA = 'Alpaca',
    ROBINHOOD = 'Robinhood'
}

/**
 * Configuration for a single trading account from ACCOUNTS env var
 */
export interface AccountConfig {
    /** Display name for the account (e.g., "Account #1", "Live Trading") */
    name: string;

    /** Broker API key */
    key: string;

    /** Broker API secret */
    secret: string;

    /** Whether this is a paper trading account */
    isPaper: boolean;

    /** Broker to use (defaults to Alpaca for backward compatibility) */
    broker?: BrokerType | string;
}

/**
 * Parse a JSON string that may be single-quoted or double-quoted
 *
 * .env files sometimes use single quotes, which are not valid JSON.
 * This helper converts single-quoted strings to double-quoted before parsing.
 */
function parseEnvJson(jsonString: string): unknown {
    // Remove leading/trailing whitespace
    let cleaned = jsonString.trim();

    // If the string starts with a single quote, replace all single quotes with double quotes
    // This is a simple heuristic that works for most .env use cases
    if (cleaned.startsWith("'")) {
        // Remove outer single quotes if present
        if (cleaned.startsWith("'") && cleaned.endsWith("'")) {
            cleaned = cleaned.slice(1, -1);
        }
        // Replace escaped single quotes temporarily
        cleaned = cleaned.replace(/\\'/g, '__ESCAPED_QUOTE__');
        // Replace single quotes with double quotes
        cleaned = cleaned.replace(/'/g, '"');
        // Restore escaped quotes
        cleaned = cleaned.replace(/__ESCAPED_QUOTE__/g, "'");
    }

    return JSON.parse(cleaned);
}

/**
 * Get all configured trading accounts
 *
 * Priority:
 * 1. ACCOUNTS environment variable (JSON array with simplified format)
 * 2. Legacy environment variables (PAPER_ALPACA_KEY_ID, etc.)
 *
 * @returns Array of validated account configurations
 * @throws Error if no valid configuration is found
 */
export function getConfiguredAccounts(): AccountConfig[] {
    // 1. Try to parse JSON config from ACCOUNTS env var
    const accountsConfig = process.env.ACCOUNTS;
    if (accountsConfig) {
        try {
            const accounts = parseEnvJson(accountsConfig) as AccountConfig[];
            if (Array.isArray(accounts) && accounts.length > 0) {
                validateAccounts(accounts);
                return accounts;
            }
        } catch (error) {
            // @ts-expect-error -- need to deploy quickly resolve type on next commit please
            console.warn(`Failed to parse ACCOUNTS: ${error.message}`);
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
        name: `Legacy ${mode} Account`,
        key: keyId,
        secret: secretKey,
        isPaper: isPaper,
        broker: BrokerType.ALPACA // Legacy configs always use Alpaca
    };
}

/**
 * Validate a list of account configurations
 */
function validateAccounts(accounts: AccountConfig[]): void {
    const names = new Set<string>();

    for (const account of accounts) {
        // Check for duplicate names
        if (names.has(account.name)) {
            throw new Error(`Duplicate account name found: ${account.name}`);
        }
        names.add(account.name);

        // Validate required fields
        if (!account.name) throw new Error('Account name is required');
        if (!account.key) throw new Error(`Account ${account.name}: API key is required`);
        if (!account.secret) throw new Error(`Account ${account.name}: API secret is required`);
        if (account.isPaper === undefined || account.isPaper === null) {
            throw new Error(`Account ${account.name}: isPaper flag is required`);
        }

        // Default broker to Alpaca if not specified (backward compatibility)
        if (!account.broker) {
            account.broker = BrokerType.ALPACA;
        }

        // Normalize broker name to enum value
        const brokerUpper = account.broker.toString().toUpperCase();
        if (brokerUpper === 'ALPACA') {
            account.broker = BrokerType.ALPACA;
        } else if (brokerUpper === 'ROBINHOOD') {
            account.broker = BrokerType.ROBINHOOD;
        } else {
            throw new Error(`Account ${account.name}: Unsupported broker "${account.broker}". Supported: Alpaca, Robinhood`);
        }

        // Validate broker-specific constraints
        if (account.broker === BrokerType.ROBINHOOD && account.isPaper) {
            throw new Error(`Account ${account.name}: Robinhood does not support paper trading. Set isPaper to false or use Alpaca.`);
        }

        // Safety warning for LIVE accounts
        if (!account.isPaper) {
            console.warn(`⚠️  Account "${account.name}" is configured for LIVE TRADING with ${account.broker}. Ensure you have appropriate safety measures in place.`);
        }
    }
}
