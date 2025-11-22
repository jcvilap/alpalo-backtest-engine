# Alpalo Backtest Engine - Complete Testing Guide for LLMs

This guide provides step-by-step instructions for running and testing the Alpalo Backtest Engine. Follow each step precisely and verify the expected outcomes.

---

## Prerequisites

Before starting, verify you have:
- **Node.js**: Version 18 or higher (`node --version`)
- **npm**: Version 8 or higher (`npm --version`)
- **Polygon API Key**: Free or paid account from [polygon.io](https://polygon.io)
- **Terminal Access**: Command line interface
- **Web Browser**: Modern browser (Chrome, Firefox, Safari, or Edge)

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
You should see: `package.json`, `src/`, `cache/`, `README.md`, etc.

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

## Step 4: Prefetch Historical Data (One-time Setup)

This step downloads 10 years of historical data for QQQ, TQQQ, and SQQQ from Polygon API.

### Action
```bash
npx tsx scripts/prefetch.ts
```

### Expected Output
```
Prefetching historical data...
Fetching QQQ from 2015-01-01...
✓ Saved 2513 records to cache/QQQ.json
Fetching TQQQ from 2015-01-01...
✓ Saved 2513 records to cache/TQQQ.json
Fetching SQQQ from 2015-01-01...
✓ Saved 2513 records to cache/SQQQ.json
Done!
```

### Verification
```bash
ls -lh cache/
```
Should show 3 JSON files:
- `QQQ.json` (~500KB - 1MB)
- `TQQQ.json` (~500KB - 1MB)
- `SQQQ.json` (~500KB - 1MB)

### Common Issues
- **Error: "Forbidden"** → Your API key may be invalid or rate-limited
- **Error: "ENOENT cache"** → Create the cache directory: `mkdir -p cache`
- **Partial data** → Polygon free tier may have data limits; premium keys get full history

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
- [x] Historical data cached (3 JSON files)
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

### Issue: Empty cache files
**Solution**: Re-run `npx tsx scripts/prefetch.ts` with valid API key

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

## Next Steps

After successful testing:
- Experiment with different date ranges
- Analyze specific market periods (2020 crash, 2021 rally, etc.)
- Compare strategy vs benchmarks across different timeframes
- Review trade log for position sizing patterns
- Export results (feature to be added)

---

**Last Updated**: 2025-11-22
**Version**: 1.0.0
