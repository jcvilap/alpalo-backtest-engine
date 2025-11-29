# Alpalo Backtest Engine - Complete Testing Guide for LLMs

This guide provides step-by-step instructions for running and testing the Alpalo Backtest Engine. Follow each step precisely and verify the expected outcomes.

---

## Step 1: Clone and Navigate to Repository

### Action
```bash
git clone https://github.com/jcvilap/alpalo-backtest-engine.git
cd alpalo-backtest-engine
```

### Expected Output
```
Cloning into 'alpalo-backtest-engine'...
remote: Enumerating objects: ...
```

### Verification
```bash
ls -la
```
You should see: `package.json`, `src/`, `README.md`, etc.

---

## Step 2: Install Dependencies

### Action
```bash
npm install
```

### Expected Output
```
added XXX packages in XXs
```

### Verification
```bash
ls node_modules | wc -l
```
Should show 100+ packages installed.

### Common Issues
- **Error: "EACCES permission denied"** → Run `sudo npm install` OR fix npm permissions
- **Error: "Cannot find module"** → Delete `node_modules` and `package-lock.json`, then retry

---

## Step 3: Configure Environment Variables

### Action
Create a `.env.local` file in the project root:

```bash
echo "POLYGON_API_KEY=your_actual_api_key_here" > .env.local
```

**IMPORTANT**: Replace `your_actual_api_key_here` with your real Polygon API key.

### Verification
```bash
cat .env.local
```
Should display: `POLYGON_API_KEY=pk_...` (your actual key)

