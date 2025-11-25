import { Strategy, StrategySignal, OHLC } from '../types';
import { Indicators } from './indicators';

export class TrendFollowingStrategy implements Strategy {
    name = 'TrendFollowing';

    analyze(data: OHLC[]): StrategySignal {
        if (data.length < 200) {
            return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'Insufficient data' };
        }
        const ma20 = Indicators.simpleMovingAverage(data, 20);
        const ma50 = Indicators.simpleMovingAverage(data, 50);
        const ma200 = Indicators.simpleMovingAverage(data, 200);
        const roc20 = Indicators.rateOfChange(data, 20);

        const ma20Slope5 = Indicators.slope(ma20, 5) ?? 0;
        const ma50Slope10 = Indicators.slope(ma50, 10) ?? 0;
        const ma200Slope20 = Indicators.slope(ma200, 20) ?? 0;

        const currentPrice = data[data.length - 1].close;
        const currentMA50 = ma50[ma50.length - 1];
        const currentMA200 = ma200[ma200.length - 1];
        const currentROC20 = roc20[roc20.length - 1] ?? 0;

        const distanceFromMA200 = ((currentPrice - currentMA200) / currentMA200) * 100;

        const maGapPct = ((currentMA50 - currentMA200) / currentMA200) * 100;
        const priceVsMA50 = ((currentPrice - currentMA50) / currentMA50) * 100;

        const uptrend = maGapPct > 0.2 && priceVsMA50 > 0;
        const downtrend = maGapPct < -1 && priceVsMA50 < -0.75;

        if (uptrend) {
            const momentumBoost = Math.min(0.1, Math.max(0, maGapPct / 5));
            const slopeBoost = ma50Slope10 > 0.15 || ma20Slope5 > 0.25 ? 0.05 : 0;
            const weight = Math.min(1.2, 1.05 + momentumBoost + slopeBoost);
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight,
                reason: `Uptrend: MA50 ${currentMA50.toFixed(2)} above MA200 ${currentMA200.toFixed(2)} (gap ${maGapPct.toFixed(2)}%), MA50 slope ${ma50Slope10.toFixed(2)}%, ROC20 ${currentROC20.toFixed(2)}%`
            };
        }

        if (downtrend) {
            const depthBoost = Math.min(0.2, Math.abs(maGapPct) / 5);
            const momentumTilt = currentROC20 < -6 || ma20Slope5 < -0.35 ? 0.1 : 0;
            const weight = Math.min(1.05, 0.85 + depthBoost + momentumTilt);
            return {
                symbol: 'SQQQ',
                action: 'BUY',
                weight,
                reason: `Downtrend: MA50 ${currentMA50.toFixed(2)} below MA200 ${currentMA200.toFixed(2)} (gap ${maGapPct.toFixed(2)}%), MA50 slope ${ma50Slope10.toFixed(2)}%, ROC20 ${currentROC20.toFixed(2)}%`
            };
        }

        if (currentPrice >= currentMA200) {
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight: 0.95,
                reason: `Price defending MA200 (${currentPrice.toFixed(2)} vs ${currentMA200.toFixed(2)}) but trend mixed (MA gap ${maGapPct.toFixed(2)}%, MA50 slope ${ma50Slope10.toFixed(2)}%)`
            };
        }

        return {
            symbol: 'TQQQ',
            action: 'SELL',
            weight: 0,
            reason: `Below MA200 (${distanceFromMA200.toFixed(2)}%) without confirmed downtrend - wait in cash`
        };
    }
}
