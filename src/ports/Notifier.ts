/**
 * Notifier Port Interface
 *
 * Abstracts the notification system to allow sending alerts and logs
 * to external services (like Slack) or logging to console.
 */

export type NotificationLevel = 'INFO' | 'WARN' | 'ERROR';

export interface Notifier {
    /**
     * Send a notification
     *
     * @param subject - Brief subject or title of the notification
     * @param message - Detailed message body
     * @param level - Severity level (INFO, WARN, ERROR)
     * @param metadata - Optional additional data to attach
     */
    notify(subject: string, message: string, level: NotificationLevel, metadata?: any): Promise<void>;
}
