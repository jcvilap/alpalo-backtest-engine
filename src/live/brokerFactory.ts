/**
 * Broker Factory
 *
 * Creates broker instances configured for specific accounts.
 * Handles instantiation of Alpaca clients and brokers with proper credentials.
 */

import { Broker } from '../ports/Broker';
import { AccountConfig } from '../config/accounts';
import { AlpacaClient } from './alpacaClient';
import { AlpacaBroker } from './AlpacaBroker';

/**
 * Create a broker instance for a specific account
 *
 * @param config - Account configuration with credentials
 * @returns Configured Broker instance ready for trading
 *
 * @example
 * ```typescript
 * const accounts = getConfiguredAccounts();
 * const broker = createBroker(accounts[0]);
 * const portfolio = await broker.getPortfolioState();
 * ```
 */
export function createBroker(config: AccountConfig): Broker {
    // Create AlpacaClient with direct credentials from config
    const client = new AlpacaClient(config.key, config.secret);

    // Create and return the broker
    return new AlpacaBroker(client);
}

/**
 * Create a broker instance with direct credential injection
 *
 * This is a more direct approach that doesn't rely on environment variables.
 * Use this when you want to create a broker with explicit credentials.
 *
 * @param keyId - Alpaca API key ID
 * @param secretKey - Alpaca API secret key
 * @param isPaper - Whether to use paper trading
 * @returns Configured Broker instance
 */
export function createBrokerWithCredentials(
    keyId: string,
    secretKey: string,
    isPaper: boolean
): Broker {
    return createBroker({
        name: 'Direct',
        key: keyId,
        secret: secretKey,
        isPaper: isPaper
    });
}
