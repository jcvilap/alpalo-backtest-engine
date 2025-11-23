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
        const ma200 = Indicators.simpleMovingAverage(data, 200);
        const ma250 = Indicators.simpleMovingAverage(data, 250);

        const currentPrice = data[data.length - 1].close;
        const currentMA20 = ma20[ma20.length - 1];
        const currentMA50 = ma50[ma50.length - 1];
        const currentMA200 = ma200[ma200.length - 1];
        const currentMA250 = ma250[ma250.length - 1];

        const ma50Slope = Indicators.slope(ma50, 5) ?? 0;
        const reasons: string[] = [];

        let symbol: 'TQQQ' | 'SQQQ' = 'TQQQ';
        let weight = 0;

        const strongUptrend = currentPrice > currentMA50 && currentMA50 > currentMA200 && currentPrice > currentMA200;
        const moderateUptrend = currentPrice > currentMA200 && currentPrice > currentMA250;
        const aboveLongTerm = currentPrice > currentMA250;

        if (strongUptrend) {
            weight = 1;
            reasons.push('Price > MA50 > MA200: full TQQQ exposure');
        } else if (moderateUptrend) {
            weight = 1;
            reasons.push('Above MA200: stay fully long');
        } else if (aboveLongTerm) {
            weight = 0.7;
            reasons.push('Above MA250: partial long allocation');
        } else {
            const distanceBelow200 = (currentMA200 - currentPrice) / currentMA200;
            const deepBreak = distanceBelow200 > 0.08 && currentPrice < currentMA50 * 0.94;
            const downsideMomentum = ma50Slope < 0 && currentPrice < currentMA20 * 0.97;

            if (deepBreak && downsideMomentum) {
                symbol = 'SQQQ';
                weight = 0.5;
                reasons.push('Deep break below MA200 with falling MA50');
                if (currentPrice < currentMA20 * 0.92) {
                    weight = 0.65;
                    reasons.push('Crash protection boost');
                }
            } else {
                symbol = 'TQQQ';
                weight = 0;
                reasons.push('Risk-off: hold cash');
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
