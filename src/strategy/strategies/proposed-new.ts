import { MarketSnapshot, PortfolioState, StrategyParams, StrategyDecision, MarketBar } from '../types';

/**
 * Proposed Strategy: Smart Buy-and-Hold TQQQ (V4 - ULTRA SIMPLE)
 *
 * PHILOSOPHY: The market goes up 70% of the time. Just stay long TQQQ and be smart about timing.
 *
 * Core Rules:
 * 1. DEFAULT: Always be 100% TQQQ
 * 2. AGGRESSIVE DIP BUYING: Buy more when RSI oversold + above MA200
 * 3. ONLY REDUCE: When extremely overbought AND showing weakness
 * 4. NEVER go to SQQQ (too risky, market goes up long-term)
 * 5. EMERGENCY EXIT: Only in extreme crashes (rare)
 *
 * This is inspired by the baseline's aggressive TQQQ positioning.
 */

// Strategy Configuration
const CONFIG = {
    // RSI - More aggressive thresholds
    RSI_PERIOD: 14,
    RSI_OVERSOLD: 35,           // Higher threshold = more opportunities
    RSI_DEEPLY_OVERSOLD: 25,
    RSI_OVERBOUGHT: 65,         // Lower threshold = earlier detection
    RSI_EXTREME_OVERBOUGHT: 75,

    // Moving Averages
    FAST_MA: 10,
    MEDIUM_MA: 50,
    SLOW_MA: 200,

    // Momentum
    MOMENTUM_PERIOD: 20,
    STRONG_MOMENTUM: 8,         // 8% in 20 days
    WEAK_MOMENTUM: -5,          // -5% in 20 days

    // Volatility (for regime detection)
    VOL_PERIOD: 20,
    HIGH_VOL_THRESHOLD: 0.30,   // 30% annualized
    LOW_VOL_THRESHOLD: 0.15,

    // Volume
    VOLUME_PERIOD: 20,
    VOLUME_SURGE: 1.8,          // 80% above average

    // Position sizing - BE AGGRESSIVE
    DEFAULT_TQQQ_POSITION: 1.0,  // Full position in uptrends
    REDUCED_POSITION: 0.5,
    DEFENSIVE_POSITION: 0.0,
    SQQQ_POSITION: 0.5,          // Only 50% for shorts (more conservative)
};

export function runStrategy(
    snapshot: MarketSnapshot,
    portfolio: PortfolioState,
    params: StrategyParams
): StrategyDecision {
    // Validate inputs
    if (!snapshot.qqqHistory || snapshot.qqqHistory.length < 250) {
        return {
            symbol: 'TQQQ',
            action: 'HOLD',
            weight: 0,
            reason: 'Insufficient data'
        };
    }

    const history = snapshot.qqqHistory;
    const currentPrice = history[history.length - 1].close;

    // Calculate only essential indicators
    const rsi = calculateRSI(history, CONFIG.RSI_PERIOD);
    const ma50 = calculateSMA(history, CONFIG.MEDIUM_MA);
    const ma200 = calculateSMA(history, CONFIG.SLOW_MA);
    const momentum = calculateROC(history, CONFIG.MOMENTUM_PERIOD);

    // Ultra-simple decision making
    return makeSimpleDecision(currentPrice, rsi, ma50, ma200, momentum, portfolio);
}

