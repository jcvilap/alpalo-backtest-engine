# Redis Cache Implementation Guide

This guide details the Redis-based caching system used for persistent storage of market data and calendar information.

## Overview

The `PolygonClient` uses Redis exclusively for caching:
- **OHLC market data** (historical price data for tickers)
- **Market calendars** (trading days and holidays)

This ensures fast, persistent caching across all environments (local development and production) without relying on file systems.

---

## 1. Setup Instructions

### Option A: Use Your Own Redis Instance (Recommended for Local Development)

You can use any Redis provider:
- **Redis Labs** (cloud.redislabs.com)
- **Upstash** (upstash.com)
- **Local Redis** (docker or installed)
- **AWS ElastiCache**
- **Any other Redis provider**

#### Example: Redis Labs
1. Sign up at [Redis Labs](https://redis.com/try-free/)
2. Create a new database
3. Copy the connection URL (format: `redis://username:password@host:port`)
4. Add to your `.env` file:
   ```bash
   REDIS_URL="redis://default:YOUR_PASSWORD@your-host.cloud.redislabs.com:PORT"
   ```

#### Example: Local Redis (Docker)
```bash
docker run -d -p 6379:6379 redis:7-alpine
```
Then add to `.env`:
```bash
REDIS_URL="redis://localhost:6379"
```

### Option B: Use Vercel KV (Production Only)

For Vercel deployments, you can use Vercel's managed KV service:

1. **Log in to Vercel**: Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. **Navigate to Storage**: Click "Storage" tab
3. **Create Database**:
   - Click "Create Database"
   - Select **KV (Redis)**
   - Name it (e.g., `alpalo-cache`)
   - Select a region (e.g., `iad1` for US East)
4. **Link to Project**:
   - Select your `alpalo-backtest-engine` project
   - Vercel will add `KV_REST_API_URL`, `KV_REST_API_TOKEN`, etc.
5. **Convert to Traditional Redis**:
   - Vercel KV provides both REST API and traditional Redis protocol
   - Set `REDIS_URL` to the Redis protocol endpoint (check Vercel KV dashboard for the Redis URL)

---

## 2. Environment Configuration

Add the following to your `.env` file:

```bash
# Redis Configuration
REDIS_URL="redis://default:password@host:port"

# Polygon API (required for fetching market data)
POLYGON_API_KEY="your_polygon_api_key"
```

---

## 3. Implementation Details

### Redis Client

The system uses the official `redis` package (node-redis):

```typescript
import { createClient } from 'redis';

const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();
```

### Cache Keys

The system uses the following Redis key patterns:

1. **OHLC Data**: `ohlc:{TICKER}`
   - Example: `ohlc:QQQ`, `ohlc:SPY`
   - Value: JSON array of OHLC objects

2. **Market Calendar**: `market-calendar-{YEAR}`
   - Example: `market-calendar-2024`
   - Value: JSON object with holidays and trading days

### Caching Strategy

**PolygonClient** implements intelligent caching:

1. **Cache-First**: Always checks Redis before fetching from API
2. **Partial Updates**: Only fetches missing date ranges
3. **Deduplication**: Removes duplicate entries automatically
4. **Today's Data**: Excludes today's data until after market close (4:00 PM ET)

### Example Flow

```
1. Request: fetchAggregates('QQQ', '2024-01-01', '2024-12-31')
2. Check Redis for 'ohlc:QQQ'
3. If cache exists:
   - Return cached data if it covers the requested range
   - Fetch only missing dates if partial
4. If cache empty:
   - Fetch from Polygon API
   - Save to Redis
5. Return data
```

---

## 4. Testing Your Setup

Run the test script to verify Redis connection:

```bash
pnpm exec tsx test-redis.ts
```

This will:
- ✓ Connect to Redis
- ✓ Write and read simple values
- ✓ Write and read OHLC data
- ✓ Write and read calendar data
- ✓ Verify data persistence

---

## 5. Monitoring and Debugging

### Check Redis Connection

The `PolygonClient` logs connection status:

```
[REDIS] Connected successfully
```

If Redis is not configured:
```
[REDIS] No REDIS_URL found - caching disabled
[POLYGON] Redis not configured - OHLC caching disabled
```

### Cache Operations

Monitor cache operations in logs:

```
[CACHE] Saved 252 records for QQQ to Redis
[CACHE EMPTY] SPY: Fetching fresh data
[CACHE HIT] QQQ: 2024-01-01 to 2024-12-31
```

---

## 6. Benefits of Redis Caching

1. **Performance**: Sub-millisecond read times
2. **Persistence**: Data survives application restarts
3. **Scalability**: Shared cache across multiple instances
4. **Cost Savings**: Reduces API calls to Polygon.io
5. **Flexibility**: Works in any environment (local, staging, production)

---

## 7. Troubleshooting

### "Redis not available" warnings

**Cause**: `REDIS_URL` environment variable not set

**Solution**: Add `REDIS_URL` to your `.env` file

### Connection errors

**Cause**: Invalid Redis URL or network issues

**Solution**:
- Verify the URL format: `redis://[username:password@]host:port`
- Check firewall/security group settings
- Test connection with `redis-cli` or the test script

### Cache not updating

**Cause**: Data was cached and hasn't changed

**Solution**:
- Redis caches are persistent - this is expected behavior
- To force refresh, delete the Redis key: `DEL ohlc:TICKER`
- Or flush all cache: `FLUSHDB` (use with caution!)

---

## 8. Production Considerations

### Security
- Never commit `.env` files with credentials
- Use environment variables in production
- Rotate Redis passwords regularly
- Use SSL/TLS connections in production (rediss:// protocol)

### Performance
- Consider setting TTL (time-to-live) for cache entries
- Monitor Redis memory usage
- Use Redis persistence (RDB/AOF) for data durability

### Monitoring
- Set up alerts for Redis connection failures
- Monitor cache hit/miss ratios
- Track Redis memory usage and eviction policies

---

## Summary

The Redis caching system provides:
- ✅ Fast, persistent caching for market data
- ✅ Environment-agnostic (works locally and in production)
- ✅ Intelligent partial cache updates
- ✅ Automatic deduplication and sorting
- ✅ Graceful fallback if Redis unavailable
