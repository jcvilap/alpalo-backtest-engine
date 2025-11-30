import { MarketSnapshot, PortfolioState, StrategyParams, StrategyDecision, MarketBar } from '../types';
import { Indicators } from '../../lib/strategy/indicators';
import {
    MA_PERIODS,
    ROC_PERIODS,
    MEAN_REVERSION,
    SQQQ_CRITERIA,
    CONTROLLER
} from '../../lib/strategy/config';
import { StrategyController } from '../../lib/strategy/strategyController';

/**
 * Proposed Enhanced Strategy
 *
 * Starts from the current controller signal, then layers tactical overlays:
 * - Bull-market bounce adds on deep z-score dips
 * - Crash hedge that cuts exposure when price slices below the 200-day with negative momentum
 * - Bear override that flips into a capped SQQQ position only when the long-term slope rolls over
 */
export function runStrategy(
    snapshot: MarketSnapshot,
    _portfolio: PortfolioState,
    params: StrategyParams
): StrategyDecision {
    if (!snapshot.qqqHistory || snapshot.qqqHistory.length === 0) {
        return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'No market data available' };
    }

    if (snapshot.qqqHistory.length < params.maPeriods.long) {
        return {
            symbol: 'TQQQ',
            action: 'HOLD',
            weight: 0,
            reason: `Insufficient data (need ${params.maPeriods.long} days, have ${snapshot.qqqHistory.length})`
        };
    }

    const data = snapshot.qqqHistory;

    const ma20 = Indicators.simpleMovingAverage(data, MA_PERIODS.SHORT);
    const ma50 = Indicators.simpleMovingAverage(data, MA_PERIODS.MEDIUM);
    const ma200 = Indicators.simpleMovingAverage(data, MA_PERIODS.LONG);
    const std20 = Indicators.rollingStdDev(data, MA_PERIODS.SHORT);
    const roc5 = Indicators.rateOfChange(data, ROC_PERIODS.SHORT);
    const roc20 = Indicators.rateOfChange(data, ROC_PERIODS.MEDIUM);

    const currentPrice = data[data.length - 1].close;
    const currentMA20 = ma20[ma20.length - 1];
    const currentMA50 = ma50[ma50.length - 1];
    const currentMA200 = ma200[ma200.length - 1];
    const currentStd20 = std20[std20.length - 1];
    const currentROC5 = roc5[roc5.length - 1];
    const currentROC20 = roc20[roc20.length - 1];

    if (!currentStd20 || currentStd20 === 0) {
        return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'No volatility context' };
    }

    const zScore20 = Indicators.calculateZScore(currentPrice, currentMA20, currentStd20);
    const annualizedVol = calculateAnnualizedVolatility(data, 20);
    const ma200Slope = calculateSlope(ma200, 10);
    const confirmedBear = currentPrice < currentMA50 && currentMA50 < currentMA200;
    const above200 = currentPrice > currentMA200;
    const maGap = ((currentMA200 - currentMA50) / currentMA200) * 100;

    // Start from the base controller signal
    const controller = new StrategyController();
    const baseSignal = controller.analyze(data);

    let targetSymbol = baseSignal.symbol as 'TQQQ' | 'SQQQ';
    let targetWeight = baseSignal.weight;
    const reasons: string[] = [`Base: ${baseSignal.reason}`];

    // Bull-market bounce add: only when already long and above MA200
    if (targetSymbol === 'TQQQ' && above200 && zScore20 <= MEAN_REVERSION.OVERSOLD_THRESHOLD) {
        const bump = Math.min(MEAN_REVERSION.BASE_OVERSOLD_WEIGHT, MEAN_REVERSION.MAX_OVERSOLD_WEIGHT - targetWeight);
        if (bump > 0) {
            targetWeight = Math.min(CONTROLLER.MAX_WEIGHT, targetWeight + bump);
            reasons.push(`Oversold add: z ${zScore20.toFixed(2)}, ROC${ROC_PERIODS.SHORT} ${currentROC5.toFixed(2)}%`);
        }
    }

    // Light trim on extreme strength to harvest gains without changing conviction
    if (targetSymbol === 'TQQQ' && above200 && zScore20 >= MEAN_REVERSION.OVERBOUGHT_THRESHOLD) {
        const trim = MEAN_REVERSION.OVERBOUGHT_TRIM_WEIGHT / 10;
        targetWeight = Math.max(CONTROLLER.MIN_BULL_EXPOSURE, targetWeight - trim);
        reasons.push(`Extreme overbought trim: z ${zScore20.toFixed(2)} (trim ${(trim * 100).toFixed(2)}%)`);
    }

    // Crash hedge: if price loses MA200 with negative momentum, cut exposure in half
    if (targetSymbol === 'TQQQ' && !above200 && currentROC20 < -5 && ma200Slope <= 0) {
        targetWeight = Math.max(0.5, targetWeight * 0.8);
        reasons.push(`Crash hedge: below MA${MA_PERIODS.LONG} with ROC${ROC_PERIODS.MEDIUM} ${currentROC20.toFixed(2)}%`);
    }

    // Bear override: flip to a tactical SQQQ position only when long-term slope rolls over with volatility confirmation
    if (
        confirmedBear &&
        ma200Slope <= 0 &&
        currentROC20 < SQQQ_CRITERIA.NEGATIVE_MOMENTUM_THRESHOLD &&
        zScore20 >= SQQQ_CRITERIA.RALLY_ZSCORE_THRESHOLD &&
        maGap > SQQQ_CRITERIA.MA_SEPARATION_THRESHOLD &&
        annualizedVol > 0.35
    ) {
        targetSymbol = 'SQQQ';
        targetWeight = Math.min(CONTROLLER.MAX_SQQQ_EXPOSURE, SQQQ_CRITERIA.ENTRY_WEIGHT + 0.05);
        reasons.push(`Bear override: z ${zScore20.toFixed(2)}, ROC${ROC_PERIODS.MEDIUM} ${currentROC20.toFixed(2)}%, MA gap ${maGap.toFixed(2)}%, vol ${(annualizedVol * 100).toFixed(1)}%`);
    }

    // Exit shorts on deep washout
    if (targetSymbol === 'SQQQ' && zScore20 <= SQQQ_CRITERIA.WASHOUT_THRESHOLD) {
        targetWeight = 0;
        reasons.push(`Washout exit: z ${zScore20.toFixed(2)}`);
    }

    const finalWeight = Math.min(Math.max(targetWeight, 0), CONTROLLER.MAX_WEIGHT);
    const finalAction: StrategyDecision['action'] = finalWeight > 0 ? 'BUY' : 'SELL';

    return {
        symbol: targetSymbol,
        action: finalAction,
        weight: finalWeight,
        reason: reasons.join(' | ')
    };
}

function calculateAnnualizedVolatility(history: MarketBar[], period: number): number {
    if (history.length < period + 1) return 0;
    const recent = history.slice(-period - 1);
    const returns: number[] = [];
    for (let i = 1; i < recent.length; i++) {
        const prev = recent[i - 1].close;
        const curr = recent[i].close;
        returns.push(Math.log(curr / prev));
    }
    const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / (returns.length - 1);
    return Math.sqrt(variance) * Math.sqrt(252);
}

function calculateSlope(series: number[], lookback: number): number {
    if (series.length < lookback + 1) return 0;
    const last = series[series.length - 1];
    const prev = series[series.length - 1 - lookback];
    return ((last - prev) / prev) * 100;
}

export function calculateDrawdown(history: MarketBar[], lookback: number): number {
    if (history.length < lookback) return 0;
    const window = history.slice(-lookback);
    const peak = window.reduce((p, bar) => Math.max(p, bar.close), window[0].close);
    const current = window[window.length - 1].close;
    return ((current - peak) / peak) * 100;
}
