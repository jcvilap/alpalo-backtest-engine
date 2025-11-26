# Development Plan: Live Trading & Multi-Account Support

This plan outlines the steps to implement robust live trading with support for multiple Alpaca accounts (Paper and Live) running in parallel.

**Prerequisites**: Assumes Tasks 1-5 are complete (TradingMode config, Secrets, PolygonFeed, AlpacaClient, AlpacaBroker).

## Phase 1: Multi-Account Configuration

We need a structured way to define multiple accounts and their associated credentials.

### Task 1.1: Define Account Configuration Structure
**Goal**: Create a configuration module to parse and validate multiple accounts from environment variables.
**Files**: `src/config/accounts.ts` (NEW), `src/config/types.ts` (NEW or existing)
**Concept**:
- Define `AccountConfig` interface:
  - `id`: string (e.g., "PAPER_1", "LIVE_MAIN")
  - `mode`: TradingMode (PAPER | LIVE)
  - `alpaca`: { keyId: string, secretKey: string }
  - `settings`: { maxPositionSize: number, isDryRun: boolean }
- Implement `getConfiguredAccounts()`:
  - Reads env vars like `ALPACA_ACCOUNTS_JSON` (array of configs) OR parses prefixed env vars (e.g., `ACC_1_KEY_ID`, `ACC_1_MODE`).
  - *Recommendation*: Use a JSON-based env var `TRADING_ACCOUNTS` for flexibility, or a fixed structure if simpler. Let's go with a robust helper that can read individual sets if JSON is too complex for .env files, but JSON is standard for lists.
  - Validation: Ensure no LIVE account is configured without explicit safety flags.

**LLM Prompt**:
```text
Create src/config/accounts.ts.
Define an interface `AccountConfig` containing:
- id: string
- mode: TradingMode (import from ./env)
- alpaca: { keyId: string, secretKey: string }
- settings: { maxEquity: number, allowShorting: boolean }

Implement a function `getConfiguredAccounts(): AccountConfig[]`.
It should read `process.env.TRADING_ACCOUNTS_CONFIG` (a JSON string).
If that is missing, it should look for default single-account env vars (PAPER_ALPACA_KEY_ID, etc) and return a single "DEFAULT_PAPER" account config for backward compatibility.
Add validation to ensure keys are present.
```

---

## Phase 2: Notification Infrastructure

We need to send alerts for trade executions and errors, tagged by account.

### Task 2.1: Notification Port & Slack Adapter
**Goal**: Abstract notifications so we can send them to Slack (or log them).
**Files**: `src/ports/Notifier.ts` (NEW), `src/adapters/SlackNotifier.ts` (NEW)
**Concept**:
- `Notifier` interface: `notify(message: string, level: 'INFO'|'ERROR', metadata?: any): Promise<void>`
- `SlackNotifier` implementation:
  - Uses `src/config/secrets.ts` to get webhook URL.
  - Formats messages nicely (e.g., Green for buys, Red for sells/errors).
  - Prefixes messages with the Account ID.

**LLM Prompt**:
```text
Create a Notifier port in src/ports/Notifier.ts with a method `notify(subject: string, message: string, level: 'INFO'|'WARN'|'ERROR')`.
Create src/adapters/SlackNotifier.ts implementing this port.
It should read the Slack webhook URL from src/config/secrets.ts.
If no URL is configured, it should log to console only.
Ensure the message format is clean and supports markdown if Slack allows it.
```

---

## Phase 3: Broker Factory & Safety

We need to instantiate brokers for specific accounts and enforce safety limits.

### Task 3.1: Broker Factory
**Goal**: Create a helper to instantiate an `AlpacaBroker` for a specific `AccountConfig`.
**Files**: `src/live/brokerFactory.ts` (NEW)
**Concept**:
- `createBroker(config: AccountConfig): Broker`
- Instantiates `AlpacaClient` with the specific keys from `config`.
- Instantiates `AlpacaBroker` with that client.

**LLM Prompt**:
```text
Create src/live/brokerFactory.ts.
Export a function `createBroker(config: AccountConfig): Broker`.
It should instantiate the AlpacaClient (from Task 4) using the credentials in `config`.
Then it should instantiate and return an AlpacaBroker (from Task 5) using that client.
Ensure the broker is configured for the correct mode (PAPER vs LIVE) based on config.mode.
```

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
- Document the required Env Vars (`POLYGON_API_KEY`, `TRADING_ACCOUNTS_CONFIG`, `SLACK_WEBHOOK_URL`).

**LLM Prompt**:
```text
Create docs/DEPLOYMENT.md.
Document how to deploy this to DigitalOcean or a server.
1. Install Node/pnpm.
2. Set environment variables (list them all).
3. Setup crontab entry for 3:45 PM ET.
4. Example JSON for `TRADING_ACCOUNTS_CONFIG`.
```
