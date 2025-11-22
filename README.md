# Alpalo Backtest Engine

A professional-grade backtesting platform for analyzing trading strategies with historical market data. Built with Next.js, TypeScript, and modern data visualization tools to provide comprehensive performance analytics.

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

### Installation

```bash
# Clone the repository
git clone https://github.com/jcvilap/alpalo-backtest-engine.git
cd alpalo-backtest-engine

# Install dependencies
npm install

# Configure environment variables
echo "POLYGON_API_KEY=your_api_key_here" > .env.local

# Prefetch historical data (run once)
npx tsx scripts/prefetch.ts

# Start development server
npm run dev
```

Open [http://localhost:3003](http://localhost:3003) to view the application.

## Usage

1. **Select Date Range**: Choose start and end dates for your backtest period (data available from 2015-2025)
2. **Run Backtest**: Click "Run Backtest" to execute the analysis
3. **Review Results**: Explore performance metrics, equity curves, trade logs, and monthly returns across three tabs

## Project Structure

```
├── cache/              # Cached historical market data
├── scripts/            # Data fetching utilities
├── src/
│   ├── app/           # Next.js app directory
│   │   └── api/       # Backend API routes
│   ├── components/    # React UI components
│   └── lib/           # Core logic (strategy, backtest engine, data client)
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
