import { Strategy, StrategySignal, OHLC } from '../types';
import { Indicators } from './indicators';

export class TrendFollowingStrategy implements Strategy {
    name = 'TrendFollowing';

    analyze(data: OHLC[]): StrategySignal {
        if (data.length < 250) {
            return { symbol: 'TQQQ', action: 'HOLD', weight: 0, reason: 'Insufficient data' };
        }

        const currentPrice = data[data.length - 1].close;

        // Calculate indicators
        const ma50 = Indicators.simpleMovingAverage(data, 50);
        const ma250 = Indicators.simpleMovingAverage(data, 250);
        const rsi = Indicators.rsi(data, 14);
        const adx = Indicators.adx(data, 14);
        const atr = Indicators.atr(data, 14);

        const currentMA50 = ma50[ma50.length - 1];
        const currentMA250 = ma250[ma250.length - 1];
        const currentRSI = rsi[rsi.length - 1];
        const currentADX = adx[adx.length - 1];
        const currentATR = atr[atr.length - 1];

        // Calculate volatility-based position sizing
        // Higher volatility = lower position size
        const atr20 = Indicators.atr(data, 20);
        const avgATR20 = atr20[atr20.length - 1];
        const atrPercent = (avgATR20 / currentPrice) * 100;

        // Position sizing: reduce exposure when volatility is high
        let baseWeight = 1.0;
        if (atrPercent > 3.0) {
            baseWeight = 0.6; // Reduce to 60% in very high volatility
        } else if (atrPercent > 2.0) {
            baseWeight = 0.8; // Reduce to 80% in high volatility
        }

        // Trend strength filter using ADX
        // ADX < 20 = weak/no trend (avoid trading)
        // ADX > 25 = strong trend (trade with confidence)
        if (currentADX < 20) {
            return {
                symbol: 'TQQQ',
                action: 'HOLD',
                weight: 0,
                reason: `Weak trend (ADX: ${currentADX.toFixed(1)} < 20)`
            };
        }

        // Multi-timeframe confirmation
        const longTermBullish = currentPrice > currentMA250;
        const shortTermBullish = currentPrice > currentMA50;

        // Primary signal from MA250
        if (longTermBullish) {
            // Bullish long-term trend

            // Check if short-term also confirms or if we're in pullback territory
            if (shortTermBullish) {
                // Both timeframes bullish - check RSI to avoid extreme overbought
                if (currentRSI > 75) {
                    // Very overbought - hold off for now
                    return {
                        symbol: 'TQQQ',
                        action: 'HOLD',
                        weight: 0,
                        reason: `Overbought (RSI: ${currentRSI.toFixed(1)} > 75)`
                    };
                }

                return {
                    symbol: 'TQQQ',
                    action: 'BUY',
                    weight: baseWeight,
                    reason: `Strong uptrend (MA50/MA250 bullish, ADX: ${currentADX.toFixed(1)}, RSI: ${currentRSI.toFixed(1)})`
                };
            } else {
                // Pullback in uptrend - be cautious
                if (currentRSI < 30) {
                    // Oversold in uptrend - good entry
                    return {
                        symbol: 'TQQQ',
                        action: 'BUY',
                        weight: baseWeight * 0.8,
                        reason: `Pullback entry (RSI: ${currentRSI.toFixed(1)}, ADX: ${currentADX.toFixed(1)})`
                    };
                }

                // Not in strong position - wait for better entry
                return {
                    symbol: 'TQQQ',
                    action: 'HOLD',
                    weight: 0,
                    reason: `Waiting for better entry (pullback without oversold)`
                };
            }
        } else {
            // Bearish long-term trend

            if (!shortTermBullish) {
                // Both timeframes bearish - check RSI to avoid extreme oversold
                if (currentRSI < 25) {
                    // Very oversold - hold off for now
                    return {
                        symbol: 'SQQQ',
                        action: 'HOLD',
                        weight: 0,
                        reason: `Oversold (RSI: ${currentRSI.toFixed(1)} < 25)`
                    };
                }

                return {
                    symbol: 'SQQQ',
                    action: 'BUY',
                    weight: baseWeight,
                    reason: `Strong downtrend (MA50/MA250 bearish, ADX: ${currentADX.toFixed(1)}, RSI: ${currentRSI.toFixed(1)})`
                };
            } else {
                // Counter-trend bounce in downtrend
                if (currentRSI > 70) {
                    // Overbought bounce - good short entry
                    return {
                        symbol: 'SQQQ',
                        action: 'BUY',
                        weight: baseWeight * 0.8,
                        reason: `Bounce fading (RSI: ${currentRSI.toFixed(1)}, ADX: ${currentADX.toFixed(1)})`
                    };
                }

                // Not in strong position - wait for better entry
                return {
                    symbol: 'SQQQ',
                    action: 'HOLD',
                    weight: 0,
                    reason: `Waiting for better entry (bounce without overbought)`
                };
            }
        }
    }
}
