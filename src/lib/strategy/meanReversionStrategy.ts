import { StrategySignal, OHLC } from '../types';
import { Indicators } from './indicators';

export class MeanReversionStrategy {
    name = 'MeanReversion';

    adjustWeight(data: OHLC[], baseSignal: StrategySignal): { weightMultiplier: number; forceFlat: boolean; reason: string } {
        if (data.length < 60) {
            return { weightMultiplier: 1, forceFlat: false, reason: 'Insufficient data for overlay' };
        }

        const roc10 = Indicators.rateOfChange(data, 10);
        const currentROC = roc10[roc10.length - 1];

        const ma20 = Indicators.simpleMovingAverage(data, 20);
        const ma50 = Indicators.simpleMovingAverage(data, 50);
        const currentMA20 = ma20[ma20.length - 1];
        const currentMA50 = ma50[ma50.length - 1];
        const currentPrice = data[data.length - 1].close;

        const distanceFromMA20 = (currentPrice - currentMA20) / currentMA20;
        const distanceFromMA50 = (currentPrice - currentMA50) / currentMA50;

        let weightMultiplier = 1;
        let forceFlat = false;
        const reasons: string[] = [];

        if (baseSignal.symbol === 'TQQQ') {
            if (currentROC > 10 || distanceFromMA20 > 0.1) {
                weightMultiplier *= 0.8;
                reasons.push('Trim after steep upside stretch');
            }

            if (currentROC < -8 && currentPrice > currentMA50 && distanceFromMA20 > -0.05) {
                weightMultiplier = Math.max(weightMultiplier, 1);
                reasons.push('Controlled pullback above MA50');
            }

            if (distanceFromMA50 < -0.08 && currentROC < -6) {
                weightMultiplier *= 0.6;
                reasons.push('Avoid catching falling knife below MA50');
            }
        } else {
            // Only stay short when downside momentum persists
            if (currentROC > -4 || distanceFromMA20 > -0.015 || distanceFromMA50 > -0.03) {
                forceFlat = true;
                reasons.push('Bounce risk: flatten short');
            } else {
                weightMultiplier *= 0.85;
                if (distanceFromMA20 < -0.08) {
                    weightMultiplier *= 1.1;
                    reasons.push('Let shorts run during acceleration');
                }
                reasons.push('Conservative short sizing');
            }
        }

        return {
            weightMultiplier,
            forceFlat,
            reason: reasons.join(' | ')
        };
    }
}
