import { StrategySignal } from '../types';
import { Position, Order } from './types';

export class PortfolioManager {
    /**
     * Calculates the orders needed to reach the target portfolio state based on the signal.
     *
     * Uses dollar-based (notional) orders to support fractional shares across all brokers.
     * This allows for precise position sizing without rounding to whole shares.
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
                // Calculate notional value of current position
                const currentNotional = currentPosition.shares * targetPrice;
                orders.push({
                    symbol: currentPosition.symbol,
                    side: 'SELL',
                    notional: currentNotional,
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
                const sellPrice = prices[currentPosition.symbol];
                const currentNotional = currentPosition.shares * sellPrice;
                orders.push({
                    symbol: currentPosition.symbol,
                    side: 'SELL',
                    notional: currentNotional,
                    type: 'MARKET',
                    reason: 'Switching assets'
                });
                // Assume we are now flat for calculation purposes
                currentPosition = null;
            }

            // Calculate target dollar investment
            const targetInvestment = totalEquity * signal.weight;

            // Determine current investment
            const currentShares = (currentPosition && currentPosition.symbol === targetSymbol) ? currentPosition.shares : 0;
            const currentInvestment = currentShares * targetPrice;

            // Rebalance Threshold (2%)
            const diffPct = Math.abs(targetInvestment - currentInvestment) / (totalEquity || 1);

            if (currentShares === 0 && targetInvestment > 0) {
                // Open new position with dollar amount
                orders.push({
                    symbol: targetSymbol,
                    side: 'BUY',
                    notional: targetInvestment,
                    type: 'MARKET',
                    reason: signal.reason
                });
            } else if (currentShares > 0 && diffPct > 0.02) {
                // Rebalance using dollar amount difference
                const investmentDiff = targetInvestment - currentInvestment;
                if (Math.abs(investmentDiff) > 1) { // At least $1 difference
                    orders.push({
                        symbol: targetSymbol,
                        side: investmentDiff > 0 ? 'BUY' : 'SELL',
                        notional: Math.abs(investmentDiff),
                        type: 'MARKET',
                        reason: 'Rebalancing'
                    });
                }
            }
        }

        return orders;
    }
}