function makeSimpleDecision(
    price: number,
    rsi: number,
    ma50: number,
    ma200: number,
    momentum: number,
    portfolio: PortfolioState
): StrategyDecision {
    // RULE 1: CRASH PROTECTION - Exit when below MA200 with sustained weakness
    // This helps avoid the worst drawdowns (2020 COVID, 2022 bear market)
    if (price < ma200 && price < ma50 && momentum < -15) {
        // But if RSI is deeply oversold, it might be a bounce opportunity
        if (rsi < CONFIG.RSI_DEEPLY_OVERSOLD) {
            return {
                symbol: 'TQQQ',
                action: 'BUY',
                weight: CONFIG.REDUCED_POSITION,  // Smaller position on potential bounce
                reason: `CRASH but DEEPLY OVERSOLD: RSI ${rsi.toFixed(1)} - SMALL BOUNCE PLAY (${CONFIG.REDUCED_POSITION * 100}%)`
            };
        }
        // Otherwise exit to cash
        return {
            symbol: 'TQQQ',
            action: 'SELL',
            weight: 0,
            reason: `CRASH MODE: Price < MA50 & MA200, momentum ${momentum.toFixed(1)}% - PROTECT CAPITAL`
        };
    }

    // RULE 2: AGGRESSIVE DIP BUYING - The secret sauce
    // When RSI is oversold and price is above MA200, go FULL
    // This is where the baseline likely makes its money
    if (rsi < CONFIG.RSI_DEEPLY_OVERSOLD && price > ma200) {
        return {
            symbol: 'TQQQ',
            action: 'BUY',
            weight: CONFIG.DEFAULT_TQQQ_POSITION,
            reason: `DEEP OVERSOLD + UPTREND: RSI ${rsi.toFixed(1)}, above MA200 - AGGRESSIVE BUY (FULL)`
        };
    }

    // RULE 3: Normal oversold in uptrend - Buy the dip
    if (rsi < CONFIG.RSI_OVERSOLD && price > ma200) {
        return {
            symbol: 'TQQQ',
            action: 'BUY',
            weight: CONFIG.DEFAULT_TQQQ_POSITION,
            reason: `OVERSOLD + UPTREND: RSI ${rsi.toFixed(1)}, above MA200 - BUY DIP`
        };
    }

    // RULE 4: Oversold but below MA200 - be more cautious
    if (rsi < CONFIG.RSI_OVERSOLD && price < ma200) {
        return {
            symbol: 'TQQQ',
            action: 'BUY',
            weight: CONFIG.REDUCED_POSITION,
            reason: `OVERSOLD but BELOW MA200: RSI ${rsi.toFixed(1)} - CAUTIOUS ENTRY (${CONFIG.REDUCED_POSITION * 100}%)`
        };
    }

    // RULE 5: DEFAULT POSITION - Stay long if above MA200
    if (price > ma200 && rsi < CONFIG.RSI_EXTREME_OVERBOUGHT) {
        return {
            symbol: 'TQQQ',
            action: portfolio.position?.symbol === 'TQQQ' ? 'HOLD' : 'BUY',
            weight: CONFIG.DEFAULT_TQQQ_POSITION,
            reason: `UPTREND: Above MA200, RSI ${rsi.toFixed(1)} - STAY LONG (FULL)`
        };
    }

    // RULE 6: Between MA50 and MA200 - hold reduced position
    if (price > ma50 && price < ma200) {
        return {
            symbol: 'TQQQ',
            action: portfolio.position?.symbol === 'TQQQ' ? 'HOLD' : 'BUY',
            weight: CONFIG.REDUCED_POSITION,
            reason: `TRANSITIONAL: Between MA50 & MA200, RSI ${rsi.toFixed(1)} - HOLD ${CONFIG.REDUCED_POSITION * 100}%`
        };
    }

    // RULE 7: Extremely overbought - take some profit
    if (rsi >= CONFIG.RSI_EXTREME_OVERBOUGHT) {
        return {
            symbol: 'TQQQ',
            action: portfolio.position?.symbol === 'TQQQ' ? 'HOLD' : 'SELL',
            weight: CONFIG.REDUCED_POSITION,
            reason: `EXTREME OVERBOUGHT: RSI ${rsi.toFixed(1)} - REDUCE to ${CONFIG.REDUCED_POSITION * 100}%`
        };
    }

    // RULE 8: Default to cash if below MA50 and not oversold
    return {
        symbol: 'TQQQ',
        action: 'SELL',
        weight: 0,
        reason: `DEFENSIVE: Price < MA50, RSI ${rsi.toFixed(1)}, momentum ${momentum.toFixed(1)}% - CASH`
    };
}

// ============================================================================
// Technical Indicator Calculations
// ============================================================================

function calculateRSI(history: MarketBar[], period: number): number {
    if (history.length < period + 1) return 50; // Neutral if insufficient data

    const recentData = history.slice(-(period + 1));
    let gains = 0;
    let losses = 0;

    for (let i = 1; i < recentData.length; i++) {
        const change = recentData[i].close - recentData[i - 1].close;
        if (change > 0) {
            gains += change;
        } else {
            losses += Math.abs(change);
        }
    }

    const avgGain = gains / period;
    const avgLoss = losses / period;

    if (avgLoss === 0) return 100;

    const rs = avgGain / avgLoss;
    const rsi = 100 - (100 / (1 + rs));

    return rsi;
}

function calculateVolumeRatio(history: MarketBar[], period: number): number {
    if (history.length < period + 1) return 1.0;

    const recentData = history.slice(-period - 1);
    const currentVolume = recentData[recentData.length - 1].volume;

    const avgVolume = recentData.slice(0, -1).reduce((sum, bar) => sum + bar.volume, 0) / period;

    if (avgVolume === 0) return 1.0;

    return currentVolume / avgVolume;
}

function calculateROC(history: MarketBar[], period: number): number {
    if (history.length < period + 1) return 0;

    const current = history[history.length - 1].close;
    const past = history[history.length - 1 - period].close;

    return ((current - past) / past) * 100;
}

function calculateSMA(history: MarketBar[], period: number): number {
    if (history.length < period) {
        return history[history.length - 1].close;
    }

    const recentData = history.slice(-period);
    return recentData.reduce((sum, bar) => sum + bar.close, 0) / period;
}

function calculateVolatility(history: MarketBar[], period: number): number {
    if (history.length < period + 1) return 0;

    const recentData = history.slice(-period - 1);
    const returns: number[] = [];

    for (let i = 1; i < recentData.length; i++) {
        const ret = Math.log(recentData[i].close / recentData[i - 1].close);
        returns.push(ret);
    }

    const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / (returns.length - 1);
    const stdDev = Math.sqrt(variance);

    // Annualize
    return stdDev * Math.sqrt(252);
}
