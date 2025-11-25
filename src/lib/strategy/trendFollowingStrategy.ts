import { Strategy, StrategySignal, OHLC } from '../types';
import { Indicators } from './indicators';

export class TrendFollowingStrategy implements Strategy {
    name = 'TrendFollowing';

    analyze(data: OHLC[]): StrategySignal {
        if (data.length < 200) {
            return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'Insufficient data' };
        }
        const ma50 = Indicators.simpleMovingAverage(data, 50);
        const ma200 = Indicators.simpleMovingAverage(data, 200);

        const currentPrice = data[data.length - 1].close;
        const currentMA50 = ma50[ma50.length - 1];
        const currentMA200 = ma200[ma200.length - 1];

        const bullish = currentPrice > currentMA50 && currentMA50 > currentMA200;
        const moderatelyBullish = currentPrice > currentMA200 && !bullish;

        if (bullish) {
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight: 1,
                reason: `Price above MA50>MA200 (${currentPrice.toFixed(2)} > ${currentMA50.toFixed(2)} > ${currentMA200.toFixed(2)})`
            };
        }

        if (moderatelyBullish) {
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight: 0.75,
                reason: `Price above MA200 but MA50 lagging (${currentPrice.toFixed(2)} > ${currentMA200.toFixed(2)})`
            };
        }

        if (currentPrice < currentMA200) {
            return { symbol: 'TQQQ', action: 'SELL', weight: 0, reason: `Price below MA200 (${currentPrice.toFixed(2)} < ${currentMA200.toFixed(2)}) move to cash` };
        }

        return { symbol: 'TQQQ', action: 'SELL', weight: 0, reason: 'No clear trend - move to cash' };
    }
}