### Common Issues
- **No API key** → Sign up at [polygon.io](https://polygon.io) and get a free API key
- **File not created** → Ensure you're in the project root directory

---

## Step 4: Populate Redis Cache (One-time Setup)
 
 This step downloads historical data for QQQ, TQQQ, and SQQQ from Polygon API and stores it in Redis.
 
 ### Action
 ```bash
 pnpm populate-cache
 ```
 
 ### Expected Output
 ```
           Redis Cache Population Tool
 ═══════════════════════════════════════════════════════
 
 🔍 Checking Redis cache status...
 
 [REDIS] Connected successfully
 
 🔄 Populating cache for QQQ...
    Fetching from Polygon (2020-11-26 to 2025-11-26)...
    Found 1258 bars
    Saving to Redis...
 ✓ QQQ populated (1258 records)
 
 ...
 
 ✅ Cache population complete!
 ```
 
 ### Verification
 ```bash
 pnpm test-connections
 ```
 Should show "Redis Cache Status" with populated keys and sizes.
 
 ### Common Issues
 - **Error: "Forbidden"** → Your API key may be invalid or rate-limited
 - **Error: "Redis not available"** → Ensure `REDIS_URL` is set correctly
 - **Partial data** → Polygon free tier may have data limits

---

## Step 4A: Quick CLI Backtest (Alternative to Browser)

**This is an OPTIONAL step for running backtests directly in the terminal without the browser UI.**

The CLI tool provides instant backtest results with formatted console output - perfect for quick analysis or automated testing.

### Available Date Range Options

The CLI accepts the same predefined ranges as the UI:
- **Months**: `1M`, `2M`, `3M`, `4M`, `5M`, `6M`
- **Year to Date**: `YTD`
- **Years**: `1YR`, `2YR`, `3YR`, `4YR`, `5YR`, `10YR`
- **Custom**: Any specific dates in `YYYY-MM-DD` format

### Usage Examples

#### Example 1: Full 10-Year Backtest (Default)
```bash
npm run backtest
```

**Expected Output**:
```
═══════════════════════════════════════════════════════════
         ALPALO BACKTEST ENGINE - CONSOLE MODE
═══════════════════════════════════════════════════════════

Date Range: 2015-11-22 → 2025-11-22

📊 Fetching historical data...
✓ Loaded 2513 trading days

⚡ Running backtest...
✓ Backtest complete

PERFORMANCE METRICS
───────────────────────────────────────────────────────────

  Total Return        +393.39%
  CAGR                +19.45%
  Max Drawdown        -79.94%
  Win Rate            +13.30%
  Avg Position Size   +99.30%
  Sharpe Ratio        0.85
  Total Trades        45

BENCHMARK COMPARISON
───────────────────────────────────────────────────────────

  Strategy                 +393.39%
  QQQ (Nasdaq-100)         +396.27%
  TQQQ (3x Leveraged)      +1680.95%

TRADE SUMMARY
───────────────────────────────────────────────────────────

  Total Trades:    45
  Wins:            6
  Losses:          39
  Win Rate:        +13.30%

═══════════════════════════════════════════════════════════
```

#### Example 2: Last 1 Year
```bash
npm run backtest 1YR
```

#### Example 3: Year to Date
```bash
npm run backtest YTD
```

#### Example 4: Last 6 Months
```bash
npm run backtest 6M
```

#### Example 5: Custom Start Date (to today)
```bash
npm run backtest 2024-01-01
```

#### Example 6: Custom Date Range
```bash
npm run backtest 2024-01-01 2024-12-31
```

### Verification Steps

After running any backtest:

1. **Check for errors** - Should complete without red error messages
2. **Verify metrics** - All percentages should be valid numbers (not NaN)
3. **Compare with UI** - Running the same date range in the browser should produce identical results
4. **Performance check** - Should complete in 2-5 seconds

### Testing All Predefined Ranges

Run through all options to verify functionality:

```bash
# Test all monthly ranges
npm run backtest 1M
npm run backtest 2M
npm run backtest 3M
npm run backtest 4M
npm run backtest 5M
npm run backtest 6M

# Test YTD
npm run backtest YTD

# Test yearly ranges
npm run backtest 1YR
npm run backtest 2YR
npm run backtest 3YR
npm run backtest 4YR
npm run backtest 5YR
npm run backtest 10YR
```

### Common Issues

#### Error: "Cannot find module"
**Solution**: Ensure dependencies are installed: `npm install`

#### Error: "No data available"
**Solution**: Run populate script first: `pnpm populate-cache`

#### Error: "Forbidden"
**Solution**: Check your `POLYGON_API_KEY` in `.env.local`

#### Different results than UI
**Solution**: Verify you're using the exact same date range in both.
**Note**: The CLI and UI use the exact same underlying logic (`BacktestEngine` and `fetchBacktestData`), so results should be identical for the same inputs.

### When to Use CLI vs Browser

**Use CLI when**:
- Quick performance check needed
- Automating multiple backtests
- Testing different date ranges rapidly
- No need for visual charts
- Working in a server/headless environment

**Use Browser UI when**:
- Need to see equity curves visually
- Analyzing monthly performance matrix
- Reviewing detailed trade log
- Presenting results to others
- Exploring data interactively

---

## Step 5: Start Development Server



### Action
```bash
npm run dev
```

### Expected Output
```
  ▲ Next.js 15.x.x
  - Local:        http://localhost:3003
  - Environments: .env.local

 ✓ Starting...
 ✓ Ready in XXXms
```

### Verification
The terminal should **remain active** and show:
```
○ Compiling /...
✓ Compiled /... in XXXms
```

**DO NOT CLOSE THIS TERMINAL** - the server must keep running.

### Common Issues
- **Port 3003 in use** → Kill the process: `lsof -ti:3003 | xargs kill -9`
- **Error: "Cannot find module"** → Ensure `npm install` completed successfully

---

## Step 6: Open Application in Browser

### Action
1. Open your web browser
2. Navigate to: `http://localhost:3003`

### Expected Display

#### Initial State (Before Running Backtest)
You should see:
- **Large Header**: "Alpalo Backtest Engine" with Activity icon
- **Subtitle**: "Leveraged ETF Momentum Strategy"
- **Input Panel** (white rounded box):
  - Start Date input with calendar icon
  - End Date input with calendar icon
  - "Run Backtest" button (blue gradient)

#### Auto-populated Dates
- **Start Date**: Should auto-fill to `11/25/2015` (oldest cached date)
- **End Date**: Should auto-fill to today's date or `11/22/2025` (newest cached date)

### Verification
- Page loads without errors
- No red error messages
- Date inputs are filled automatically
- Controls are responsive

### Common Issues
- **Blank page** → Check browser console (F12) for errors
- **Connection refused** → Ensure dev server is running in Step 5
- **Dates not auto-filled** → Wait 2-3 seconds for API call to complete

---

## Step 7: Run Your First Backtest

### Action
1. **Keep default dates** OR select custom range:
   - Start Date: Any date from 11/25/2015 onwards
   - End Date: Any date up to 11/22/2025
2. **Click "Run Backtest" button**

### Expected Behavior

#### Loading State (2-5 seconds)
- Button changes to "Running..." with gray background
- Button becomes disabled
- Page shows loading indicator

#### Success State
After loading completes, you should see:

**1. Sticky Header Appears** (animated slide down from top)
- Compact header with smaller title
- Condensed date inputs
- Smaller "Run" button
- **No white space above header**

**2. Tab Navigation**
- Three tabs: Overview, Trades, Monthly
- "Overview" tab is active (blue underline)

**3. Performance Widgets** (6 cards in grid)
- **Total Return**: Large green percentage with up arrow
  - Shows strategy return
  - Shows QQQ benchmark (gray)
  - Shows TQQQ benchmark (purple)
- **CAGR**: Green percentage with benchmarks
- **Max Drawdown**: Red percentage (down arrow) with benchmarks
- **Avg Trades**: Trade frequency breakdown (Daily/Monthly/Annually)
- **Win Rate**: Percentage with Wins/Losses count
- **Avg Position Size**: Percentage of capital used per trade

**4. Equity Curve Chart**
- X-axis: Dates from start to end of backtest
- Y-axis: Percentage return (starting at 0%)
- Three lines:
  - **Strategy** (solid blue line)
  - **QQQ** (dashed gray line)
  - **TQQQ** (dashed purple line)
- All lines start at 0% (normalized)
- Legend shows all three labels with correct colors

### Verification Checklist
- [ ] Sticky header is flush with browser top (no white space)
- [ ] All 6 metric cards display valid numbers (not "-" or "NaN")
- [ ] Chart renders with all 3 lines visible
- [ ] Chart starts at 0% on Y-axis
- [ ] Colors match: Strategy (blue), QQQ (gray), TQQQ (purple)
- [ ] No console errors in browser DevTools (F12)

### Common Issues
- **Error: "Failed to fetch"** → Backend API issue, check terminal for errors
- **NaN or "-" values** → Data issue, verify cache files are not empty
- **Chart not rendering** → Clear browser cache and reload

---

## Step 8: Explore Trades Tab

### Action
Click the **"Trades"** tab (second tab with list icon)

### Expected Display
A data table with these columns:
1. **Entry Date** (format: MM/DD/YY)
2. **Exit Date** (format: MM/DD/YY)
3. **Symbol** (TQQQ or SQQQ badge)
4. **Position %** (percentage of portfolio, e.g., 99.3%)
5. **Days** (holding period, e.g., 5)
6. **Trade Return %** (green if positive, red if negative)
7. **Portfolio Return %** (green if positive, red if negative)

### Verification
- [ ] Table shows multiple rows (should have trades if date range > 1 month)
- [ ] All Position % values show percentages (not "-")
- [ ] Colors: Positive returns (green), Negative returns (red)
- [ ] Dates are formatted correctly
- [ ] Symbol badges show TQQQ or SQQQ

### Common Issues
- **Empty table** → Date range too short, expand to 1+ years
- **Position % shows "-"** → Data calculation error, check console

---

## Step 9: Explore Monthly Performance Matrix

### Action
Click the **"Monthly"** tab (third tab with calendar icon)

### Expected Display

#### Table Structure
- **Columns**: Year, Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec, YTD
- **Rows**: One per year (2015-2025)
- **Sticky Columns**:
  - Year column pinned on left
  - YTD column pinned on right

#### Cell Content (for each month)
- **Top number** (larger, bold): Strategy return
  - Green if positive
  - Red if negative
- **Bottom numbers** (smaller):
  - Gray number: QQQ return
  - Purple number: TQQQ return

#### Sortable Columns
- Click "Year" header → Sorts by year
- Click "YTD" header → Sorts by year-to-date performance
- Arrow indicators (▲/▼) show sort direction

### Verification
- [ ] Year column stays visible when scrolling right
- [ ] YTD column stays visible when scrolling right
- [ ] Monthly cells show 3 numbers (strategy, QQQ, TQQQ)
- [ ] Colors: QQQ (gray), TQQQ (purple)
- [ ] Sorting works on Year and YTD columns
- [ ] All percentages are formatted correctly (e.g., "15.3%")

### Common Issues
- **Columns not sticky** → Browser CSS Grid support issue, use modern browser
- **Missing months** → Partial year data (normal for current year)

---

## Step 10: Test Different Date Ranges

### Action
Use the sticky header inputs to test various scenarios:

#### Test Case 1: Full 10-Year Backtest
- Start: `11/25/2015`
- End: `11/22/2025`
- Click "Run"
- **Expected**: ~2,500 daily bars, 25+ trades, high returns

#### Test Case 2: Recent Year Only
- Start: `01/01/2024`
- End: `12/31/2024`
- Click "Run"
- **Expected**: ~250 daily bars, 2-5 trades, shows 2024 performance

#### Test Case 3: Market Crash Period
- Start: `02/01/2020`
- End: `05/01/2020`
- Click "Run"
- **Expected**: COVID crash visible in chart, drawdown metrics increase

### Verification
After each test:
- [ ] Chart re-renders with new data
- [ ] Performance metrics update
- [ ] Trade log shows different trades
- [ ] Monthly matrix updates
- [ ] No errors in console

---

## Step 11: Verify Data Accuracy

### Critical Checks

#### 1. Return Calculation Consistency
- Total Return should equal: (Final Equity - Initial Equity) / Initial Equity × 100
- All three benchmarks (Strategy, QQQ, TQQQ) should start at 0% in the chart

#### 2. Position Size Validation
- Position % in trades tab should be between 0-100%
- **Never** show "-" or "NaN"
- Most values should be close to 100% (fully invested strategy)

#### 3. Chart Data Integrity
- Lines should not show sudden jumps to infinity
- All percentage values should be reasonable (-100% to +10,000%)
- Date axis should match selected range

#### 4. Benchmark Consistency
- QQQ color: **Gray** everywhere (widgets, chart legend, monthly matrix)
- TQQQ color: **Purple** everywhere
- Strategy color: **Blue** in chart, **Green/Red** for returns

### Verification Commands (Browser Console)
Open browser console (F12) and run:

```javascript
// Check if equity curve data is valid
console.log('Equity points:', document.querySelector('svg').querySelectorAll('path').length);

// Should show 3 paths (3 lines in chart)
```

---

## Step 12: Performance Testing

### Action
Test app responsiveness:

1. **Run backtest** with full 10-year range
2. **Switch tabs rapidly** (Overview → Trades → Monthly → Overview)
3. **Sort monthly table** by clicking Year/YTD multiple times
4. **Scroll monthly table** horizontally to verify sticky columns

### Expected Behavior
- Tab switches should be instant (< 100ms)
- No lag when sorting
- Sticky columns remain in place during scroll
- No memory leaks (check browser Task Manager)

### Verification
- [ ] Smooth animations (no jank)
- [ ] Tabs respond immediately
- [ ] Table sorting is instant
- [ ] Page doesn't freeze or crash

---

## Step 13: Error Handling Verification

### Test Invalid Scenarios

#### Test 1: Invalid Date Range
- Set Start Date **after** End Date
- Click "Run Backtest"
- **Expected**: Error message appears (red box with warning icon)

#### Test 2: Missing API Key
- Stop dev server (Ctrl+C)
- Remove `.env.local` file
- Restart dev server: `npm run dev`
- Navigate to `http://localhost:3003`
- Click "Run Backtest"
- **Expected**: Error about missing API key or failed data fetch

#### Test 3: Offline Mode
- Disconnect internet
- Click "Run Backtest"
- **Expected**: Works if cache exists, error if cache missing

---

## Step 14: Clean Shutdown

### Action
1. Close the browser tab
2. In the terminal running `npm run dev`, press **Ctrl+C**
3. Confirm shutdown

### Expected Output
```
^C
Shutting down...
```

### Verification
```bash
lsof -ti:3003
```
Should return nothing (port is free).

---

## Summary Checklist

After completing all steps, you should have verified:

### Setup
- [x] Repository cloned successfully
- [x] Dependencies installed
- [x] Environment variables configured
- [x] Historical data cached (in Redis)
- [x] Dev server starts without errors

### Functionality
- [x] Application loads in browser
- [x] Dates auto-populate from cache
- [x] Backtest runs successfully
- [x] Sticky header appears and is flush with top
- [x] All 6 performance widgets show valid data
- [x] Equity chart renders with 3 lines starting at 0%
- [x] Trade log shows all trades with Position %
- [x] Monthly performance matrix with sticky columns
- [x] Tab navigation works smoothly
- [x] Sorting in monthly table works
- [x] Multiple date ranges can be tested

### Data Quality
- [x] No NaN or "-" in Position % column
- [x] Chart lines are smooth and reasonable
- [x] Benchmark colors consistent (QQQ gray, TQQQ purple)
- [x] Returns add up correctly
- [x] All percentages properly formatted

### Performance
- [x] Page loads in < 3 seconds
- [x] Tab switches are instant
- [x] No console errors
- [x] No memory leaks during extended use

---

## Troubleshooting Reference

### Issue: "Cannot GET /api/backtest"
**Solution**: Dev server not running. Start with `npm run dev`

### Issue: Empty cache
**Solution**: Re-run `pnpm populate-cache` with valid API key

### Issue: Chart shows flat line at 0%
**Solution**: No trades executed. Check strategy logic or expand date range

### Issue: TypeScript errors
**Solution**: Run `npm install` again to install type definitions

### Issue: Port 3003 already in use
**Solution**: Kill process: `lsof -ti:3003 | xargs kill -9`

---

## Success Criteria

The backtest is working correctly if:

1. ✅ All 6 metrics display valid numbers
2. ✅ Chart shows 3 distinct lines with proper colors
3. ✅ Trade log has 20+ trades over 10-year period
4. ✅ Monthly matrix shows data for years 2015-2025
5. ✅ Sticky header appears after first backtest
6. ✅ All Position % values are percentages (not "-")
7. ✅ No console errors during normal operation
8. ✅ Performance is smooth (no lag)

---

## Step 15: Testing Trading Modes

### Overview
The system supports three trading modes: BACKTEST (default), PAPER, and LIVE. This section covers testing each mode.

---

### Testing BACKTEST Mode (Default)

All previous steps (1-14) cover backtest mode testing. This is the default mode and requires only the Polygon API key.

**Environment Variables:**
```bash

POLYGON_API_KEY=your_polygon_key
```

**Verification:**
- [ ] System uses cached historical data
- [ ] No Alpaca credentials required
- [ ] Fast execution (uses pre-loaded data)

---

### Testing PAPER Mode

Paper mode simulates live trading with real market data but no actual money at risk.

#### Action
1. Add paper trading credentials to `.env.local`:
```bash

POLYGON_API_KEY=your_polygon_key
ACCOUNTS='[{"name":"My Paper Account","key":"YOUR_PAPER_KEY","secret":"YOUR_PAPER_SECRET","isPaper":true,"broker":"Alpaca"}]'
```

2. Test the Alpaca client:
```bash
npx tsx scripts/test-alpaca.ts
```

#### Expected Output
```
Testing Alpaca client...
✓ Alpaca client created (paper trading mode)

Test 1: Fetching account information...
✓ Account fetched successfully
  Account ID: xxx
  Status: ACTIVE
  Cash: $100,000.00
  Portfolio Value: $100,000.00
  Buying Power: $400,000.00

Test 2: Fetching market clock...
✓ Market clock fetched successfully
  Market Open: Yes/No
  Current Time: 2025-11-26T14:30:00Z
  Next Open: 2025-11-27T14:30:00Z
  Next Close: 2025-11-26T21:00:00Z

Test 3: Fetching current positions...
✓ Positions fetched successfully (0 positions)
  No positions currently held

Test 4: Fetching open orders...
✓ Orders fetched successfully (0 open orders)
  No open orders

✅ All tests passed!
```

#### Verification
- [ ] Account information retrieved successfully
- [ ] Market clock shows correct open/close times
- [ ] Positions and orders can be fetched
- [ ] No authentication errors

#### Common Issues
- **Error: "Invalid credentials"** → Check your ACCOUNTS configuration and ensure keys are correct
- **Error: "Request failed"** → Verify internet connection and Alpaca API status
- **403 Forbidden** → Credentials may be for live trading instead of paper trading (check isPaper flag)

---

### Testing LIVE Mode

⚠️ **WARNING: LIVE mode trades real money. Use extreme caution.**

#### Prerequisites
- Funded Alpaca brokerage account
- Live trading API credentials
- Thorough testing in PAPER mode first
- Understanding of strategy behavior and risks

#### Action
1. Add live trading credentials to `.env.local`:
```bash

POLYGON_API_KEY=your_polygon_key
ACCOUNTS='[{"name":"My Live Account","key":"YOUR_LIVE_KEY","secret":"YOUR_LIVE_SECRET","isPaper":false,"broker":"Alpaca"}]'
```

2. Test the Alpaca client (similar to paper mode):
```bash
npx tsx scripts/test-alpaca.ts
```

#### Expected Output
Similar to paper mode, but with your actual account balances.

#### Verification
- [ ] Account balance matches your actual Alpaca account
- [ ] Market clock shows correct status
- [ ] Positions reflect your actual holdings
- [ ] Orders show your actual pending orders

#### Safety Checklist
Before running in LIVE mode:
- [ ] Thoroughly tested in PAPER mode for at least 30 days
- [ ] Reviewed all trade history from paper trading
- [ ] Understand max drawdown and risk exposure
- [ ] Set up position limits and stop losses
- [ ] Have Slack notifications configured (optional but recommended)
- [ ] Monitor the system actively during initial live runs
- [ ] Start with a small account size

#### Common Issues
- **Error: "Insufficient buying power"** → Account doesn't have enough funds
- **Error: "Market is closed"** → Attempting to trade outside market hours
- **Error: "Position limit exceeded"** → Alpaca account restrictions

---

### Testing PolygonLiveDataFeed

The PolygonLiveDataFeed fetches real-time data from Polygon for paper and live trading modes.

#### Action
Create a test script `scripts/test-polygon-feed.ts`:
```typescript
import { PolygonLiveDataFeed } from '../src/live/PolygonLiveDataFeed';
import { formatNYDate, getNYNow } from '../src/lib/utils/dateUtils';

async function testPolygonFeed() {
    const feed = new PolygonLiveDataFeed();
    const today = formatNYDate(getNYNow());

    console.log(`Fetching snapshot for ${today}...`);
    const snapshot = await feed.getSnapshotForDate(today);

    if (snapshot) {
        console.log('✓ Snapshot fetched successfully');
        console.log(`  QQQ history length: ${snapshot.qqqHistory.length} days`);
        console.log(`  TQQQ price: $${snapshot.prices.TQQQ}`);
        console.log(`  SQQQ price: $${snapshot.prices.SQQQ}`);
    } else {
        console.error('✗ Failed to fetch snapshot');
    }
}

testPolygonFeed();
```

Run:
```bash
npx tsx scripts/test-polygon-feed.ts
```

#### Expected Output
```
Fetching snapshot for 2025-11-26...
✓ Snapshot fetched successfully
  QQQ history length: 250 days
  TQQQ price: $85.42
  SQQQ price: $6.78
```

#### Verification
- [ ] QQQ history contains 200+ days of data
- [ ] TQQQ and SQQQ prices are reasonable
- [ ] Snapshot includes all required fields
- [ ] No API errors

---

### Configuration Summary

| Mode | Required Variables | Use Case |
|------|-------------------|----------|
| **BACKTEST** | `POLYGON_API_KEY` | Historical analysis, no trading |
| **PAPER** | `POLYGON_API_KEY`<br>`ACCOUNTS` (with `isPaper: true`) | Simulated trading, no risk |
| **LIVE** | `POLYGON_API_KEY`<br>`ACCOUNTS` (with `isPaper: false`) | Real trading, real money |

Optional for all modes:
- `SLACK_TOKEN` - For trade notifications (Slack Bot User OAuth Token)

---

## Next Steps

After successful testing:
- Experiment with different date ranges in BACKTEST mode
- Test paper trading for at least 30 days before going live
- Analyze specific market periods (2020 crash, 2021 rally, etc.)
- Compare strategy vs benchmarks across different timeframes
- Review trade log for position sizing patterns
- Set up monitoring and alerts for live trading

---

**Last Updated**: 2025-11-26
**Version**: 2.0.0
