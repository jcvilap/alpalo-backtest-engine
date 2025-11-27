/**
 * Alpaca Broker Implementation
 *
 * Live trading broker that executes real orders via Alpaca API.
 * Manages portfolio state and order execution for paper or live trading.
 */

import { Broker, OrderResult } from '../ports/Broker';
import { Order, Position } from '../lib/trade/types';
import { PortfolioState } from '../strategy/types';
import { AlpacaClient, AlpacaOrderRequest } from './alpacaClient';

/**
 * Alpaca implementation of Broker
 *
 * Executes orders and manages portfolio state using Alpaca API.
 */
export class AlpacaBroker implements Broker {
    private client: AlpacaClient;

    /**
     * Create a new AlpacaBroker
     *
     * @param client - Configured AlpacaClient instance
     */
    constructor(client: AlpacaClient) {
        this.client = client;
    }

    /**
     * Get current portfolio state from Alpaca
     *
     * @returns Current cash, positions, and total equity
     */
    async getPortfolioState(): Promise<PortfolioState> {
        const account = await this.client.getAccount();
        const positions = await this.client.getPositions();

        // Convert Alpaca positions to our Position format
        // For simplicity, we only support a single position
        let position: Position | null = null;
        if (positions.length > 0) {
            const alpacaPos = positions[0];
            position = {
                symbol: alpacaPos.symbol,
                shares: parseFloat(alpacaPos.qty),
                avgEntryPrice: parseFloat(alpacaPos.avg_entry_price)
            };
        }

        return {
            cash: parseFloat(account.cash),
            position: position,
            totalEquity: parseFloat(account.equity)
        };
    }

    /**
     * Place orders via Alpaca API
     *
     * @param orders - Array of orders to execute
     * @returns Array of execution results
     */
    async placeOrders(orders: Order[]): Promise<OrderResult[]> {
        const results: OrderResult[] = [];

        for (const order of orders) {
            try {
                const result = await this.executeSingleOrder(order);
                results.push(result);
            } catch (error) {
                // If order fails, return error result
                results.push({
                    order: order,
                    success: false,
                    filledShares: 0,
                    fillPrice: 0,
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        }

        return results;
    }

    /**
     * Execute a single order
     */
    private async executeSingleOrder(order: Order): Promise<OrderResult> {
        // Convert our Order format to Alpaca format
        const alpacaOrder: AlpacaOrderRequest = {
            symbol: order.symbol,
            qty: order.shares,
            side: order.side.toLowerCase() as 'buy' | 'sell',
            type: 'market',
            time_in_force: 'day'
        };

        // Submit the order
        const response = await this.client.submitOrder(alpacaOrder);

        // For market orders, we assume immediate fill
        // In production, you might want to poll the order status
        return {
            order: order,
            success: true,
            filledShares: parseFloat(response.filled_qty) || order.shares,
            fillPrice: parseFloat(response.filled_avg_price || '0') || 0,
        };
    }

    /**
     * Get current prices for symbols
     *
     * @param symbols - Array of ticker symbols
     * @returns Map of symbol to current price
     */
    async getCurrentPrices(symbols: string[]): Promise<Record<string, number>> {
        const prices: Record<string, number> = {};

        // Get prices from current positions or use market data
        for (const symbol of symbols) {
            try {
                const position = await this.client.getPosition(symbol);
                if (position) {
                    prices[symbol] = parseFloat(position.current_price);
                }
            } catch (error) {
                // If no position, price will be 0
                // In production, you'd fetch from market data API
                console.warn(`Could not get price for ${symbol}:`, error);
                prices[symbol] = 0;
            }
        }

        return prices;
    }
}
