import { StrategySignal } from '../types';
import { Position, Order } from './types';

export class PortfolioManager {
    /**
     * Calculates the orders needed to reach the target portfolio state based on the signal.
     */
    calculateOrders(
        signal: StrategySignal,
        currentPosition: Position | null,
        totalEquity: number,
        prices: Record<string, number>
    ): Order[] {
        const orders: Order[] = [];
        const targetSymbol = signal.symbol;
        const targetPrice = prices[targetSymbol];

        // 1. Handle SELL or HOLD (Exit)
        if (signal.action === 'SELL' || signal.weight <= 0) {
            if (currentPosition && currentPosition.shares > 0) {
                orders.push({
                    symbol: currentPosition.symbol,
                    side: 'SELL',
                    shares: currentPosition.shares,
                    type: 'MARKET',
                    reason: signal.reason
                });
            }
            return orders;
        }

        // 2. Handle BUY
        if (signal.action === 'BUY') {
            // If switching symbols, sell the old one first
            if (currentPosition && currentPosition.symbol !== targetSymbol && currentPosition.shares > 0) {
                orders.push({
                    symbol: currentPosition.symbol,
                    side: 'SELL',
                    shares: currentPosition.shares,
                    type: 'MARKET',
                    reason: 'Switching assets'
                });
                // Assume we are now flat for calculation purposes
                currentPosition = null;
            }

            // Calculate target shares
            const targetInvestment = totalEquity * signal.weight;
            const targetShares = Math.floor(targetInvestment / targetPrice);

            // Determine if we need to adjust
            let currentShares = (currentPosition && currentPosition.symbol === targetSymbol) ? currentPosition.shares : 0;

            // Rebalance Threshold (2%)
            const currentVal = currentShares * targetPrice;
            const targetVal = targetShares * targetPrice;
            const diffPct = Math.abs(targetVal - currentVal) / (totalEquity || 1);

            if (currentShares === 0 && targetShares > 0) {
                // Open new position
                orders.push({
                    symbol: targetSymbol,
                    side: 'BUY',
                    shares: targetShares,
                    type: 'MARKET',
                    reason: signal.reason
                });
            } else if (currentShares > 0 && diffPct > 0.02) {
                // Rebalance
                const shareDiff = targetShares - currentShares;
                if (shareDiff !== 0) {
                    orders.push({
                        symbol: targetSymbol,
                        side: shareDiff > 0 ? 'BUY' : 'SELL',
                        shares: Math.abs(shareDiff),
                        type: 'MARKET',
                        reason: 'Rebalancing'
                    });
                }
            }
        }

        return orders;
    }
}
