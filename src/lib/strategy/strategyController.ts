import { Strategy, StrategySignal, OHLC } from '../types';
import { TrendFollowingStrategy } from './trendFollowingStrategy';
import { MeanReversionStrategy } from './meanReversionStrategy';

export class StrategyController {
    private strategies: Strategy[] = [];

    constructor() {
        this.strategies.push(new TrendFollowingStrategy());
        this.strategies.push(new MeanReversionStrategy());
    }

    analyze(data: OHLC[]): StrategySignal {
        const signals = this.strategies.map(s => s.analyze(data));
        const trendSignal = signals.find(s => s.symbol === 'TQQQ' || s.symbol === 'SQQQ');

        return trendSignal || { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'No signal' };
    }
}
