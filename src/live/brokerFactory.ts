/**
 * Broker Factory
 *
 * Creates broker instances configured for specific accounts.
 * Supports multiple broker types: Alpaca, Robinhood.
 * Handles instantiation of appropriate clients and brokers with proper credentials.
 */

import { Broker } from '../ports/Broker';
import { AccountConfig, BrokerType } from '../config/accounts';
import { AlpacaClient } from './alpacaClient';
import { AlpacaBroker } from './AlpacaBroker';
import { RobinhoodBroker } from './RobinhoodBroker';

/**
 * Create a broker instance for a specific account
 *
 * @param config - Account configuration with credentials and broker type
 * @returns Configured Broker instance ready for trading
 * @throws Error if broker type is unsupported
 *
 * @example
 * ```typescript
 * const accounts = getConfiguredAccounts();
 * const broker = createBroker(accounts[0]);
 * const portfolio = await broker.getPortfolioState();
 * ```
 */
export function createBroker(config: AccountConfig): Broker {
    // Default to Alpaca if broker not specified (backward compatibility)
    const brokerType = config.broker || BrokerType.ALPACA;

    switch (brokerType) {
        case BrokerType.ALPACA:
            return createAlpacaBroker(config);

        case BrokerType.ROBINHOOD:
            return createRobinhoodBroker(config);

        default:
            throw new Error(`Unsupported broker type: ${brokerType}`);
    }
}

/**
 * Create an Alpaca broker instance
 *
 * @param config - Account configuration with Alpaca credentials
 * @returns Configured AlpacaBroker instance
 */
function createAlpacaBroker(config: AccountConfig): Broker {
    const client = new AlpacaClient(config.key, config.secret);
    return new AlpacaBroker(client);
}

/**
 * Create a Robinhood broker instance
 *
 * IMPORTANT: This creates a placeholder RobinhoodBroker that will throw an error
 * when used. Implement the Robinhood API client to enable actual trading.
 *
 * @param config - Account configuration with Robinhood credentials
 * @returns Configured RobinhoodBroker instance (placeholder)
 */
function createRobinhoodBroker(config: AccountConfig): Broker {
    return new RobinhoodBroker(config.key, config.secret);
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
