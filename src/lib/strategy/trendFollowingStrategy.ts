import { Strategy, StrategySignal, OHLC } from '../types';
import { Indicators } from './indicators';

export class TrendFollowingStrategy implements Strategy {
    name = 'TrendFollowing';

    analyze(data: OHLC[]): StrategySignal {
        if (data.length < 200) {
            return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'Insufficient data' };
        }
        const ma50 = Indicators.simpleMovingAverage(data, 50);
        const ma100 = Indicators.simpleMovingAverage(data, 100);
        const ma200 = Indicators.simpleMovingAverage(data, 200);
        const roc20 = Indicators.rateOfChange(data, 20);

        const currentPrice = data[data.length - 1].close;
        const currentMA50 = ma50[ma50.length - 1];
        const currentMA100 = ma100[ma100.length - 1];
        const currentMA200 = ma200[ma200.length - 1];
        const currentROC20 = roc20[roc20.length - 1];

        const slope50 = Indicators.movingAverageSlope(ma50, 10) ?? 0;
        const slope200 = Indicators.movingAverageSlope(ma200, 30) ?? 0;
        const priceVs200 = ((currentPrice - currentMA200) / currentMA200) * 100;

        const bullishStacked = currentPrice > currentMA50 && currentMA50 > currentMA100 && currentMA100 > currentMA200;
        const bullishSlope = slope50 > 0.15 || slope200 > 0;
        const priceAbove200 = currentPrice > currentMA200;
        const ma50Above200 = currentMA50 > currentMA200;
        const bearishStack = currentPrice < currentMA50 && currentMA50 < currentMA200;
        const bearishMomentum = slope50 < -0.45 && slope200 <= -0.2;
        const deepBelow200 = priceVs200 < -8;
        const momentumBreakdown = currentROC20 < -6 || slope50 < -1;
        const recoveryMomentum = priceAbove200 && priceVs200 < 4 && currentROC20 > 3 && slope50 > 0.2;
        const reclaiming200 = !priceAbove200 && slope200 > -0.05 && currentROC20 > -1 && currentPrice > currentMA100;
        const midTrendRecovery = !priceAbove200 && currentPrice > currentMA50 && slope50 > 0.15 && currentROC20 > 1.5;
        const preBreakout = !priceAbove200 && currentPrice > currentMA100 && slope50 > 0.25 && currentROC20 > 2.5 && slope200 > -0.1;

        if (bullishStacked && bullishSlope) {
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight: 1,
                reason: `Stacked uptrend (P ${currentPrice.toFixed(2)} > MA50 ${currentMA50.toFixed(2)} > MA100 ${currentMA100.toFixed(2)} > MA200 ${currentMA200.toFixed(2)}) with MA slope ${slope50.toFixed(2)}%`
            };
        }

        if (recoveryMomentum) {
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight: 0.95,
                reason: `Fast reclaim above MA200 with positive momentum (ROC20 ${currentROC20.toFixed(2)}%, slope50 ${slope50.toFixed(2)}%)`
            };
        }

        if (priceAbove200) {
            const baseWeight = ma50Above200 ? 0.82 : 0.6;
            const slopeBoost = Math.max(0, slope50) * 0.15;
            const maxWeight = ma50Above200 ? 1.05 : 0.85;
            const weight = Math.min(maxWeight, baseWeight + slopeBoost);

            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight,
                reason: `Above MA200 with improving slope (${currentPrice.toFixed(2)} > ${currentMA200.toFixed(2)}), slope50 ${slope50.toFixed(2)}%`
            };
        }

        if (preBreakout) {
            const weight = Math.min(0.9, 0.6 + Math.max(0, currentROC20) * 0.04);
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight,
                reason: `Pre-breakout strength below MA200 (ROC20 ${currentROC20.toFixed(2)}%, slope50 ${slope50.toFixed(2)}%)`
            };
        }

        if (midTrendRecovery) {
            const weight = Math.min(0.85, 0.55 + Math.max(0, currentROC20) * 0.06);
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight,
                reason: `Recovery under MA200 with improving momentum (ROC20 ${currentROC20.toFixed(2)}%, slope50 ${slope50.toFixed(2)}%)`
            };
        }

        if (bearishStack && bearishMomentum && deepBelow200 && (momentumBreakdown || slope200 < -0.25)) {
            let weight = 0.35;

            if (priceVs200 < -6) weight += 0.15;
            if (currentROC20 < -5) weight += 0.1;
            if (slope50 < -1) weight += 0.05;

            weight = Math.min(weight, 0.9);

            return {
                symbol: 'SQQQ',
                action: 'BUY',
                weight,
                reason: `Bear trend: price ${priceVs200.toFixed(2)}% below MA200, slope50 ${slope50.toFixed(2)}%, ROC20 ${currentROC20.toFixed(2)}%`
            };
        }

        if (reclaiming200) {
            const weight = 0.25 + Math.max(0, slope50) * 0.05;
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight: Math.min(0.45, weight),
                reason: `Attempting MA200 reclaim with stabilizing momentum (ROC20 ${currentROC20.toFixed(2)}%, slope200 ${slope200.toFixed(2)}%)`
            };
        }

        if (currentPrice < currentMA200) {
            return { symbol: 'TQQQ', action: 'SELL', weight: 0, reason: `Below MA200 without downside momentum (${currentPrice.toFixed(2)} < ${currentMA200.toFixed(2)})` };
        }

        return { symbol: 'TQQQ', action: 'SELL', weight: 0, reason: 'No clear trend - move to cash' };
    }
}
