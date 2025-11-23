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

        const currentPrice = data[data.length - 1].close;
        const currentMA20 = ma20[ma20.length - 1];
        const currentMA200 = ma200[ma200.length - 1];
        const currentStd20 = std20[std20.length - 1];
        const currentROC5 = roc5[roc5.length - 1];

        if (!currentStd20 || currentStd20 === 0) {
            return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'No volatility to act on' };
        }

        const zScore20 = (currentPrice - currentMA20) / currentStd20;
        const above200 = currentPrice > currentMA200;
        const below200 = currentPrice < currentMA200;

        // Oversold bounce in bullish regime
        if (above200 && zScore20 <= -1.3) {
            const extra = zScore20 < -2 ? 0.35 : 0.25;
            const weight = Math.min(0.6 + extra, 0.95);
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
                weight: 0.1,
                reason: `Trim overbought: zScore20 ${zScore20.toFixed(2)} > 2.1`
            };
        }

        // Bearish mean reversion: fade rallies with SQQQ
        if (below200 && zScore20 >= 1.1) {
            const bonus = zScore20 > 2 ? 0.25 : 0.1;
            const weight = Math.min(0.55 + bonus, 0.85);
            return {
                symbol: 'SQQQ',
                action: 'BUY',
                weight,
                reason: `Bearish mean reversion short: zScore20 ${zScore20.toFixed(2)}, ROC5 ${currentROC5.toFixed(2)}`
            };
        }

        // Bearish washout: back off SQQQ when stretched to downside
        if (below200 && zScore20 <= -1.4) {
            return {
                symbol: 'SQQQ',
                action: 'SELL',
                weight: 0.25,
                reason: `Reduce inverse after washout: zScore20 ${zScore20.toFixed(2)}`
            };
        }

        return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'Neutral mean reversion state' };
    }
}
