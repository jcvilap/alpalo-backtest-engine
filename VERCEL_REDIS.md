# Vercel KV (Redis) Migration Guide

This guide details how to migrate the current file-based caching system (`cache/*.json`) to Vercel KV (Redis) for persistent, serverless storage.

## 1. Vercel Setup Instructions (User Action Required)

Before implementing the code changes, you need to provision a Vercel KV database.

1.  **Log in to Vercel**: Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  **Navigate to Storage**: Click on the "Storage" tab at the top.
3.  **Create Database**:
    -   Click "Create Database".
    -   Select **KV (Redis)**.
    -   Give it a name (e.g., `alpalo-cache-kv`).
    -   Select a region (choose the one closest to your function region, usually `iad1` for US East).
4.  **Link to Project**:
    -   In the "Link to Project" step, select your `alpalo-backtest-engine` project.
    -   This will automatically add the necessary environment variables (`KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, etc.) to your project.
5.  **Local Development (Optional)**:
    -   To test KV locally, you can pull the environment variables:
        ```bash
        vercel env pull .env.local
        ```
    -   *Note: The implementation below preserves local file caching for development to save on KV request limits, so this step is optional.*

---

## 2. Implementation Plan

The goal is to refactor `PolygonClient` to use a "Hybrid Caching Strategy":
-   **Development (`NODE_ENV=development`)**: Continue using the local file system (`cache/` folder). This is free, fast, and easy to debug.
-   **Production (`NODE_ENV=production`)**: Use Vercel KV. This avoids the need to commit cache files and provides persistence across deployments.

### Dependencies
You will need to install the Vercel KV SDK:
```bash
pnpm add @vercel/kv
```

### Code Changes
Refactor `src/lib/polygon/client.ts`:
1.  Import `kv` from `@vercel/kv`.
2.  Update `loadCache` to check `process.env.KV_REST_API_URL` (or `NODE_ENV`).
    -   If Prod: `await kv.get<OHLC[]>(ticker)`
    -   If Dev: Read from file system (existing logic).
3.  Update `saveCache` to write to the appropriate store.
    -   If Prod: `await kv.set(ticker, data)`
    -   If Dev: Write to file system (existing logic).

---

## 3. LLM Prompt

Use the following prompt to have an AI assistant implement the changes for you.

```markdown
# Task: Migrate PolygonClient Cache to Vercel KV

**Objective**: Refactor `src/lib/polygon/client.ts` to support a hybrid caching mechanism using Vercel KV for production and the local file system for development.

**Context**:
Currently, `PolygonClient` stores market data (OHLC) in local JSON files within the `cache/` directory. We want to move this to Vercel KV (Redis) in production to avoid committing cache files and to ensure persistence in a serverless environment.

**Requirements**:
1.  **Install Dependency**: I will run `pnpm add @vercel/kv` myself, assume it is available.
2.  **Hybrid Logic**:
    -   Check `process.env.KV_REST_API_URL` and `process.env.NODE_ENV`.
    -   **IF** `KV_REST_API_URL` is present AND `NODE_ENV === 'production'`: Use Vercel KV.
    -   **ELSE**: Fallback to the existing local file system logic (`fs.readFileSync`, `fs.writeFileSync`).
3.  **Refactor Methods**:
    -   Update `loadCache(ticker)` to be `async` and fetch from KV in production.
    -   Update `saveCache(ticker, data)` to be `async` and write to KV in production.
    -   Ensure all callers of these methods (e.g., `fetchAggregates`) await them properly.
4.  **Data Structure**:
    -   The cache key in KV should be the ticker symbol (e.g., `"QQQ"`).
    -   The value should be the JSON array of OHLC objects, exactly as it is currently stored in the files.
5.  **Error Handling**:
    -   If KV operations fail, log an error but try to proceed (or fallback to fetching fresh data if loading fails).

**Files to Modify**:
-   `src/lib/polygon/client.ts`

Please implement these changes ensuring type safety and minimal disruption to the existing logic.
```
