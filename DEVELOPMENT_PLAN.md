# Development Plan: Live Trading & Multi-Account Support

This plan outlines the steps to implement robust live trading with support for multiple Alpaca accounts (Paper and Live) running in parallel.

**Prerequisites**: Assumes Tasks 1-5 are complete (TradingMode config, Secrets, PolygonFeed, AlpacaClient, AlpacaBroker).

## Phase 1: Multi-Account Configuration

We need a structured way to define multiple accounts and their associated credentials.

### Task 1.1: Define Account Configuration Structure ✅ COMPLETED
**Goal**: Create a configuration module to parse and validate multiple accounts from environment variables using simplified ACCOUNTS format.
**Files**: `src/config/accounts.ts`
**Concept**:
- Define `AccountConfig` interface with simplified format:
  - `name`: string (e.g., "Account #1", "Live Trading")
  - `key`: string (Alpaca API key)
  - `secret`: string (Alpaca API secret)
  - `isPaper`: boolean (true for paper trading, false for live)
- Implement `getConfiguredAccounts()`:
  - Reads `ACCOUNTS` env var (JSON array with single-quote support)
  - Validation: Ensures all required fields are present and warns for LIVE accounts

**Implementation**:
- ✅ Created `AccountConfig` interface with simplified format
- ✅ Implemented `getConfiguredAccounts()` with ACCOUNTS env var support
- ✅ Added `parseEnvJson()` helper for single-quoted JSON parsing
- ✅ Added validation with warnings for live trading accounts
- ✅ Maintained backward compatibility with legacy env vars

**Example ACCOUNTS env var**:
```
ACCOUNTS='[
  {
    "name": "Account #1",
    "key": "LIVE_KEY_1",
    "secret": "LIVE_SECRET_1",
    "isPaper": false
  }
]'
```

---

## Phase 2: Notification Infrastructure

We need to send alerts for trade executions and errors, tagged by account.

### Task 2.1: Notification Port & Slack Adapter ✅ COMPLETED
**Goal**: Abstract notifications so we can send them to Slack (or log them).
**Files**: `src/ports/Notifier.ts`, `src/adapters/SlackNotifier.ts`
**Concept**:
- `Notifier` interface: `notify(subject: string, message: string, level: NotificationLevel, metadata?: any): Promise<void>`
- `SlackNotifier` implementation:
  - Uses Slack Web API with `SLACK_TOKEN` environment variable.
  - Routes messages to appropriate channels based on account type and severity:
    - `#alpalo-paper-account` / `#alpalo-paper-account-error` for paper trading
    - `#alpalo-live-account` / `#alpalo-live-account-error` for live trading
  - Prefixes messages with timestamp and environment (PROD/LOCAL).
  - Falls back to console logging if Slack is not configured.

**Implementation**:
- ✅ Created `Notifier` interface with `NotificationLevel` enum (INFO, WARN, ERROR)
- ✅ Implemented `SlackNotifier` with Slack Web API support
- ✅ Added channel routing based on account type (paper/live) and severity
- ✅ Implemented console fallback for when Slack is not configured
- ✅ Added timestamp and environment prefixing for notifications
- ✅ Included metadata field support for additional context

---

## Phase 3: Broker Factory & Safety

We need to instantiate brokers for specific accounts and enforce safety limits.

### Task 3.1: Broker Factory ✅ COMPLETED
**Goal**: Create a helper to instantiate an `AlpacaBroker` for a specific `AccountConfig`.
**Files**: `src/live/brokerFactory.ts`, `src/live/AlpacaBroker.ts`
**Concept**:
- `createBroker(config: AccountConfig): Broker`
- Instantiates `AlpacaClient` with the specific keys from `config`.
- Instantiates `AlpacaBroker` with that client.

**Implementation**:
- ✅ Created `AlpacaBroker` class implementing the `Broker` interface
- ✅ Implemented `getPortfolioState()` to fetch account and positions from Alpaca
- ✅ Implemented `placeOrders()` to execute orders via Alpaca API
- ✅ Implemented `getCurrentPrices()` to fetch current prices
- ✅ Created `brokerFactory.ts` with `createBroker()` function
- ✅ Updated `AlpacaClient` constructor to accept direct credentials (key, secret)
- ✅ Added `createBrokerWithCredentials()` helper function for direct credential injection
- ✅ Ensured broker is configured for correct mode (PAPER vs LIVE) based on `config.isPaper`

