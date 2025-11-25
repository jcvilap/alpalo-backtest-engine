import { Strategy, StrategySignal, OHLC } from '../types';
import { Indicators } from './indicators';

export class MeanReversionStrategy implements Strategy {
    name = 'MeanReversion';

    analyze(data: OHLC[]): StrategySignal {
        if (data.length < 200) {
            return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'Insufficient data' };
        }

        const ma20 = Indicators.simpleMovingAverage(data, 20);
        const ma200 = Indicators.simpleMovingAverage(data, 200);
        const std20 = Indicators.rollingStdDev(data, 20);
        const roc5 = Indicators.rateOfChange(data, 5);
        const roc10 = Indicators.rateOfChange(data, 10);

        const currentPrice = data[data.length - 1].close;
        const currentMA20 = ma20[ma20.length - 1];
        const currentMA200 = ma200[ma200.length - 1];
        const currentStd20 = std20[std20.length - 1];
        const currentROC5 = roc5[roc5.length - 1];
        const currentROC10 = roc10[roc10.length - 1];

        if (!currentStd20 || currentStd20 === 0) {
            return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'No volatility to act on' };
        }

        const zScore20 = (currentPrice - currentMA20) / currentStd20;
        const above200 = currentPrice > currentMA200;

        // Oversold bounce in bullish regime
        if (above200 && zScore20 <= -1.3) {
            const extra = zScore20 < -2 ? 0.3 : 0.2;
            const weight = Math.min(0.55 + extra, 0.9);
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight,
                reason: `Bullish mean reversion: zScore20 ${zScore20.toFixed(2)}, ROC5 ${currentROC5.toFixed(2)}`
            };
        }

        // Overbought trim during bull to reduce heat
        if (above200 && zScore20 >= 2.1) {
            return {
                symbol: 'TQQQ',
                action: 'SELL',
                weight: 0.05,
                reason: `Trim overbought: zScore20 ${zScore20.toFixed(2)} > 2.1`
            };
        }

        // Bearish rallies can be faded with SQQQ
        if (!above200 && zScore20 >= 1.2) {
            return {
                symbol: 'SQQQ',
                action: 'BUY',
                weight: 0.55,
                reason: `Bear rally fade: zScore20 ${zScore20.toFixed(2)} above 1.2 while below MA200 ${currentMA200.toFixed(2)}`
            };
        }

        // Momentum continuation shorts after breakdowns
        if (!above200 && currentROC10 < -4 && zScore20 < 0.8) {
            const weight = zScore20 < 0 ? 0.4 : 0.3;
            return {
                symbol: 'SQQQ',
                action: 'BUY',
                weight,
                reason: `Bear follow-through: ROC10 ${currentROC10.toFixed(2)}%, zScore20 ${zScore20.toFixed(2)}`
            };
        }

        // Deep bear washes: lighten shorts to avoid getting squeezed
        if (!above200 && zScore20 <= -1.6) {
            return {
                symbol: 'SQQQ',
                action: 'SELL',
                weight: 0.25,
                reason: `Trim short exposure on deep washout: zScore20 ${zScore20.toFixed(2)} < -1.6`
            };
        }

        // Bearish mean reversion: fade spikes with SQQQ
        // Stay flat during bear swings; allow only cash bias

        return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'Neutral mean reversion state' };
    }
}
