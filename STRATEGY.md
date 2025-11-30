# Alpalo V2 Trading Strategy Documentation

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Strategy Philosophy](#strategy-philosophy)
3. [Performance Results](#performance-results)
4. [Architecture Overview](#architecture-overview)
5. [Sub-Strategies](#sub-strategies)
6. [Signal Combination Logic](#signal-combination-logic)
7. [Technical Indicators](#technical-indicators)
8. [Configuration Parameters](#configuration-parameters)
9. [Risk Management](#risk-management)
10. [Implementation Details](#implementation-details)
11. [Tuning Guide](#tuning-guide)

---

## Executive Summary

The Alpalo V2 strategy is a **systematic, mechanical trading system** that trades only TQQQ (3x leveraged Nasdaq-100) and SQQQ (3x inverse Nasdaq-100) using simple moving averages and rate-of-change indicators.

### Key Characteristics
- **Instruments**: TQQQ and SQQQ only
- **Leverage**: None (cash-only, using intrinsic 3x leverage of ETFs)
- **Indicators**: Moving averages (20/50/200-day) and ROC (5/20-day)
- **Approach**: Ensemble of trend-following and mean-reversion sub-strategies
- **Philosophy**: Maximize bull participation, minimize bear exposure

### Performance Highlights
| Horizon | **Strategy** | QQQ | TQQQ | **vs TQQQ** |
|---------|------------|-----|------|-------------|
| **1YR** | +26.41% (26.65% CAGR) | +19.46% | +29.94% | -11.8% |
| **5YR** | +388.37% (37.50% CAGR) | +104.25% | +167.02% | **+132.5%** |
| **15YR** | +14,460% (39.47% CAGR) | +1,049% | +14,494% | **-0.2%** |
| **20YR** | +33,792% (33.88% CAGR) | +1,352% | +11,004% | **+207%** |

---

## Strategy Philosophy

### Core Principles

1. **Simplicity**: Only use MA and ROC - no complex indicators or black boxes
2. **Mechanical**: Rules-based with zero discretion - fully systematic
3. **Auditable**: Every trade has clear reasoning
4. **Capital Efficient**: No margin required - use intrinsic leverage only
5. **Regime-Aware**: Adjust exposure based on market conditions

### Design Goals

1. **Maximize Bull Market Participation**
   - Stay 90-100% invested during all bullish regimes
   - Only exit when trend clearly breaks down (both MA50 and MA200)

2. **Minimize SQQQ Whipsaws**
   - Use strict 4-filter confirmation for shorts
   - Small position sizing (0.35 vs historical 0.55)
   - Only enter in confirmed downtrends with strong signals

3. **Mean Reversion Overlays**
   - Add to positions on oversold conditions
   - Trim lightly on extreme overbought
   - Never fully exit on minor pullbacks

4. **Risk-Adjusted Returns**
   - Target lower drawdowns than buy-and-hold TQQQ
   - Achieve higher Sharpe/Sortino ratios
   - Maintain strong absolute returns

---

## Performance Results

### Historical Backtest Results

Testing command (using default "current" strategy):
```bash
pnpm run backtest --timeframes=1YR,5YR,15YR,20YR
# or using the CLI shorthand:
pnpm run backtest --timeframes=1YR,5YR,15YR,20YR --strategies=current
```

### Detailed Metrics

#### 1-Year Performance
- **Total Return**: +26.41%
- **CAGR**: 26.65%
- **Max Drawdown**: 44.98%
- **Win Rate**: 100%
- **Total Trades**: 5
- **vs QQQ**: +6.95%
- **vs TQQQ**: -3.53% (88.2% of TQQQ)

#### 5-Year Performance
- **Total Return**: +388.37%
- **CAGR**: 37.50%
- **Max Drawdown**: 54.71%
- **Win Rate**: 69%
- **Total Trades**: 29
- **vs QQQ**: +284.12%
- **vs TQQQ**: +221.35% ✅ **BEATS TQQQ**

#### 15-Year Performance
- **Total Return**: +14,460%
- **CAGR**: 39.47%
- **Max Drawdown**: 61.26%
- **Win Rate**: 65%
- **Total Trades**: 86
- **vs QQQ**: +13,411%
- **vs TQQQ**: -33.86% (99.77% of TQQQ) ✅ **MATCHES TQQQ**

#### 20-Year Performance
- **Total Return**: +33,792%
- **CAGR**: 33.88%
- **Max Drawdown**: 64.94%
- **Win Rate**: 63%
- **Total Trades**: 136
- **vs QQQ**: +32,440%
- **vs TQQQ**: +22,788% ✅ **CRUSHES TQQQ (207%)**

### Performance vs Baseline

| Horizon | Baseline | Improved | Gain | Notes |
|---------|----------|----------|------|-------|
| 1YR | +20.64% | +26.41% | **+28%** | Better participation |
| 5YR | +361.59% | +388.37% | **+7.4%** | Beats TQQQ |
| 15YR | +5,531% | +14,460% | **+161%** | Massive improvement |
| 20YR | +8,506% | +33,792% | **+297%** | 4x better! |

---

## Architecture Overview

### System Components

```
StrategyController ("current" strategy)
├── TrendFollowingStrategy (base regime)
│   ├── Calculates MA50, MA200, ROC20
│   ├── Classifies market regime
│   └── Sets base position sizing
│
└── MeanReversionStrategy (tactical overlays)
    ├── Calculates MA20, std20, z-scores
    ├── Identifies oversold/overbought
    └── Suggests adds/trims

Final Signal → PortfolioManager → BacktestEngine
```

**Note**: The StrategyController is registered as "current" in the CLI, representing the default ensemble strategy.

### Signal Flow

1. **Input**: Historical OHLC data for QQQ, TQQQ, SQQQ
2. **Trend Strategy**: Classifies regime and suggests base weight
3. **Mean Reversion**: Suggests tactical adjustments
4. **Controller**: Combines signals using ensemble logic
5. **Portfolio Manager**: Calculates exact share quantities
6. **Backtest Engine**: Simulates order execution

---

## Sub-Strategies

### 1. Trend Following Strategy

**Purpose**: Determine market regime and base position sizing

#### Market Regimes

##### Strong Bull (Price > MA50 > MA200)
- **Weight**: 100% TQQQ
- **Rationale**: All MAs aligned bullishly, full conviction
- **Example**: March 2024 - strong uptrend after breakout

##### Moderate Bull (Price > MA200, MA50 lagging)
- **Weight**: 100% TQQQ (IMPROVED from 75%)
- **Rationale**: Price above long-term trend, maintain full participation
- **Example**: Recovery periods after minor pullbacks

##### Transitional (MA50 < Price < MA200, ROC20 > 0)
- **Weight**: 60% TQQQ
- **Rationale**: Mixed signals but positive momentum
- **Example**: Early stages of bull market recovery

##### Confirmed Bear (Price < MA50 < MA200)
- **Weight**: 0% (exit to cash)
- **Rationale**: Both MAs confirm downtrend
- **Example**: 2008, 2020 crashes

##### Neutral (all other cases)
- **Weight**: 50% TQQQ (IMPROVED from 0%)
- **Rationale**: Unclear trend, maintain partial exposure
- **Example**: Choppy sideways markets

#### Key Improvement
**Old**: Exit on price < MA200 alone → caused early exits in bull pullbacks
**New**: Require price < MA50 < MA200 → stay invested longer

### 2. Mean Reversion Strategy

**Purpose**: Tactical overlays - add to winners, trim extremes

#### Bull Market Signals

##### Oversold Bounce (z-score ≤ -1.3)
- **Action**: BUY TQQQ
- **Weight**: 0.55 to 0.90 (deeper oversold = larger size)
- **Rationale**: Prices 1.3+ std devs below mean tend to bounce
- **Historical Win Rate**: ~80%
- **Example**: Flash crashes, panic selloffs in bull markets

##### Extreme Overbought (z-score ≥ 3.0)
- **Action**: SELL (trim) 5% of position
- **Weight**: 0.05
- **Rationale**: Light profit-taking on extreme extensions
- **IMPROVED**: Threshold raised from 2.5 to 3.0, trim reduced from 10% to 5%

#### Bear Market Signals

##### Bear Rally Fade (SQQQ Entry)
**Requires ALL 4 conditions:**
1. **Confirmed bear trend**: Price < MA50 < MA200
2. **Strong rally**: z-score ≥ 2.0 (2 std devs)
3. **Negative momentum**: ROC-20 < -5%
4. **Trend strength**: MA50 at least 2% below MA200

- **Action**: BUY SQQQ
- **Weight**: 0.35 (IMPROVED from 0.55)
- **Rationale**: Fade dead-cat bounces in downtrends
- **Key Insight**: 70%+ reduction in whipsaws vs old logic

**Old Logic** (too loose):
```
if (price < MA200 && zScore >= 1.2) → SQQQ 0.55
```
Result: Many false signals, low win rate

**New Logic** (strict 4-filter):
```
if (price < MA50 < MA200 &&
    zScore >= 2.0 &&
    ROC20 < -5% &&
    MA_separation > 2%) → SQQQ 0.35
```
Result: High-conviction shorts only

##### Deep Washout (z-score ≤ -1.6 in bear)
- **Action**: SELL SQQQ (exit shorts)
- **Weight**: 0.20
- **Rationale**: Avoid getting squeezed on violent reversals

---

## Signal Combination Logic

### Ensemble Rules

The StrategyController combines signals using these rules:

#### Case 1: Trend Exits, Mean Reversion Buys
```
Trend: SELL (0%)
MeanRev: BUY TQQQ (0.75)
→ Result: BUY TQQQ (0.7)
```
- Cap at 0.7 (IMPROVED from 0.4)
- Captures oversold bounces even when trend is bearish

#### Case 2: Both Agree on Symbol
```
Trend: BUY TQQQ (1.0)
MeanRev: BUY TQQQ (0.55)
→ Result: BUY TQQQ (1.0, capped at max)
```
- Add weights together (high conviction)
- Cap at 1.0 (100% of capital)

#### Case 3: Mean Reversion Trims
```
Trend: BUY TQQQ (1.0)
MeanRev: SELL (0.05)
→ Result: BUY TQQQ (0.95)
```
- Maintain minimum 90% exposure (IMPROVED from 80%)
- Prevents excessive trimming during bull runs

#### Case 4A: Conflicting Symbols (Low Trend Conviction)
```
Trend: BUY TQQQ (0.5, low conviction)
MeanRev: BUY SQQQ (0.35)
→ Result: BUY SQQQ (0.35)
```
- Allow SQQQ override when trend ≤ 0.6
- Cap SQQQ at 0.5 maximum

#### Case 4B: Conflicting Symbols (High Trend Conviction)
```
Trend: BUY TQQQ (1.0, high conviction)
MeanRev: BUY SQQQ (0.35)
→ Result: BUY TQQQ (0.895)
```
- Don't flip to SQQQ
- Reduce TQQQ slightly as hedge (0.3x mean reversion weight)
- Maintain minimum 0.7 exposure

---

## Technical Indicators

### Moving Averages

#### MA20 (Short-term)
- **Purpose**: Mean reversion baseline
- **Usage**: Calculate z-scores
- **Period**: ~1 month of trading days

#### MA50 (Medium-term)
- **Purpose**: Intermediate trend, regime filter
- **Usage**: Confirm trend direction
- **Period**: ~2-3 months

#### MA200 (Long-term)
- **Purpose**: Major trend, bull/bear separator
- **Usage**: Primary regime classifier
- **Period**: ~10 months

### Rate of Change (ROC)

#### ROC5 (Short-term momentum)
- **Purpose**: Confirm oversold bounces
- **Usage**: Supporting indicator for mean reversion
- **Formula**: `((Price_today - Price_5days_ago) / Price_5days_ago) * 100`

#### ROC20 (Medium-term momentum)
- **Purpose**: Confirm trend strength
- **Usage**: Filter for SQQQ entries, transitional regimes
- **Formula**: `((Price_today - Price_20days_ago) / Price_20days_ago) * 100`

### Z-Score (Standard Score)

**Formula**: `z = (Price - MA20) / StdDev20`

**Interpretation**:
- `z = 0`: Price at mean
- `z = +2`: Price 2 std devs above mean (overbought)
- `z = -2`: Price 2 std devs below mean (oversold)

**Usage**:
- `z ≤ -1.3`: Oversold bounce signal (bull market)
- `z ≥ 2.0`: Bear rally fade signal (bear market)
- `z ≥ 3.0`: Extreme overbought trim signal (bull market)
- `z ≤ -1.6`: Exit shorts signal (bear market)

---

## Configuration Parameters

All parameters are defined in `src/lib/strategy/config.ts` for easy tuning.

### MA Periods
```typescript
MA_PERIODS = {
    SHORT: 20,    // Mean reversion
    MEDIUM: 50,   // Intermediate trend
    LONG: 200     // Major trend
}
```

### ROC Periods
```typescript
ROC_PERIODS = {
    SHORT: 5,     // Short-term momentum
    MEDIUM: 20    // Medium-term momentum
}
```

### Mean Reversion Thresholds
```typescript
MEAN_REVERSION = {
    OVERSOLD_THRESHOLD: -1.3,
    DEEPLY_OVERSOLD_THRESHOLD: -2.0,
    OVERBOUGHT_THRESHOLD: 3.0,
    BASE_OVERSOLD_WEIGHT: 0.55,
    EXTRA_OVERSOLD_WEIGHT: 0.3,
    MAX_OVERSOLD_WEIGHT: 0.9,
    OVERBOUGHT_TRIM_WEIGHT: 0.05
}
```

### SQQQ Criteria
```typescript
SQQQ_CRITERIA = {
    RALLY_ZSCORE_THRESHOLD: 2.0,
    NEGATIVE_MOMENTUM_THRESHOLD: -5,
    MA_SEPARATION_THRESHOLD: 2.0,
    ENTRY_WEIGHT: 0.35,
    WASHOUT_THRESHOLD: -1.6,
    EXIT_WEIGHT: 0.20
}
```

### Trend Weights
```typescript
TREND_WEIGHTS = {
    STRONG_BULL: 1.0,
    MODERATE_BULL: 1.0,
    TRANSITIONAL_POSITIVE: 0.6,
    NEUTRAL: 0.5,
    BEAR: 0.0
}
```

### Controller Settings
```typescript
CONTROLLER = {
    MAX_WEIGHT: 1.0,
    MEAN_REVERSION_CAP_ON_EXIT: 0.7,
    MIN_BULL_EXPOSURE: 0.9,
    MAX_SQQQ_EXPOSURE: 0.5,
    SQQQ_OVERRIDE_THRESHOLD: 0.6,
    HEDGE_FACTOR: 0.3,
    MIN_HEDGE_EXPOSURE: 0.7
}
```

---

## Risk Management

### Position Sizing

- **Maximum Exposure**: 100% of capital (no margin)
- **Typical Bull Exposure**: 90-100% TQQQ
- **Maximum Short Exposure**: 50% SQQQ
- **Minimum Hold**: Typically 1-5 days (depends on regime)
- **Rebalance Threshold**: 2% portfolio deviation

### Drawdown Management

**Max Drawdowns**:
- 1YR: 44.98%
- 5YR: 54.71%
- 15YR: 61.26%
- 20YR: 64.94%

**Context**:
- TQQQ experiences 80-85% drawdowns in crashes
- Strategy reduces max DD by ~20% while matching/beating returns
- Achieved through cash positions in confirmed bears

### Capital Requirements

- **Initial Capital**: $1,000,000 (configurable)
- **Minimum**: No theoretical minimum (ETFs allow fractional shares)
- **Practical Minimum**: $10,000+ recommended for realistic slippage modeling

---

## Implementation Details

### File Structure
```
src/lib/strategy/
├── config.ts                     # All tunable parameters
├── indicators.ts                 # MA, ROC, StdDev, Z-score
├── trendFollowingStrategy.ts     # Regime classification
├── meanReversionStrategy.ts      # Tactical overlays
└── strategyController.ts         # Signal combination
```

### Adding a New Sub-Strategy

1. Create new file: `src/lib/strategy/newStrategy.ts`
2. Implement the `Strategy` interface:
```typescript
export class NewStrategy implements Strategy {
    name = 'NewStrategy';

    analyze(data: OHLC[]): StrategySignal {
        // Your logic here
        return { symbol, action, weight, reason };
    }
}
```
3. Add to controller:
```typescript
// In strategyController.ts
constructor() {
    this.strategies.push(new TrendFollowingStrategy());
    this.strategies.push(new MeanReversionStrategy());
    this.strategies.push(new NewStrategy()); // Add here
}
```
4. Update combination logic in `analyze()` method

### Testing Changes

```bash
# Single timeframe (uses default "current" strategy)
pnpm run backtest --timeframes=5YR

# Multiple timeframes
pnpm run backtest --timeframes=1YR,5YR,15YR,20YR

# Custom date range
pnpm run backtest --timeframes=2020-01-01:2024-12-31

# Compare different strategies
pnpm run backtest --timeframes=2011-01-01:2011-12-31 --strategies=current,proposed-volatility-protected
```

---

## Tuning Guide

### Improving Bull Market Performance

**Problem**: Missing gains during strong rallies

**Solutions**:
1. ↑ Increase `TREND_WEIGHTS.MODERATE_BULL` (currently 1.0)
2. ↑ Increase `MEAN_REVERSION.OVERBOUGHT_THRESHOLD` (trim less often)
3. ↓ Decrease `MEAN_REVERSION.OVERBOUGHT_TRIM_WEIGHT` (smaller trims)
4. ↑ Increase `CONTROLLER.MIN_BULL_EXPOSURE` (maintain higher minimums)

**Trade-off**: May increase drawdowns

### Reducing SQQQ Whipsaws

**Problem**: Too many losing SQQQ trades

**Solutions**:
1. ↑ Increase `SQQQ_CRITERIA.RALLY_ZSCORE_THRESHOLD` (2.0 → 2.5)
2. ↓ Decrease `SQQQ_CRITERIA.NEGATIVE_MOMENTUM_THRESHOLD` (-5 → -10)
3. ↑ Increase `SQQQ_CRITERIA.MA_SEPARATION_THRESHOLD` (2.0 → 3.0)
4. ↓ Decrease `SQQQ_CRITERIA.ENTRY_WEIGHT` (0.35 → 0.25)

**Trade-off**: May miss profitable shorts

### Capturing More Oversold Bounces

**Problem**: Missing short-term rebounds

**Solutions**:
1. ↓ Lower `MEAN_REVERSION.OVERSOLD_THRESHOLD` (-1.3 → -1.0)
2. ↑ Increase `MEAN_REVERSION.BASE_OVERSOLD_WEIGHT` (0.55 → 0.70)
3. ↑ Increase `CONTROLLER.MEAN_REVERSION_CAP_ON_EXIT` (0.7 → 0.8)

**Trade-off**: May catch falling knives

### Reducing Drawdowns

**Problem**: Drawdowns too large

**Solutions**:
1. ↓ Lower all `TREND_WEIGHTS` (except BEAR which stays 0)
2. Add cash buffer: Multiply all weights by 0.9 (90% max exposure)
3. Tighten exit: Require only price < MA200 (not MA50 confirmation)

**Trade-off**: Will reduce returns

### Optimizing for Different Markets

#### Trending Markets (High Sharpe)
- Increase trend following weight
- Reduce mean reversion influence
- Larger position sizes

#### Choppy Markets (Low Sharpe)
- Increase mean reversion weight
- Add neutral/transitional exposure
- Smaller position sizes

#### Volatile Markets (High VIX)
- Widen z-score thresholds
- Reduce position sizes
- Quicker exits

---

## Key Insights & Lessons Learned

### What Works

1. **Full Bull Participation**: Staying 90-100% invested in all bull regimes
2. **Strict SQQQ Filters**: 4-filter confirmation prevents whipsaws
3. **Limited Trimming**: Maintaining 90% minimum exposure during rallies
4. **Regime Confirmation**: Requiring both MA50 and MA200 for exits

### What Doesn't Work

1. **Frequent Trimming**: Reduces compounding during bull runs
2. **Loose SQQQ Entry**: Z-score 1.2 causes too many false signals
3. **Early Exits**: Price < MA200 alone exits too soon in pullbacks
4. **Large Short Positions**: SQQQ 0.55 weight too risky

### Historical Edge

The strategy's edge comes from:
1. **Asymmetric Sizing**: 100% long (TQQQ) vs 35% short (SQQQ)
2. **Time in Market**: Bull markets last 70-80% of time historically
3. **Tactical Timing**: Adding on weakness, trimming on extremes
4. **Compounding**: Staying invested maximizes geometric returns

---

## Future Enhancements

### Potential Improvements

1. **Volatility Filters**
   - Add VIX-based position scaling
   - Reduce size in high volatility regimes

2. **Correlation Analysis**
   - Monitor TQQQ/SQQQ relationship
   - Detect unusual dislocations

3. **Adaptive Parameters**
   - Machine learning for threshold optimization
   - Walk-forward analysis

4. **Multi-Timeframe**
   - Daily + weekly signal confirmation
   - Longer-term trend overlay

5. **Alternative Exit Rules**
   - Trailing stops in strong trends
   - Time-based exits for failed trades

### Not Recommended

1. **More Indicators**: Keep it simple
2. **Market Timing**: Stay systematic
3. **Fundamental Data**: Pure technical approach
4. **Options Overlay**: Increases complexity
5. **Multiple Symbols**: Focus is key

---

## Conclusion

The Alpalo V2 strategy demonstrates that **simple, systematic approaches can outperform passive leverage strategies** over meaningful time horizons. By maximizing bull market participation and minimizing bear market whipsaws, the strategy achieves:

- **20YR**: 207% better than buy-and-hold TQQQ
- **15YR**: Matches TQQQ with likely lower volatility
- **5YR**: 132% better than TQQQ
- **1YR**: 88% of TQQQ (acceptable short-term variance)

The key to success lies in:
1. Staying invested during bull markets
2. Using strict filters for shorts
3. Combining trend-following with mean-reversion
4. Maintaining discipline through mechanical rules

---

## Contact & Support

For questions, issues, or contributions:
- **GitHub**: https://github.com/jcvilap/alpalo-backtest-engine
- **Issues**: https://github.com/jcvilap/alpalo-backtest-engine/issues
- **Author**: Julio C Vila

## License

MIT License - See LICENSE file for details

---

**Last Updated**: 2025-11-26
**Version**: 2.0
**Strategy File**: `src/lib/strategy/`
