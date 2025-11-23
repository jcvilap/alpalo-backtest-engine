import { Strategy, StrategySignal, OHLC } from '../types';
import { Indicators } from './indicators';

export class TrendFollowingStrategy implements Strategy {
    name = 'TrendFollowing';

    analyze(data: OHLC[]): StrategySignal {
        if (data.length < 260) {
            return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'Insufficient data' };
        }

        const ma20 = Indicators.simpleMovingAverage(data, 20);
        const ma50 = Indicators.simpleMovingAverage(data, 50);
        const ma100 = Indicators.simpleMovingAverage(data, 100);
        const ma150 = Indicators.simpleMovingAverage(data, 150);
        const ma200 = Indicators.simpleMovingAverage(data, 200);
        const ma250 = Indicators.simpleMovingAverage(data, 250);

        const currentPrice = data[data.length - 1].close;
        const currentMA20 = ma20[ma20.length - 1];
        const currentMA50 = ma50[ma50.length - 1];
        const currentMA100 = ma100[ma100.length - 1];
        const currentMA150 = ma150[ma150.length - 1];
        const currentMA200 = ma200[ma200.length - 1];
        const currentMA250 = ma250[ma250.length - 1];

        const ma50Slope = Indicators.slope(ma50, 5) ?? 0;
        const ma100Slope = Indicators.slope(ma100, 5) ?? 0;
        const ma20Slope = Indicators.slope(ma20, 3) ?? 0;
        const roc20 = Indicators.rateOfChange(data, 20);
        const currentROC20 = roc20[roc20.length - 1];
        const reasons: string[] = [];

        let symbol: 'TQQQ' | 'SQQQ' = 'TQQQ';
        let weight = 0;

        const strongUptrend = currentPrice > currentMA50 && currentMA50 > currentMA100 && currentMA100 > currentMA200 && ma50Slope >= 0 && ma100Slope >= 0 && ma20Slope > 0;
        const healthyUptrend = currentPrice > currentMA200 && currentPrice > currentMA250 && currentMA50 > currentMA200 && ma20Slope >= 0;
        const supportedUptrend = currentPrice > currentMA200 && ma20Slope >= 0;
        const softUptrend = currentPrice > currentMA200 || currentPrice > currentMA150;
        const aboveLongTerm = currentPrice > currentMA250;

        if (strongUptrend) {
            weight = 1;
            reasons.push('Stacked MAs with rising slopes: full TQQQ');
        } else if (healthyUptrend) {
            weight = 1;
            reasons.push('Above MA200 & MA250 with rising short-term slope: heavy TQQQ');
        } else if (supportedUptrend) {
            weight = 0.9;
            reasons.push('Above MA200 with positive slope: stay mostly long');
        } else if (aboveLongTerm) {
            weight = 0.65;
            reasons.push('Above MA250 only: partial long bias');
        } else if (softUptrend) {
            weight = 0.6;
            reasons.push('Hovering above long-term support: stay involved');
        } else {
            const distanceBelow200 = (currentMA200 - currentPrice) / currentMA200;
            const earlyDefense = distanceBelow200 > 0.03 && currentPrice < currentMA100 && ma100Slope < 0;
            const deepBreak = distanceBelow200 > 0.08 && currentPrice < currentMA50 * 0.97;
            const momentumBreak = ma50Slope < 0 && ma20Slope < 0 && currentPrice < currentMA20 * 0.97;

            if (deepBreak && momentumBreak && currentROC20 < -5 && distanceBelow200 > 0.1) {
                symbol = 'SQQQ';
                weight = 0.2;
                reasons.push('Severe break below MA200: limited SQQQ hedge');
                if (distanceBelow200 > 0.15) {
                    weight = 0.3;
                    reasons.push('Crash state: slightly larger SQQQ');
                }
            } else {
                symbol = 'TQQQ';
                weight = 0;
                reasons.push('Risk-off: sit in cash');
            }
        }

        weight = Math.max(0, Math.min(1, weight));
        const action = weight > 0 ? 'BUY' : 'HOLD';

        return {
            symbol,
            action,
            weight,
            reason: reasons.join(' | ')
        };
    }
}
