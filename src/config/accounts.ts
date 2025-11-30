/**
 * Multi-Account Configuration
 *
 * This module handles the configuration for multiple broker accounts.
 * Supports Alpaca (paper and live).
 * Accounts are configured via the ACCOUNTS environment variable (JSON array).
 */

/**
 * Supported broker types
 */
export enum BrokerType {
    ALPACA = 'Alpaca'
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
 * Reads account configurations from the ACCOUNTS environment variable.
 * The ACCOUNTS variable should be a JSON array of account objects.
 *
 * @returns Array of validated account configurations
 * @throws Error if ACCOUNTS is not set or invalid
 */
export function getConfiguredAccounts(): AccountConfig[] {
    const accountsConfig = process.env.ACCOUNTS;

    if (!accountsConfig) {
        throw new Error(
            'ACCOUNTS environment variable is not set. ' +
            'Please configure your trading accounts in the ACCOUNTS environment variable. ' +
            'See .sample.env for the required format.'
        );
    }

    try {
        const accounts = parseEnvJson(accountsConfig) as AccountConfig[];

        if (!Array.isArray(accounts)) {
            throw new Error('ACCOUNTS must be a JSON array of account objects');
        }

        if (accounts.length === 0) {
            throw new Error('ACCOUNTS array cannot be empty. At least one account must be configured.');
        }

        validateAccounts(accounts);
        return accounts;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to parse ACCOUNTS environment variable: ${error.message}`);
        }
        throw error;
    }
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
        } else {
            throw new Error(`Account ${account.name}: Unsupported broker "${account.broker}". Supported: Alpaca`);
        }

    }
}
