# Alpalo Backtest Engine

[**Live Demo**](https://alpalo-backtest-engine.vercel.app)

A professional-grade trading system with backtesting, paper trading, and live trading capabilities. Built with Next.js, TypeScript, and modern data visualization tools to provide comprehensive performance analytics and automated trading execution.

## Demo

![Demo](docs/demo.png)

## Features

### Performance Analytics
- **Comprehensive Metrics**: Total Return, CAGR, Max Drawdown, Win Rate, and Average Position Size
- **Benchmark Comparisons**: Compare strategy performance against QQQ (Nasdaq-100 ETF) and TQQQ (3x leveraged)
- **Visual Equity Curve**: Track strategy performance over time with interactive charts

### Trade Analysis
- **Detailed Trade Log**: Complete history of all trades with entry/exit dates, returns, and position sizing
- **Position Tracking**: Monitor portfolio allocation percentages and trade-level returns
- **Performance Breakdown**: Analyze wins, losses, and holding periods

### Monthly Performance Matrix
- **Heatmap View**: Monthly returns displayed in an intuitive color-coded grid
- **Year-over-Year Analysis**: Compare performance across different years
- **Sortable Columns**: Sort by year or YTD performance

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Data Visualization**: Recharts for interactive charts
- **Data Source**: Polygon API for historical market data
- **Styling**: Tailwind CSS with custom design system

## Getting Started

### Prerequisites
- Node.js 18+
- Polygon API key (for market data)
- Alpaca API credentials (for paper/live trading)

### Installation

```bash
# Clone the repository
git clone https://github.com/jcvilap/alpalo-backtest-engine.git
cd alpalo-backtest-engine

# Install dependencies
npm install

# Configure environment variables
cat > .env.local << EOF
# Required: Polygon API for market data
POLYGON_API_KEY=your_polygon_api_key_here

# Trading Mode (BACKTEST | PAPER | LIVE)
TRADING_MODE=BACKTEST

# Paper Trading Credentials (optional, for PAPER mode)
PAPER_ALPACA_KEY_ID=your_paper_key_id
PAPER_ALPACA_SECRET_KEY=your_paper_secret_key

# Live Trading Credentials (optional, for LIVE mode)
LIVE_ALPACA_KEY_ID=your_live_key_id
LIVE_ALPACA_SECRET_KEY=your_live_secret_key

# Slack Notifications (optional)
SLACK_WEBHOOK_URL=your_slack_webhook_url
EOF

# Prefetch historical data (run once)
npx tsx scripts/prefetch.ts

# Start development server
npm run dev
```

Open [http://localhost:3003](http://localhost:3003) to view the application.

## Usage

### Backtesting Mode (Default)

1. **Select Date Range**: Choose start and end dates for your backtest period (data available from 2015-2025)
2. **Run Backtest**: Click "Run Backtest" to execute the analysis
3. **Review Results**: Explore performance metrics, equity curves, trade logs, and monthly returns across three tabs

### Trading Modes

The system supports three operating modes, configured via the `TRADING_MODE` environment variable:

#### 1. BACKTEST (Default)
- Analyzes historical performance using cached market data
- No real money involved
- Fast execution with pre-loaded data
- Ideal for strategy testing and optimization

```bash
TRADING_MODE=BACKTEST npm run dev
```

#### 2. PAPER
- Simulated trading with live market data
- Orders are executed via Alpaca's paper trading API
- No real money at risk
- Full trading simulation for strategy validation

```bash
# Set environment variables
TRADING_MODE=PAPER
PAPER_ALPACA_KEY_ID=your_paper_key
PAPER_ALPACA_SECRET_KEY=your_paper_secret

npm run dev
```

#### 3. LIVE
- Real trading with actual capital
- Orders executed on live markets via Alpaca API
- ⚠️ **USE WITH CAUTION** - Real money at risk
- Requires live trading credentials

```bash
# Set environment variables
TRADING_MODE=LIVE
LIVE_ALPACA_KEY_ID=your_live_key
LIVE_ALPACA_SECRET_KEY=your_live_secret

npm run dev
```

## Project Structure

```
├── cache/              # Cached historical market data
├── scripts/            # Data fetching and testing utilities
├── src/
│   ├── app/           # Next.js app directory
│   │   └── api/       # Backend API routes
│   ├── backtest/      # Backtesting implementation
│   │   ├── BacktestDataFeed.ts    # Historical data adapter
│   │   ├── BacktestBroker.ts      # Simulated order execution
│   │   └── BacktestRunner.ts      # Backtest orchestration
│   ├── components/    # React UI components
│   ├── config/        # Configuration and environment management
│   │   ├── env.ts                 # Trading mode configuration
│   │   └── secrets.ts             # API credentials management
│   ├── lib/           # Core logic (strategy, backtest engine, data client)
│   ├── live/          # Live and paper trading implementation
│   │   ├── PolygonLiveDataFeed.ts # Live market data adapter
│   │   ├── alpacaClient.ts        # Alpaca REST API client
│   │   └── LiveRunner.ts          # Live trading orchestration
│   ├── ports/         # Interface definitions (Ports & Adapters pattern)
│   │   ├── DataFeed.ts            # Data source interface
│   │   └── Broker.ts              # Order execution interface
│   └── strategy/      # Pure strategy engine
│       ├── engine.ts              # Core strategy logic
│       └── types.ts               # Strategy type definitions
└── package.json
```

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## License

MIT

## Author

**Julio C Vila** - [GitHub](https://github.com/jcvilap)

## Acknowledgments

- Market data provided by [Polygon.io](https://polygon.io)
- Charts powered by [Recharts](https://recharts.org)
