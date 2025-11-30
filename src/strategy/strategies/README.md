# Trading Strategies

This directory contains all trading strategy implementations for the Alpalo Backtest Engine.

## Strategy Naming Convention

All new proposed strategies **MUST** follow this naming format:

```
proposed-{CAGR}-cagr
```

Where `{CAGR}` is the **integer CAGR percentage** achieved on the **ALL timeframe**.

### Examples

- `proposed-21-cagr` → Strategy with 21.17% CAGR on ALL timeframe (rounded to 21)
- `proposed-25-cagr` → Strategy with 25.43% CAGR on ALL timeframe (rounded to 25)
- `proposed-18-cagr` → Strategy with 18.92% CAGR on ALL timeframe (rounded to 18)

## Adding a New Strategy

### Step 1: Create Strategy File

Create a new file with a temporary name:

```bash
src/strategy/strategies/proposed-temp.ts
```

### Step 2: Implement Strategy

```typescript
import { MarketSnapshot, PortfolioState, StrategyParams, StrategyDecision } from '../types';

export function runStrategy(
    snapshot: MarketSnapshot,
    portfolio: PortfolioState,
    params: StrategyParams
): StrategyDecision {
    // Your strategy logic here
}
```

### Step 3: Register in Registry

Add to `src/strategy/registry.ts`:

```typescript
import { runStrategy as proposedTemp } from './strategies/proposed-temp';

export const AVAILABLE_STRATEGIES = {
    'current': currentStrategy,
    'proposed-temp': proposedTemp,  // Add your strategy
    // ... other strategies
} as const;
```

### Step 4: Run Backtest with ALL Timeframe

```bash
pnpm backtest --strategies=current,proposed-temp --timeframes=ALL
```

### Step 5: Get CAGR from Results

Look for the ALL timeframe result:

```
Range       current                    proposed-temp
────────────────────────────────────────────────────
ALL         16731.04% (21.17% CAGR)   17500.00% (22.45% CAGR)
```

In this example, CAGR is 22.45%, so round to **22**.

### Step 6: Rename Strategy

```bash
# Rename file
mv src/strategy/strategies/proposed-temp.ts src/strategy/strategies/proposed-22-cagr.ts

# Update registry.ts imports
import { runStrategy as proposed22Cagr } from './strategies/proposed-22-cagr';

# Update AVAILABLE_STRATEGIES
export const AVAILABLE_STRATEGIES = {
    'current': currentStrategy,
    'proposed-22-cagr': proposed22Cagr,  // Updated name
    // ... other strategies
} as const;
```

### Step 7: Update Strategy Documentation

Update the header comment in your strategy file:

```typescript
/**
 * Proposed Trading Strategy - 22% CAGR (ALL Timeframe)
 *
 * ## Performance (ALL Timeframe):
 * - Total Return: 17500.00%
 * - CAGR: 22.45%
 * - Result: Beats current by 1.28%
 *
 * ## Description:
 * [Your strategy description]
 */
```

### Step 8: Verify and Commit

```bash
# Verify rename works
pnpm backtest --strategies=current,proposed-22-cagr --timeframes=ALL

# Commit changes
git add -A
git commit -m "feat: add proposed-22-cagr strategy with X% improvement"
git push
```

## Why This Convention?

1. **Performance Transparency**: Strategy name immediately indicates its CAGR performance
2. **Easy Comparison**: Compare different strategy variants at a glance
3. **Version Control**: Track strategy evolution over time (proposed-21-cagr → proposed-22-cagr → proposed-25-cagr)
4. **Standardization**: Consistent naming across all proposed strategies

## Current Strategies

### `current`
The baseline production strategy. All new strategies are compared against this.

### `proposed-volatility-protected`
Strategy with enhanced volatility protection mechanisms.

### `proposed-21-cagr`
Tactical micro-optimizations:
- 15-18% more aggressive oversold buying
- Eliminated SQQQ entries
- EMA21 early warning indicator

**Performance (ALL):** 21.17% CAGR (matches current)

## Best Practices

1. **Always test on ALL timeframe** before finalizing the name
2. **Round CAGR to nearest integer** for the filename
3. **Document performance metrics** in the strategy file header
4. **Compare against current** and document the delta
5. **Update this README** when adding new strategies
6. **Never modify `current` strategy** - only create new proposed strategies
