import { Strategy, StrategySignal, OHLC } from '../types';
import { TrendFollowingStrategy } from './trendFollowingStrategy';
import { MeanReversionStrategy } from './meanReversionStrategy';

export class StrategyController {
    private strategies: Strategy[] = [];
    private static readonly MAX_WEIGHT = 1.0;

    constructor() {
        this.strategies.push(new TrendFollowingStrategy());
        this.strategies.push(new MeanReversionStrategy());
    }

    analyze(data: OHLC[]): StrategySignal {
        const [trendSignal, meanReversionSignal] = this.strategies.map(s => s.analyze(data));

        if (!trendSignal) {
            return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'No signal' };
        }

        // If trend says exit but mean reversion says buy, allow HIGHER participation (increased from 0.4 to 0.7)
        // This lets us capture bounces even when trend is bearish
        if (trendSignal.action === 'SELL' && meanReversionSignal.action === 'BUY' && meanReversionSignal.weight > 0) {
            return {
                symbol: meanReversionSignal.symbol,
                action: 'BUY',
                weight: Math.min(0.7, meanReversionSignal.weight), // Increased from 0.4
                reason: `Trend: ${trendSignal.reason} | MeanReversion bounce: ${meanReversionSignal.reason}`
            };
        }

        // Combine trend with mean reversion overlays
        let finalSymbol = trendSignal.symbol;
        let finalWeight = trendSignal.weight;

        // Mean reversion says SELL (trim position) - SEVERELY LIMIT the trim to keep us invested
        if (meanReversionSignal.action === 'SELL' && meanReversionSignal.symbol === trendSignal.symbol) {
            // Cap trim amount: maintain minimum 90% exposure during bull trends
            // This prevents getting shaken out during strong bull runs
            finalWeight = Math.max(0.9, trendSignal.weight - meanReversionSignal.weight); // Min 90% exposure
        } else if (meanReversionSignal.action === 'BUY') {
            if (meanReversionSignal.symbol === trendSignal.symbol) {
                // Both agree on symbol, add weights
                finalWeight = Math.min(StrategyController.MAX_WEIGHT, trendSignal.weight + meanReversionSignal.weight);
            } else if (trendSignal.weight <= 0.6) {
                // Allow SQQQ when trend conviction is low (increased threshold from 0.5 to 0.6)
                finalSymbol = meanReversionSignal.symbol;
                finalWeight = Math.min(0.5, meanReversionSignal.weight); // Cap SQQQ at 50%
            } else {
                // Trend is bullish with conviction, don't allow SQQQ to override
                // Just reduce TQQQ slightly as a hedge
                finalWeight = Math.max(0.7, trendSignal.weight - meanReversionSignal.weight * 0.3);
            }
        }

        const cappedWeight = Math.min(Math.max(finalWeight, 0), StrategyController.MAX_WEIGHT);
        const finalAction: StrategySignal['action'] = cappedWeight > 0 ? 'BUY' : 'SELL';

        return {
            symbol: finalSymbol,
            action: finalAction,
            weight: cappedWeight,
            reason: `${trendSignal.reason} | MeanReversion: ${meanReversionSignal.reason}`
        };
    }
}
