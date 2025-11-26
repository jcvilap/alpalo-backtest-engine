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
        const roc20 = Indicators.rateOfChange(data, 20);

        const currentPrice = data[data.length - 1].close;
        const currentMA50 = ma50[ma50.length - 1];
        const currentMA200 = ma200[ma200.length - 1];
        const currentROC20 = roc20[roc20.length - 1];

        const strongBullish = currentPrice > currentMA50 && currentMA50 > currentMA200;
        const moderatelyBullish = currentPrice > currentMA200 && !strongBullish;
        const bearish = currentPrice < currentMA50 && currentMA50 < currentMA200;

        // Strong Bull: Full TQQQ exposure
        if (strongBullish) {
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight: 1,
                reason: `Strong bull trend (${currentPrice.toFixed(2)} > ${currentMA50.toFixed(2)} > ${currentMA200.toFixed(2)})`
            };
        }

        // Moderate Bull: INCREASED to full exposure (was 0.75)
        // Price above MA200 is bullish, maintain full participation
        if (moderatelyBullish) {
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight: 1.0,
                reason: `Bull trend (price above MA200: ${currentPrice.toFixed(2)} > ${currentMA200.toFixed(2)})`
            };
        }

        // Transitional/Neutral: Price between MAs
        // Use momentum to determine exposure
        if (currentPrice < currentMA200 && currentPrice > currentMA50) {
            if (currentROC20 > 0) {
                return {
                    symbol: 'TQQQ',
                    action: 'BUY',
                    weight: 0.6,
                    reason: `Transitional with positive momentum (ROC20: ${currentROC20.toFixed(2)}%)`
                };
            }
        }

        // Confirmed Bear: Only exit when price below BOTH moving averages
        if (bearish) {
            return {
                symbol: 'TQQQ',
                action: 'SELL',
                weight: 0,
                reason: `Bear trend confirmed (${currentPrice.toFixed(2)} < ${currentMA50.toFixed(2)} < ${currentMA200.toFixed(2)})`
            };
        }

        // Default: Reduce exposure but don't exit completely
        return {
            symbol: 'TQQQ',
            action: 'BUY',
            weight: 0.5,
            reason: 'Neutral trend - maintain partial exposure'
        };
    }
}
