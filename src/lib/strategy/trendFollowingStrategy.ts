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
        const atr14 = Indicators.averageTrueRange(data, 14);

        const currentPrice = data[data.length - 1].close;
        const currentMA50 = ma50[ma50.length - 1];
        const currentMA200 = ma200[ma200.length - 1];
        const currentATR = atr14[atr14.length - 1];
        const atrPct = currentATR ? currentATR / currentPrice : 0;

        const bullish = currentPrice > currentMA50 && currentMA50 > currentMA200;
        const bearish = currentPrice < currentMA50 && currentMA50 < currentMA200;

        if (bullish) {
            const riskThrottle = atrPct > 0.05 ? 0.75 : atrPct < 0.03 ? 1.05 : 1;
            const weight = Math.min(1.45 * riskThrottle, 1.45);
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight,
                reason: `Price above MA50>MA200 (${currentPrice.toFixed(2)} > ${currentMA50.toFixed(2)} > ${currentMA200.toFixed(2)}), ATR% ${(atrPct * 100).toFixed(2)}`
            };
        }

        if (bearish) {
            const riskThrottle = atrPct > 0.06 ? 0.65 : 1;
            const weight = 0.95 * riskThrottle;
            return {
                symbol: 'SQQQ',
                action: 'BUY',
                weight,
                reason: `Price below MA50<MA200 (${currentPrice.toFixed(2)} < ${currentMA50.toFixed(2)} < ${currentMA200.toFixed(2)}), ATR% ${(atrPct * 100).toFixed(2)}`
            };
        }

        return { symbol: 'TQQQ', action: 'SELL', weight: 0, reason: 'No clear trend - move to cash' };
    }
}
