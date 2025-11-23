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

        let weightMultiplier = 1;
        let forceFlat = false;
        const reasons: string[] = [];

        if (baseSignal.symbol === 'TQQQ') {
            if (currentROC > 9 || distanceFromMA20 > 0.08) {
                weightMultiplier *= 1;
                reasons.push('Momentum stretch noted');
            }

            if (currentROC < -7 && currentPrice > currentMA50) {
                weightMultiplier = Math.max(weightMultiplier, 1);
                reasons.push('Buy-the-dip momentum still above MA50');
            }
        } else {
            // Only stay short when downside momentum persists
            if (currentROC < -6 || distanceFromMA20 > -0.02) {
                forceFlat = true;
                reasons.push('Bounce risk: flatten short');
            } else {
                weightMultiplier *= 0.9;
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
