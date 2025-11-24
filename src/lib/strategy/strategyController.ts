import { Strategy, StrategySignal, OHLC } from '../types';
import { TrendFollowingStrategy } from './trendFollowingStrategy';
import { MeanReversionStrategy } from './meanReversionStrategy';

export class StrategyController {
    private strategies: Strategy[] = [];
    private trendStrategy: TrendFollowingStrategy;
    private meanReversionStrategy: MeanReversionStrategy;

    constructor() {
        this.trendStrategy = new TrendFollowingStrategy();
        this.meanReversionStrategy = new MeanReversionStrategy();
        this.strategies.push(this.trendStrategy);
        this.strategies.push(this.meanReversionStrategy);
    }

    analyze(data: OHLC[]): StrategySignal {
        const trendSignal = this.trendStrategy.analyze(data);
        const meanReversionSignal = this.meanReversionStrategy.analyze(data);

        // Blend tactical mean reversion into the dominant trend signal
        if (meanReversionSignal.action === 'BUY' && meanReversionSignal.symbol !== trendSignal.symbol) {
            // In a bullish trend, a mean reversion short acts as a tactical hedge
            if (trendSignal.symbol === 'TQQQ') {
                return {
                    symbol: 'SQQQ',
                    action: 'BUY',
                    weight: Math.min(0.4, Math.max(meanReversionSignal.weight, 0.2)),
                    reason: `${trendSignal.reason}; mean reversion hedge (${meanReversionSignal.reason})`
                };
            }

            // In a bearish trend, temper the SQQQ sizing when a bounce is detected
            return {
                ...trendSignal,
                weight: Math.max(0.4, trendSignal.weight * 0.6),
                reason: `${trendSignal.reason}; trimmed by bounce risk (${meanReversionSignal.reason})`
            };
        }

        return trendSignal || { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'No signal' };
    }
}
