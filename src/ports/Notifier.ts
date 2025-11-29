/**
 * Notifier Port Interface
 *
 * Abstracts notification delivery. Implementations can send notifications
 * to different channels (Slack, email, console, etc.).
 *
 * This interface follows the "Ports and Adapters" pattern, allowing the system
 * to send notifications without coupling to specific delivery mechanisms.
 */

/**
 * Notification severity level
 */
export enum NotificationLevel {
    /** Informational messages (e.g., trade executed successfully) */
    INFO = 'INFO',

    /** Warning messages (e.g., market closed, unusual conditions) */
    WARN = 'WARN',

    /** Error messages (e.g., order failed, API error) */
    ERROR = 'ERROR'
}

/**
 * Notifier interface for sending notifications
 *
 * Implementations:
 * - SlackNotifier: Sends notifications to Slack via Web API
 * - ConsoleNotifier: Logs notifications to console
 * - EmailNotifier: Sends notifications via email (future)
 */
export interface Notifier {
    /**
     * Send a notification
     *
     * @param subject - Brief subject/title of the notification
     * @param message - Detailed message body (supports markdown)
     * @param level - Severity level (INFO, WARN, ERROR)
     * @param metadata - Optional metadata to include (e.g., account info, trade details)
     */
    notify(
        subject: string,
        message: string,
        level: NotificationLevel,
        metadata?: Record<string, unknown>
    ): Promise<void>;
}
