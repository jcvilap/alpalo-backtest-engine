/**
 * Slack Notifier Adapter
 *
 * Sends notifications to Slack via webhook URL.
 * Falls back to console logging if Slack is not configured.
 */

import { Notifier, NotificationLevel } from '../ports/Notifier';

/**
 * Slack message attachment color based on notification level
 */
const LEVEL_COLORS: Record<NotificationLevel, string> = {
    [NotificationLevel.INFO]: '#36a64f', // Green
    [NotificationLevel.WARN]: '#ff9900', // Orange
    [NotificationLevel.ERROR]: '#ff0000'  // Red
};

/**
 * Slack message attachment
 */
interface SlackAttachment {
    color: string;
    title?: string;
    text: string;
    fields?: Array<{
        title: string;
        value: string;
        short: boolean;
    }>;
    footer?: string;
    ts?: number;
}

/**
 * Slack webhook payload
 */
interface SlackWebhookPayload {
    text?: string;
    attachments: SlackAttachment[];
}

/**
 * Slack Notifier Implementation
 *
 * Sends formatted notifications to Slack via webhook.
 * If Slack is not configured, falls back to console logging.
 */
export class SlackNotifier implements Notifier {
    private webhookUrl: string | null;
    private accountName?: string;

    /**
     * Create a new Slack notifier
     *
     * @param accountName - Optional account name to prefix notifications
     */
    constructor(accountName?: string) {
        this.accountName = accountName;
        this.webhookUrl = process.env.SLACK_WEBHOOK_URL || null;

        if (!this.webhookUrl) {
            console.log('Slack webhook not configured. Notifications will be logged to console only.');
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
        if (!this.webhookUrl) {
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
     * Send notification to Slack via webhook
     */
    private async sendToSlack(
        subject: string,
        message: string,
        level: NotificationLevel,
        metadata?: Record<string, unknown>
    ): Promise<void> {
        const attachment: SlackAttachment = {
            color: LEVEL_COLORS[level],
            title: subject,
            text: message,
            footer: 'Alpalo Backtest Engine',
            ts: Math.floor(Date.now() / 1000)
        };

        // Add metadata as fields if provided
        if (metadata && Object.keys(metadata).length > 0) {
            attachment.fields = Object.entries(metadata).map(([key, value]) => ({
                title: key,
                value: String(value),
                short: true
            }));
        }

        const payload: SlackWebhookPayload = {
            text: level === NotificationLevel.ERROR ? '🚨 Error Alert' : undefined,
            attachments: [attachment]
        };

        const response = await fetch(this.webhookUrl!, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Slack webhook returned ${response.status}: ${response.statusText}`);
        }
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

        console.log(`\n${emoji} ${level}: ${subject}`);
        console.log(message);

        if (metadata && Object.keys(metadata).length > 0) {
            console.log('Metadata:', JSON.stringify(metadata, null, 2));
        }

        console.log('---');
    }
}
