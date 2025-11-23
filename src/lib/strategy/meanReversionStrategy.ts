import { Strategy, StrategySignal, OHLC } from '../types';
import { Indicators } from './indicators';

export class MeanReversionStrategy implements Strategy {
    name = 'MeanReversion';

    analyze(data: OHLC[]): StrategySignal {
        if (data.length < 20) {
            return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'Insufficient data' };
        }

        const roc10 = Indicators.rateOfChange(data, 10);
        const currentROC = roc10[roc10.length - 1];

        if (currentROC > 5) {
            return {
                symbol: 'SQQQ',
                action: 'BUY',
                weight: 0.5,
                reason: `ROC (${currentROC.toFixed(2)}) > 5, potential reversal`
            };
        } else if (currentROC < -5) {
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight: 0.5,
                reason: `ROC (${currentROC.toFixed(2)}) < -5, potential bounce`
            };
        }

        return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'Neutral ROC' };
    }
}
