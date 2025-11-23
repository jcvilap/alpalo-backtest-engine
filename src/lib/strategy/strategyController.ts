import { StrategySignal, OHLC } from '../types';
import { TrendFollowingStrategy } from './trendFollowingStrategy';
import { MeanReversionStrategy } from './meanReversionStrategy';

export class StrategyController {
    private trendStrategy = new TrendFollowingStrategy();
    private meanReversion = new MeanReversionStrategy();

    analyze(data: OHLC[]): StrategySignal {
        const trendSignal = this.trendStrategy.analyze(data);

        const overlay = this.meanReversion.adjustWeight(data, trendSignal);
        const adjustedWeight = overlay.forceFlat
            ? 0
            : Math.min(1, Math.max(0, trendSignal.weight * overlay.weightMultiplier));

        const reasonParts = [trendSignal.reason];
        if (overlay.reason) {
            reasonParts.push(overlay.reason);
        }

        return {
            symbol: trendSignal.symbol,
            action: adjustedWeight > 0 ? 'BUY' : 'HOLD',
            weight: adjustedWeight,
            reason: reasonParts.filter(Boolean).join(' | ')
        };
    }
}
