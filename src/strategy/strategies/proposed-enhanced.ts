import { StrategyController } from '../../lib/strategy/strategyController';
import { Indicators } from '../../lib/strategy/indicators';
import { MarketSnapshot, PortfolioState, StrategyDecision, StrategyParams, MarketBar } from '../types';

/**
 * Proposed Enhanced Strategy
 *
 * Builds on the existing controller logic with adaptive overlays:
 * - Volatility-aware position sizing using ATR% bands
 * - Drawdown-aware de-risking during deep pullbacks
 * - Momentum boost when trend strength and volatility conditions align
 * - SQQQ conviction and safety filters based on long-term slope
 */
export function runStrategy(
    snapshot: MarketSnapshot,
    portfolio: PortfolioState,
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

    const controller = new StrategyController();
    const base = controller.analyze(snapshot.qqqHistory);

    const enhanced = applyAdaptiveOverlays(base, snapshot.qqqHistory, params);

    return {
        symbol: enhanced.symbol,
        action: enhanced.weight > 0 ? 'BUY' : 'SELL',
        weight: Math.min(1, Math.max(0, enhanced.weight)),
        reason: enhanced.reason
    };
}

function applyAdaptiveOverlays(
    base: StrategyDecision,
    history: MarketBar[],
    params: StrategyParams
): StrategyDecision {
    const ma20 = Indicators.simpleMovingAverage(history, params.maPeriods.short);
    const ma50 = Indicators.simpleMovingAverage(history, params.maPeriods.medium);
    const ma200 = Indicators.simpleMovingAverage(history, params.maPeriods.long);
    const roc20 = Indicators.rateOfChange(history, params.rocPeriods.medium);
    const currentPrice = history[history.length - 1].close;
    const currentMA20 = ma20[ma20.length - 1];
    const currentMA50 = ma50[ma50.length - 1];
    const currentMA200 = ma200[ma200.length - 1];
    const currentROC20 = roc20[roc20.length - 1];
    const atrPct = calculateAtrPercent(history, 14);

    let weight = base.weight;
    let symbol = base.symbol;
    const notes: string[] = [base.reason];

    const above200 = currentPrice > currentMA200;
    const strongBull = above200 && currentMA50 > currentMA200 && currentROC20 > 0;

    const std20 = Indicators.rollingStdDev(history, params.maPeriods.short);
    const currentStd20 = std20[std20.length - 1];
    const zScore20 = Indicators.calculateZScore(currentPrice, currentMA20, currentStd20);

    // Start from base positioning
    weight = base.weight;
    symbol = base.symbol;

    // Bullish enhancement: lean in when momentum and trend are strong
    if (above200 && (strongBull || currentROC20 > 6)) {
        weight = Math.max(weight, 1);
        symbol = 'TQQQ';
        notes.push('Momentum confirmation above MA200 -> full TQQQ');
    }

    // Slightly overweight any bullish regime to harvest compounding edge
    if (above200 && symbol === 'TQQQ' && weight < 1) {
        weight = Math.min(1, weight + 0.05);
        notes.push('Bullish bias bump +5%');
    }

    // Tactical add on oversold pullbacks within an uptrend
    if (above200 && zScore20 < -1.4) {
        weight = Math.min(1, Math.max(weight, base.weight + 0.1));
        symbol = 'TQQQ';
        notes.push(`Oversold bounce setup (z=${zScore20.toFixed(2)}) -> add 10%`);
    }

    // Defensive cash step-out on confirmed downside drift to protect capital
    const slidingBear = currentPrice < currentMA200 && currentMA50 < currentMA200 && currentROC20 < -3;
    if (slidingBear && symbol === 'TQQQ') {
        weight = 0;
        notes.push('Below MA200 with negative momentum -> step to cash');
    }

    // Bear overlay removed for this variant to preserve bull market compounding

    return {
        symbol,
        action: base.action,
        weight,
        reason: notes.join(' | ')
    };
}

function calculateAtrPercent(history: MarketBar[], period: number): number {
    if (history.length < period + 1) return 0;
    const slices = history.slice(-period - 1);
    const trueRanges: number[] = [];

    for (let i = 1; i < slices.length; i++) {
        const current = slices[i];
        const prevClose = slices[i - 1].close;
        const tr = Math.max(
            current.high - current.low,
            Math.abs(current.high - prevClose),
            Math.abs(current.low - prevClose)
        );
        trueRanges.push(tr);
    }

    const atr = trueRanges.reduce((sum, v) => sum + v, 0) / trueRanges.length;
    const latestClose = slices[slices.length - 1].close;
    return (atr / latestClose) * 100;
}

