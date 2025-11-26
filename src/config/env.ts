/**
 * Trading Mode Configuration
 *
 * Defines the trading mode for the application (BACKTEST, PAPER, or LIVE).
 * This allows the system to adapt behavior based on the environment.
 */

/**
 * Trading mode enumeration
 *
 * - BACKTEST: Historical backtesting mode (default)
 * - PAPER: Paper trading with live data but simulated orders
 * - LIVE: Live trading with real money
 */
export enum TradingMode {
    BACKTEST = 'BACKTEST',
    PAPER = 'PAPER',
    LIVE = 'LIVE'
}

/**
 * Get the current trading mode from environment variables
 *
 * Reads the TRADING_MODE environment variable and validates it.
 * Defaults to BACKTEST if the variable is not set or invalid.
 *
 * @returns The current trading mode
 *
 * @example
 * ```typescript
 * const mode = getTradingMode();
 * if (mode === TradingMode.LIVE) {
 *   console.log('Running in live trading mode');
 * }
 * ```
 */
export function getTradingMode(): TradingMode {
    const mode = process.env.TRADING_MODE?.toUpperCase();

    if (!mode) {
        return TradingMode.BACKTEST;
    }

    // Validate the mode
    if (mode === TradingMode.BACKTEST || mode === TradingMode.PAPER || mode === TradingMode.LIVE) {
        return mode as TradingMode;
    }

    console.warn(`Invalid TRADING_MODE '${mode}', defaulting to BACKTEST. Valid values: BACKTEST, PAPER, LIVE`);
    return TradingMode.BACKTEST;
}
