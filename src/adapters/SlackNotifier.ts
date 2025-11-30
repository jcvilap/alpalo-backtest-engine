/**
 * Slack Notifier Adapter
 *
 * Implements the Notifier interface using the Slack Web API.
 * Sends messages to configured channels based on the environment (Live vs Paper).
 */

import { WebClient } from '@slack/web-api';
import { Notifier, NotificationLevel } from '@/ports/Notifier';
import { getSlackConfig, isSlackConfigured } from '@/config/secrets';

export class SlackNotifier implements Notifier {
    private client: WebClient | null = null;
    private isLive: boolean;

    constructor(isLive: boolean = false) {
        this.isLive = isLive;

        if (isSlackConfigured()) {
            try {
                const config = getSlackConfig();
                this.client = new WebClient(config.token);
            } catch (error) {
                console.warn('Failed to initialize Slack client:', error);
            }
        } else {
            console.warn('Slack is not configured. Notifications will only be logged to console.');
        }
    }

    /**
     * Send a notification to Slack and log to console
     */
    async notify(subject: string, message: string, level: NotificationLevel, metadata?: Record<string, unknown>): Promise<void> {
        // Always log to console
        this.logToConsole(subject, message, level, metadata);

        // If Slack is not configured or client failed to init, skip
        if (!this.client) return;

        try {
            const channel = this.getChannel(level);
            const formattedMessage = this.formatMessage(subject, message, level, metadata);

            await this.client.chat.postMessage({
                channel,
                text: formattedMessage,
                // Use blocks for better formatting if needed, but text is safer for now
            });
        } catch (error) {
            console.error('Failed to send Slack notification:', error);
        }
    }

    /**
     * Determine the target channel based on environment and level
     */
    private getChannel(level: NotificationLevel): string {
        if (level === 'ERROR') {
            return this.isLive ? '#alpalo-live-account-error' : '#alpalo-paper-account-error';
        }
        return this.isLive ? '#alpalo-live-account' : '#alpalo-paper-account';
    }

    /**
     * Format the message for Slack
     */
    private formatMessage(subject: string, message: string, level: NotificationLevel, metadata?: Record<string, unknown>): string {
        const prefix = this.getPrefix(level);
        let text = `${prefix} *${subject}*\n${message}`;

        if (metadata) {
            text += `\n\`\`\`${JSON.stringify(metadata, null, 2)}\`\`\``;
        }

        return text;
    }

    /**
     * Get a prefix with timestamp and environment
     */
    private getPrefix(level: NotificationLevel): string {
        const timestamp = new Date().toLocaleTimeString('en-US', {
            timeZone: 'America/New_York',
        });
        const env = this.isLive ? 'LIVE' : 'PAPER';
        const icon = level === 'ERROR' ? '🔴' : level === 'WARN' ? '⚠️' : '🟢';

        return `\`[${env}][${timestamp}]\` ${icon}`;
    }

    /**
     * Log to console with appropriate level
     */
    private logToConsole(subject: string, message: string, level: NotificationLevel, metadata?: Record<string, unknown>): void {
        const logFn = level === 'ERROR' ? console.error : level === 'WARN' ? console.warn : console.log;
        logFn(`[${level}] ${subject}: ${message}`, metadata || '');
    }
}
