import { MarketSnapshot, PortfolioState, StrategyParams, StrategyDecision, MarketBar } from '../types';
import { StrategyController } from '../../lib/strategy/strategyController';

/**
 * Proposed Strategy: Volatility Protected
 * 
 * Extends the current strategy by adding a volatility filter.
 * If market volatility (measured by ATR or standard deviation of returns) is too high,
 * it reduces exposure or stays in cash, even if the trend is positive.
 */
export function runStrategy(
    snapshot: MarketSnapshot,
    portfolio: PortfolioState,
    params: StrategyParams
): StrategyDecision {
    // 1. Run the base strategy logic first
    // We reuse the existing controller to get the base signal
    const controller = new StrategyController();

    // Validate inputs (same as base engine)
    if (!snapshot.qqqHistory || snapshot.qqqHistory.length === 0) {
        return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'No market data' };
    }

    if (snapshot.qqqHistory.length < params.maPeriods.long) {
        return {
            symbol: 'TQQQ',
            action: 'HOLD',
            weight: 0,
            reason: `Insufficient data (need ${params.maPeriods.long} days)`
        };
    }

    const baseSignal = controller.analyze(snapshot.qqqHistory);

    // 2. Apply Volatility Protection
    // Calculate 20-day annualized volatility
    const volatility = calculateVolatility(snapshot.qqqHistory, 20);
    const VOLATILITY_THRESHOLD = 0.25; // 25% annualized volatility threshold

    const finalDecision: StrategyDecision = {
        symbol: baseSignal.symbol,
        action: baseSignal.action,
        weight: baseSignal.weight,
        reason: baseSignal.reason
    };

    // If volatility is high, reduce exposure
    if (volatility > VOLATILITY_THRESHOLD) {
        // If we are in a BUY/LONG position, reduce weight
        if (baseSignal.weight > 0) {
            const dampener = 0.5; // Cut exposure in half
            finalDecision.weight = baseSignal.weight * dampener;
            finalDecision.reason = `${baseSignal.reason} [VOLATILITY PROTECTION: High Vol (${(volatility * 100).toFixed(1)}%) -> Reduced exposure]`;

            // If weight becomes too small, just go to cash
            if (finalDecision.weight < 0.1) {
                finalDecision.action = 'SELL';
                finalDecision.weight = 0;
                finalDecision.reason = `${baseSignal.reason} [VOLATILITY PROTECTION: High Vol -> Cash]`;
            }
        }
    }

    return finalDecision;
}

function calculateVolatility(history: MarketBar[], period: number): number {
    if (history.length < period + 1) return 0;

    const recentData = history.slice(-period - 1);
    const returns: number[] = [];

    for (let i = 1; i < recentData.length; i++) {
        const prev = recentData[i - 1].close;
        const curr = recentData[i].close;
        returns.push(Math.log(curr / prev));
    }

    const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / (returns.length - 1);
    const stdDev = Math.sqrt(variance);

    // Annualize (assuming 252 trading days)
    return stdDev * Math.sqrt(252);
}
