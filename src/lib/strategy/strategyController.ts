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

        // If trend is unclear, allow mean reversion to take a small exploratory position
        if (trendSignal.action === 'SELL' && meanReversionSignal.action === 'BUY' && meanReversionSignal.weight > 0) {
            return {
                symbol: meanReversionSignal.symbol,
                action: 'BUY',
                weight: Math.min(0.4, meanReversionSignal.weight),
                reason: `Trend: ${trendSignal.reason} | MeanReversion bounce: ${meanReversionSignal.reason}`
            };
        }

        // Combine trend with mean reversion overlays (trim on overbought, add on oversold)
        let finalSymbol = trendSignal.symbol;
        let finalWeight = trendSignal.weight;

        if (meanReversionSignal.action === 'SELL' && meanReversionSignal.symbol === trendSignal.symbol) {
            finalWeight = Math.max(0, trendSignal.weight - meanReversionSignal.weight);
        } else if (meanReversionSignal.action === 'BUY') {
            if (meanReversionSignal.symbol === trendSignal.symbol) {
                finalWeight = Math.min(StrategyController.MAX_WEIGHT, trendSignal.weight + meanReversionSignal.weight);
            } else if (trendSignal.weight <= 0.5) {
                // Allow regime flips when trend conviction is small
                finalSymbol = meanReversionSignal.symbol;
                finalWeight = Math.min(0.6, meanReversionSignal.weight);
            } else {
                // Hedge by softly reducing exposure to the opposing tilt
                finalWeight = Math.max(0, trendSignal.weight - meanReversionSignal.weight * 0.5);
            }
        }

        finalWeight = Math.min(Math.max(finalWeight, 0), StrategyController.MAX_WEIGHT);

        const finalAction: StrategySignal['action'] = finalWeight > 0 ? 'BUY' : 'SELL';

        return {
            symbol: finalSymbol,
            action: finalAction,
            weight: finalWeight,
            reason: `${trendSignal.reason} | MeanReversion: ${meanReversionSignal.reason}`
        };
    }
}
