/**
 * Secrets Management
 *
 * Handles secure access to API keys and tokens from environment variables.
 */

/**
 * Polygon API Configuration
 */
export interface PolygonConfig {
    apiKey: string;
}

/**
 * Alpaca API Configuration
 */
export interface AlpacaConfig {
    keyId: string;
    secretKey: string;
    baseUrl: string;
}

/**
 * Slack Configuration
 */
export interface SlackConfig {
    token: string;
}

/**
 * Get Polygon API configuration from environment variables
 *
 * @returns Polygon configuration with API key
 * @throws Error if POLYGON_API_KEY is not set
 */
export function getPolygonConfig(): PolygonConfig {
    const apiKey = process.env.POLYGON_API_KEY;

    if (!apiKey) {
        throw new Error('POLYGON_API_KEY environment variable is not set');
    }

    return { apiKey };
}

/**
 * Get Alpaca configuration for paper trading
 *
 * Reads paper trading credentials from environment variables.
 *
 * @returns Alpaca paper trading configuration
 * @throws Error if required environment variables are not set
 */
export function getAlpacaPaperConfig(): AlpacaConfig {
    const keyId = process.env.PAPER_ALPACA_KEY_ID;
    const secretKey = process.env.PAPER_ALPACA_SECRET_KEY;

    if (!keyId) {
        throw new Error('PAPER_ALPACA_KEY_ID environment variable is not set');
    }

    if (!secretKey) {
        throw new Error('PAPER_ALPACA_SECRET_KEY environment variable is not set');
    }

    return {
        keyId,
        secretKey,
        baseUrl: 'https://paper-api.alpaca.markets'
    };
}

/**
 * Get Alpaca configuration for live trading
 *
 * Reads live trading credentials from environment variables.
 *
 * @returns Alpaca live trading configuration
 * @throws Error if required environment variables are not set
 */
export function getAlpacaLiveConfig(): AlpacaConfig {
    const keyId = process.env.LIVE_ALPACA_KEY_ID;
    const secretKey = process.env.LIVE_ALPACA_SECRET_KEY;

    if (!keyId) {
        throw new Error('LIVE_ALPACA_KEY_ID environment variable is not set');
    }

    if (!secretKey) {
        throw new Error('LIVE_ALPACA_SECRET_KEY environment variable is not set');
    }

    return {
        keyId,
        secretKey,
        baseUrl: 'https://api.alpaca.markets'
    };
}

/**
 * Get Alpaca configuration based on the current trading mode
 *
 * This is the primary helper for getting Alpaca credentials.
 * In PAPER or BACKTEST mode, returns paper credentials.
 * In LIVE mode, returns live credentials.
 *
 * @param isPaper - Whether to use paper trading credentials (default: true)
 * @returns Alpaca configuration
 * @throws Error if required environment variables are not set
 */
export function getAlpacaConfig(isPaper: boolean = true): AlpacaConfig {
    return isPaper ? getAlpacaPaperConfig() : getAlpacaLiveConfig();
}

/**
 * Get Slack API Token from environment variables
 *
 * @returns Slack configuration with API token
 * @throws Error if SLACK_TOKEN is not set
 */
export function getSlackConfig(): SlackConfig {
    const token = process.env.SLACK_TOKEN;

    if (!token) {
        throw new Error('SLACK_TOKEN environment variable is not set');
    }

    return { token };
}

/**
 * Check if Slack notifications are configured
 *
 * @returns True if SLACK_TOKEN is set, false otherwise
 */
export function isSlackConfigured(): boolean {
    return !!process.env.SLACK_TOKEN;
}
