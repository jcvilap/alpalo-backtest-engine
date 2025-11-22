import { Strategy, StrategySignal, OHLC } from '../types';
import { Indicators } from './indicators';

export class TrendFollowingStrategy implements Strategy {
    name = 'TrendFollowing';

    analyze(data: OHLC[]): StrategySignal {
        if (data.length < 250) {
            return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'Insufficient data' };
        }

        const ma250 = Indicators.simpleMovingAverage(data, 250);
        const currentPrice = data[data.length - 1].close;
        const currentMA250 = ma250[ma250.length - 1];

        if (currentPrice > currentMA250) {
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight: 1.0,
                reason: `Price (${currentPrice.toFixed(2)}) > MA250 (${currentMA250.toFixed(2)})`
            };
        } else {
            return {
                symbol: 'SQQQ',
                action: 'BUY',
                weight: 1.0,
                reason: `Price (${currentPrice.toFixed(2)}) < MA250 (${currentMA250.toFixed(2)})`
            };
        }
    }
}