### Task 3.2: Safety Wrapper (Optional but Recommended)
**Goal**: Enforce "No Margin" and "Max Exposure" checks *before* orders go to Alpaca.
**Files**: `src/live/SafetyBroker.ts` (NEW)
**Concept**:
- Decorator pattern: Wraps a `Broker`.
- `placeOrders()`: Checks if `orders` violate constraints (e.g., shorting if disabled, position size > maxEquity).
- Throws error if unsafe.

**LLM Prompt**:
```text
Create src/live/SafetyBroker.ts implementing Broker.
It should wrap another Broker instance and an AccountConfig.
In `placeOrders`, checks:
1. If `config.settings.allowShorting` is false, reject SELL_SHORT orders.
2. If order value > `config.settings.maxEquity`, reject.
3. If valid, delegate to the wrapped broker.
In `getPortfolioState`, delegate to wrapped broker.
```

---

## Phase 4: Orchestration

Update the runner to handle the loop.

### Task 4.1: Update LiveRunner for Single Account
**Goal**: Ensure `LiveRunner` can run for a *specific* account and report results with context.
**Files**: `src/live/LiveRunner.ts`
**Concept**:
- Update `constructor` to take `notifier: Notifier` and `config: AccountConfig`.
- In `runOnce()`:
  - Notify "Starting run for [AccountID]".
  - Execute strategy.
  - Notify decisions and orders.
  - Catch errors and Notify "FAILED run for [AccountID]".

**LLM Prompt**:
```text
Refactor src/live/LiveRunner.ts.
Inject `Notifier` and `AccountConfig` into the constructor.
Update `runOnce` to:
1. Send a "Starting" notification.
2. Wrap execution in try/catch.
3. On success, send a summary notification (Decision made, Orders placed).
4. On error, send an ERROR notification with the stack trace.
Ensure all logs/notifications are prefixed with the Account ID.
```

### Task 4.2: Multi-Account Entrypoint
**Goal**: The main script that orchestrates the entire process.
**Files**: `src/scripts/trade-live.ts` (NEW)
**Concept**:
- Load `AccountConfig[]`.
- Initialize `PolygonLiveDataFeed` (shared).
- Loop through accounts (sequentially to avoid rate limits or race conditions, or parallel if safe).
- For each account:
  - Create Broker (via Factory).
  - Create LiveRunner.
  - `await runner.runOnce()`.
- Handle global errors.

**LLM Prompt**:
```text
Create src/scripts/trade-live.ts.
This is the main entrypoint for the cron job.
1. Initialize PolygonLiveDataFeed (shared).
2. Get accounts from `getConfiguredAccounts()`.
3. Iterate over each account:
   - Create a Notifier.
   - Create a Broker using `createBroker`.
   - Initialize `LiveRunner`.
   - Run `runner.runOnce()`.
4. Add a delay between accounts to be nice to APIs.
5. Ensure the process exits with 0 only if ALL accounts succeeded, or 1 if any failed.
```

---

## Phase 5: Deployment & Operations

### Task 5.1: Market Schedule Check
**Goal**: Ensure we only run when the market is actually open/closing.
**Files**: `src/lib/market/schedule.ts` (NEW)
**Concept**:
- Use Alpaca's Clock API (via a generic client) to check `is_open` and `next_close`.
- If `next_close` is > 15 minutes away, maybe warn or skip (depending on strategy logic - usually we trade MOC).

**LLM Prompt**:
```text
Create src/lib/market/schedule.ts.
Export `isMarketOpen(alpacaClient): Promise<boolean>` and `getTimeToClose(alpacaClient): Promise<number>`.
Update `src/scripts/trade-live.ts` to check this before running.
If market is closed, log and exit.
If time to close is > 20 mins, log a warning (since this strategy is typically MOC).
```

### Task 5.2: GitHub Actions / Cron Config (Conceptual)
**Goal**: Define how this runs.
**Files**: `docs/DEPLOYMENT.md` (NEW)
**Concept**:
- Document the `cron` schedule (e.g., `45 15 * * 1-5` for 3:45 PM ET).
- Document the required Env Vars (`POLYGON_API_KEY`, `TRADING_ACCOUNTS_CONFIG`, `SLACK_TOKEN`).

**LLM Prompt**:
```text
Create docs/DEPLOYMENT.md.
Document how to deploy this to DigitalOcean or a server.
1. Install Node/pnpm.
2. Set environment variables (list them all).
3. Setup crontab entry for 3:45 PM ET.
4. Example JSON for `TRADING_ACCOUNTS_CONFIG`.
```
