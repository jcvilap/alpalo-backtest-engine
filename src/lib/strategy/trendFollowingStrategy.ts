import { Strategy, StrategySignal, OHLC } from '../types';
import { Indicators } from './indicators';

export class TrendFollowingStrategy implements Strategy {
    name = 'TrendFollowing';

    analyze(data: OHLC[]): StrategySignal {
        if (data.length < 250) {
            return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'Insufficient data' };
        }
        const ma50 = Indicators.simpleMovingAverage(data, 50);
        const ma200 = Indicators.simpleMovingAverage(data, 200);

        const currentPrice = data[data.length - 1].close;
        const currentMA50 = ma50[ma50.length - 1];
        const currentMA200 = ma200[ma200.length - 1];

        const above200 = currentPrice > currentMA200;

        if (above200) {
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight: 1.0,
                reason: `Above MA200 (${currentPrice.toFixed(2)} > ${currentMA200.toFixed(2)}) with MA50 ${currentMA50.toFixed(2)}`
            };
        }

        return { symbol: 'TQQQ', action: 'SELL', weight: 0, reason: 'Below MA200 - move to cash' };
    }
}
