import { Strategy, StrategySignal, OHLC } from '../types';
import { Indicators } from './indicators';

export class TrendFollowingStrategy implements Strategy {
    name = 'TrendFollowing';

    analyze(data: OHLC[]): StrategySignal {
        if (data.length < 250) {
            return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'Insufficient data' };
        }

        const ma20 = Indicators.simpleMovingAverage(data, 20);
        const ma50 = Indicators.simpleMovingAverage(data, 50);
        const ma100 = Indicators.simpleMovingAverage(data, 100);
        const ma200 = Indicators.simpleMovingAverage(data, 200);
        const ma200Slope = Indicators.movingAverageSlope(data, 200, 20);
        const ma50Slope = Indicators.movingAverageSlope(data, 50, 10);
        const roc20 = Indicators.rateOfChange(data, 20);

        if ([ma20, ma50, ma100, ma200, ma200Slope, ma50Slope, roc20].some(arr => arr.length === 0)) {
            return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'Insufficient indicator history' };
        }

        const currentPrice = data[data.length - 1].close;
        const latestMA20 = ma20[ma20.length - 1];
        const latestMA50 = ma50[ma50.length - 1];
        const latestMA100 = ma100[ma100.length - 1];
        const latestMA200 = ma200[ma200.length - 1];
        const latestMA200Slope = ma200Slope[ma200Slope.length - 1];
        const latestMA50Slope = ma50Slope[ma50Slope.length - 1];
        const latestRoc20 = roc20[roc20.length - 1];

        const acceleratingSelloff = latestRoc20 < -10 || (latestMA50Slope < -2 && latestRoc20 < -6);

        const strongDowntrend = currentPrice < latestMA200
            && latestMA50 < latestMA100
            && latestMA100 < latestMA200
            && (latestRoc20 < -5 || latestMA200Slope < 0 || acceleratingSelloff);

        const deepSelloff = acceleratingSelloff || (latestMA20 < latestMA50 && latestRoc20 < -8);
        const earlyDownturn = currentPrice < latestMA200 && latestMA50 < latestMA200 && latestRoc20 < -2;
        const moderateWeakness = currentPrice < latestMA100 && latestRoc20 < -3;

        if (strongDowntrend || deepSelloff) {
            return {
                symbol: 'SQQQ',
                action: 'BUY',
                weight: 1.0,
                reason: `Downtrend bias: Price (${currentPrice.toFixed(2)}) below MA200 (${latestMA200.toFixed(2)}), ROC20 ${latestRoc20.toFixed(2)}%, MA200 slope ${latestMA200Slope.toFixed(2)}%, MA50 slope ${latestMA50Slope.toFixed(2)}%`
            };
        }

        if (earlyDownturn) {
            return {
                symbol: 'SQQQ',
                action: 'BUY',
                weight: 0.8,
                reason: `Early bearish bias: price < MA200 and MA50 < MA200 with ROC20 ${latestRoc20.toFixed(2)}%`
            };
        }

        if (currentPrice < latestMA200 && (latestMA50 < latestMA200 || moderateWeakness)) {
            return {
                symbol: 'SQQQ',
                action: 'BUY',
                weight: 0.65,
                reason: `Defensive short bias: price < MA200 and weakening (ROC20 ${latestRoc20.toFixed(2)}%)`
            };
        }

        if (moderateWeakness) {
            return {
                symbol: 'SQQQ',
                action: 'BUY',
                weight: 0.5,
                reason: `Tactical hedge: price (${currentPrice.toFixed(2)}) < MA100 (${latestMA100.toFixed(2)}), ROC20 ${latestRoc20.toFixed(2)}%`
            };
        }

        const strongUptrend = currentPrice > latestMA100 && latestMA50 > latestMA100;

        if (strongUptrend) {
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight: 1.0,
                reason: `Uptrend bias: Price (${currentPrice.toFixed(2)}) above MA100 (${latestMA100.toFixed(2)}), MA50 (${latestMA50.toFixed(2)}) > MA100`
            };
        }

        return {
            symbol: 'TQQQ',
            action: 'BUY',
            weight: 0.6,
            reason: `Neutral drift: above long-term average (${latestMA200.toFixed(2)}) but lacking strong momentum (ROC20 ${latestRoc20.toFixed(2)}%)`
        };
    }
}
