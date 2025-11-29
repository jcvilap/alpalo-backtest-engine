/**
 * Slack Notifier Adapter
 *
 * Sends notifications to Slack via Web API.
 * Falls back to console logging if Slack is not configured.
 */

import { WebClient } from '@slack/web-api';
import { Notifier, NotificationLevel } from '../ports/Notifier';

/**
 * Slack Notifier Implementation
 *
 * Sends formatted notifications to Slack using the Web API.
 * Routes messages to appropriate channels based on account type and message level.
 * If Slack is not configured, falls back to console logging.
 */
export class SlackNotifier implements Notifier {
    private slackClient: WebClient | null;
    private isPaper: boolean;
    private accountName?: string;

    /**
     * Create a new Slack notifier
     *
     * @param accountName - Optional account name to prefix notifications
     * @param isPaper - Whether this is a paper trading account (determines channel routing)
     */
    constructor(accountName?: string, isPaper: boolean = true) {
        this.accountName = accountName;
        this.isPaper = isPaper;

        const token = process.env.SLACK_TOKEN;
        if (!token) {
            console.log('Slack token not configured. Notifications will be logged to console only.');
            this.slackClient = null;
        } else {
            this.slackClient = new WebClient(token);
        }
    }

    /**
     * Send a notification to Slack or console
     */
    async notify(
        subject: string,
        message: string,
        level: NotificationLevel,
        metadata?: Record<string, unknown>
    ): Promise<void> {
        // Prefix subject with account name if provided
        const fullSubject = this.accountName ? `[${this.accountName}] ${subject}` : subject;

        // If Slack is not configured, log to console
        if (!this.slackClient) {
            this.logToConsole(fullSubject, message, level, metadata);
            return;
        }

        try {
            await this.sendToSlack(fullSubject, message, level, metadata);
        } catch (error) {
            // If Slack fails, fall back to console
            console.error('Failed to send Slack notification:', error);
            this.logToConsole(fullSubject, message, level, metadata);
        }
    }

    /**
     * Send notification to Slack via Web API
     */
    private async sendToSlack(
        subject: string,
        message: string,
        level: NotificationLevel,
        metadata?: Record<string, unknown>
    ): Promise<void> {
        const channel = this.getChannel(level);
        const prefix = this.getPrefix();

        // Format the message
        let text = `${prefix} ${subject}\n${message}`;

        // Add metadata if provided
        if (metadata && Object.keys(metadata).length > 0) {
            text += '\n\n*Metadata:*';
            Object.entries(metadata).forEach(([key, value]) => {
                text += `\n• *${key}:* ${value}`;
            });
        }

        await this.slackClient!.chat.postMessage({
            channel,
            text,
        });
    }

    /**
     * Determine the appropriate Slack channel based on account type and level
     */
    private getChannel(level: NotificationLevel): string {
        const isError = level === NotificationLevel.ERROR;

        if (this.isPaper) {
            return isError ? '#alpalo-paper-account-error' : '#alpalo-paper-account';
        } else {
            return isError ? '#alpalo-live-account-error' : '#alpalo-live-account';
        }
    }

    /**
     * Get formatted timestamp prefix for messages
     */
    private getPrefix(): string {
        const timestamp = new Date().toLocaleTimeString('en-US', {
            timeZone: 'America/New_York',
        });
        const env = process.env.NODE_ENV === 'production' ? 'PROD' : 'LOCAL';
        return `\`[${env}][${timestamp.replace(' ', '')}]\``;
    }

    /**
     * Log notification to console (fallback)
     */
    private logToConsole(
        subject: string,
        message: string,
        level: NotificationLevel,
        metadata?: Record<string, unknown>
    ): void {
        const emoji = {
            [NotificationLevel.INFO]: 'ℹ️',
            [NotificationLevel.WARN]: '⚠️',
            [NotificationLevel.ERROR]: '🚨'
        }[level];

        const prefix = this.getPrefix();
        console.log(`\n${emoji} ${prefix} ${level}: ${subject}`);
        console.log(message);

        if (metadata && Object.keys(metadata).length > 0) {
            console.log('Metadata:', JSON.stringify(metadata, null, 2));
        }

        console.log('---');
    }
}
