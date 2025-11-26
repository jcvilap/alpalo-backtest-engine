import { Strategy, StrategySignal, OHLC } from '../types';
import { Indicators } from './indicators';

export class MeanReversionStrategy implements Strategy {
    name = 'MeanReversion';

    analyze(data: OHLC[]): StrategySignal {
        if (data.length < 200) {
            return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'Insufficient data' };
        }

        const ma20 = Indicators.simpleMovingAverage(data, 20);
        const ma50 = Indicators.simpleMovingAverage(data, 50);
        const ma200 = Indicators.simpleMovingAverage(data, 200);
        const std20 = Indicators.rollingStdDev(data, 20);
        const roc5 = Indicators.rateOfChange(data, 5);
        const roc20 = Indicators.rateOfChange(data, 20);

        const currentPrice = data[data.length - 1].close;
        const currentMA20 = ma20[ma20.length - 1];
        const currentMA50 = ma50[ma50.length - 1];
        const currentMA200 = ma200[ma200.length - 1];
        const currentStd20 = std20[std20.length - 1];
        const currentROC5 = roc5[roc5.length - 1];
        const currentROC20 = roc20[roc20.length - 1];

        if (!currentStd20 || currentStd20 === 0) {
            return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'No volatility to act on' };
        }

        const zScore20 = (currentPrice - currentMA20) / currentStd20;
        const above200 = currentPrice > currentMA200;
        const confirmedBearTrend = currentPrice < currentMA50 && currentMA50 < currentMA200;

        // Oversold bounce in bullish regime (UNCHANGED - this works well)
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

        // Overbought trim during bull - ONLY trim on EXTREME overbought (z >= 3.0)
        // Increased threshold from 2.5 to 3.0 to stay invested during strong rallies
        // Reduced trim from 0.10 to 0.05 (trim only 5%)
        if (above200 && zScore20 >= 3.0) {
            return {
                symbol: 'TQQQ',
                action: 'SELL',
                weight: 0.05,
                reason: `Minimal trim on extreme overbought: zScore20 ${zScore20.toFixed(2)}`
            };
        }

        // SQQQ Entry: MUCH MORE SELECTIVE
        // Require ALL of these conditions for SQQQ:
        // 1. Confirmed bear trend (price < MA50 < MA200)
        // 2. Strong bear rally (z-score >= 2.0, increased from 1.2)
        // 3. Negative momentum (ROC20 < 0, confirming downtrend)
        // 4. MA50 significantly below MA200 (confirming trend strength)
        if (confirmedBearTrend && zScore20 >= 2.0 && currentROC20 < -5) {
            const maSeparation = ((currentMA200 - currentMA50) / currentMA200) * 100;
            if (maSeparation > 2) { // MA50 must be 2%+ below MA200
                return {
                    symbol: 'SQQQ',
                    action: 'BUY',
                    weight: 0.35, // REDUCED from 0.55 to 0.35
                    reason: `Confirmed bear rally fade: zScore ${zScore20.toFixed(2)}, ROC20 ${currentROC20.toFixed(2)}%, MA gap ${maSeparation.toFixed(2)}%`
                };
            }
        }

        // Deep bear washes: lighten shorts to avoid getting squeezed
        if (!above200 && zScore20 <= -1.6) {
            return {
                symbol: 'SQQQ',
                action: 'SELL',
                weight: 0.20,
                reason: `Exit shorts on deep washout: zScore20 ${zScore20.toFixed(2)}`
            };
        }

        // Neutral state
        return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'Neutral mean reversion state' };
    }
}
