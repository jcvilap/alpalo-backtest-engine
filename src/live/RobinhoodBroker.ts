/**
 * Robinhood Broker Implementation (Placeholder)
 *
 * IMPORTANT: This is a placeholder implementation for Robinhood broker support.
 * Full Robinhood integration requires:
 * - Robinhood API credentials
 * - Robinhood SDK or REST API implementation
 * - OAuth authentication flow
 *
 * Currently throws an error when used. To implement:
 * 1. Add Robinhood API client (similar to AlpacaClient)
 * 2. Implement getPortfolioState() to fetch account and positions
 * 3. Implement placeOrders() to execute orders via Robinhood API
 * 4. Implement getCurrentPrices() to fetch market prices
 *
 * Note: Robinhood only supports LIVE trading, NOT paper trading.
 */

import { Broker, OrderResult } from '../ports/Broker';
import { Order, Position } from '../lib/trade/types';
import { PortfolioState } from '../strategy/types';

/**
 * Robinhood implementation of Broker (Placeholder)
 *
 * This is a stub implementation that will throw an error when used.
 * Implement the actual Robinhood API integration to enable trading.
 */
export class RobinhoodBroker implements Broker {
    private apiKey: string;
    private apiSecret: string;

    /**
     * Create a new RobinhoodBroker
     *
     * @param apiKey - Robinhood API key
     * @param apiSecret - Robinhood API secret
     */
    constructor(apiKey: string, apiSecret: string) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    /**
     * Get current portfolio state from Robinhood
     *
     * @throws Error - Not yet implemented
     */
    async getPortfolioState(): Promise<PortfolioState> {
        throw new Error(
            'Robinhood broker integration is not yet implemented. ' +
            'To enable Robinhood trading, implement the Robinhood API client and update this class. ' +
            'See src/live/RobinhoodBroker.ts for details.'
        );
    }

    /**
     * Place orders via Robinhood API
     *
     * @throws Error - Not yet implemented
     */
    async placeOrders(orders: Order[]): Promise<OrderResult[]> {
        throw new Error(
            'Robinhood broker integration is not yet implemented. ' +
            'To enable Robinhood trading, implement the Robinhood API client and update this class. ' +
            'See src/live/RobinhoodBroker.ts for details.'
        );
    }

    /**
     * Get current prices for symbols
     *
     * @throws Error - Not yet implemented
     */
    async getCurrentPrices(symbols: string[]): Promise<Record<string, number>> {
        throw new Error(
            'Robinhood broker integration is not yet implemented. ' +
            'To enable Robinhood trading, implement the Robinhood API client and update this class. ' +
            'See src/live/RobinhoodBroker.ts for details.'
        );
    }
}

/**
 * Implementation Guide:
 *
 * To implement Robinhood support, you'll need to:
 *
 * 1. Create a Robinhood API Client:
 *    - Create src/live/robinhoodClient.ts
 *    - Implement authentication (OAuth)
 *    - Implement account fetching
 *    - Implement position fetching
 *    - Implement order placement with notional support
 *
 * 2. Update RobinhoodBroker:
 *    - Add robinhoodClient as a dependency
 *    - Implement getPortfolioState() using client
 *    - Implement placeOrders() using client
 *    - Implement getCurrentPrices() using client
 *
 * 3. Configure Environment:
 *    - Add ROBINHOOD_USERNAME and ROBINHOOD_PASSWORD (or OAuth tokens)
 *    - Update secrets.ts to handle Robinhood credentials
 *
 * Example Account Configuration:
 * {
 *   "name": "Robinhood Live",
 *   "key": "your_robinhood_username",
 *   "secret": "your_robinhood_password",
 *   "isPaper": false,
 *   "broker": "Robinhood"
 * }
 */
