/**
 * Secrets and Configuration Management
 *
 * This module provides typed helpers to read and validate environment variables
 * for external services (Polygon, Slack).
 *
 * Note: Alpaca/broker credentials are now managed via the ACCOUNTS environment
 * variable in src/config/accounts.ts, not here.
 *
 * No network calls are performed here - this is purely for env parsing and validation.
 */

/**
 * Polygon API Configuration
 */
export interface PolygonConfig {
    apiKey: string;
}

/**
 * Slack Webhook Configuration
 */
export interface SlackConfig {
    webhookUrl: string;
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
 * Get Slack webhook configuration from environment variables
 *
 * @returns Slack configuration with webhook URL
 * @throws Error if SLACK_WEBHOOK_URL is not set
 */
export function getSlackConfig(): SlackConfig {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!webhookUrl) {
        throw new Error('SLACK_WEBHOOK_URL environment variable is not set');
    }

    return { webhookUrl };
}

/**
 * Check if Slack notifications are configured
 *
 * @returns True if SLACK_WEBHOOK_URL is set, false otherwise
 */
export function isSlackConfigured(): boolean {
    return !!process.env.SLACK_WEBHOOK_URL;
}
