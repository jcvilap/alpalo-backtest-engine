# Deployment Guide: Live Trading

This guide covers deploying the Alpalo Backtest Engine for automated live trading with multiple Alpaca accounts.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Server Setup](#server-setup)
- [Cron Job Configuration](#cron-job-configuration)
- [Monitoring & Alerts](#monitoring--alerts)
- [Troubleshooting](#troubleshooting)

---

## Overview

The live trading system is designed to:
- Execute trading strategies at Market-On-Close (MOC)
- Support multiple Alpaca accounts (Paper and Live)
- Send notifications via Slack
- Run automatically via cron jobs
- Provide comprehensive error handling and reporting

**Recommended Schedule**: Daily at **3:45 PM ET** (15 minutes before market close)

---

## Prerequisites

### Software Requirements

- **Node.js**: v18 or higher
- **pnpm**: Latest version (or npm)
- **Git**: For deployment and updates
- **cron**: For scheduled execution (or systemd timers)

### API Keys & Credentials

1. **Polygon API Key** (for market data)
   - Get from: https://polygon.io
   - Free tier may be sufficient for testing
   - Paid tier recommended for production

2. **Alpaca API Keys** (for trading)
   - Get from: https://alpaca.markets
   - Support for multiple accounts (Paper and/or Live)
   - Ensure accounts have trading permissions enabled

3. **Slack Webhook URL** (optional, for notifications)
   - Create a Slack app and incoming webhook
   - Guide: https://api.slack.com/messaging/webhooks

---

## Environment Configuration

### 1. Create Environment File

Create `.env.local` in the project root:

```bash
# Polygon API (Required)
POLYGON_API_KEY=your_polygon_api_key_here

# Slack Notifications (Optional)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL

# Multi-Account Configuration (Recommended)
ACCOUNTS='[
  {
    "name": "Paper Account #1",
    "key": "PKXXXXXXXXXXXXX",
    "secret": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "isPaper": true
  },
  {
    "name": "Live Account",
    "key": "AKXXXXXXXXXXXXX",
    "secret": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "isPaper": false
  }
]'

# Legacy Single-Account Configuration (Alternative)
# TRADING_MODE=PAPER
# PAPER_ALPACA_KEY_ID=your_paper_key
# PAPER_ALPACA_SECRET_KEY=your_paper_secret
# LIVE_ALPACA_KEY_ID=your_live_key
# LIVE_ALPACA_SECRET_KEY=your_live_secret
```

### 2. Account Configuration Format

The `ACCOUNTS` environment variable is a JSON array with the following structure:

```json
[
  {
    "name": "Display name for the account",
    "key": "Alpaca API Key ID",
    "secret": "Alpaca API Secret Key",
    "isPaper": true or false
  }
]
```

**Important Notes**:
- Use single quotes around the JSON array in `.env.local`
- Each account gets isolated execution and notifications
- Paper accounts (`isPaper: true`) use paper trading endpoints
- Live accounts (`isPaper: false`) execute real trades - **use with caution!**

---

## Server Setup

### Option 1: DigitalOcean Droplet

1. **Create Droplet**
   - Ubuntu 22.04 LTS or later
   - Minimum: 1GB RAM, 1 vCPU
   - Recommended: 2GB RAM for stability

2. **Install Dependencies**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm
npm install -g pnpm

# Install git
sudo apt install -y git
```

3. **Clone Repository**

```bash
# Clone your repository
git clone https://github.com/yourusername/alpalo-backtest-engine.git
cd alpalo-backtest-engine

# Install dependencies
pnpm install
```

4. **Configure Environment**

```bash
# Create .env.local file
nano .env.local
# (Paste your configuration from above)

# Verify file permissions (keep secrets secure)
chmod 600 .env.local
```

5. **Test Installation**

```bash
# Test with dry run
npm run trade:dry-run

# Check market schedule (during market hours)
tsx src/scripts/trade-live.ts --skip-market-check --dry-run
```

### Option 2: Other Hosting Providers

The same steps apply to:
- **AWS EC2**: Use Ubuntu or Amazon Linux AMI
- **Google Cloud Compute**: Use Ubuntu image
- **Linode**: Use Ubuntu distribution
- **Local Server**: Any Linux/macOS system with Node.js

---

## Cron Job Configuration

### Recommended Schedule

Execute at **3:45 PM Eastern Time** on weekdays (market days):

```cron
# Run live trading at 3:45 PM ET, Monday through Friday
45 15 * * 1-5 cd /path/to/alpalo-backtest-engine && /usr/bin/npm run trade:live >> /var/log/alpalo-trades.log 2>&1
```

### Timezone Considerations

**Important**: Cron uses the server's timezone, not ET!

#### Option 1: Set Server Timezone to ET

```bash
# Set timezone to America/New_York
sudo timedatectl set-timezone America/New_York

# Verify
timedatectl
```

#### Option 2: Convert to Server Time

If your server is in UTC:
- 3:45 PM ET = 8:45 PM UTC (during DST)
- 3:45 PM ET = 7:45 PM UTC (during standard time)

Use this cron expression for UTC (adjust for DST):
```cron
45 19 * * 1-5 cd /path/to/alpalo-backtest-engine && /usr/bin/npm run trade:live >> /var/log/alpalo-trades.log 2>&1
```

### Setting Up the Cron Job

1. **Open Crontab Editor**

```bash
crontab -e
```

2. **Add the Cron Entry**

```cron
# Alpalo Live Trading - Execute at 3:45 PM ET on weekdays
# Adjust path and timezone as needed
45 15 * * 1-5 cd /home/user/alpalo-backtest-engine && /usr/bin/npm run trade:live >> /var/log/alpalo-trades.log 2>&1

# Optional: Send email on errors (if mail is configured)
MAILTO=your-email@example.com
```

3. **Verify Cron Job**

```bash
# List all cron jobs
crontab -l

# Check cron logs
grep CRON /var/log/syslog
```

### Alternative: Systemd Timer

For more control, use systemd timers:

1. **Create Service File**: `/etc/systemd/system/alpalo-trade.service`

```ini
[Unit]
Description=Alpalo Live Trading Service
After=network.target

[Service]
Type=oneshot
User=youruser
WorkingDirectory=/home/youruser/alpalo-backtest-engine
ExecStart=/usr/bin/npm run trade:live
StandardOutput=append:/var/log/alpalo-trades.log
StandardError=append:/var/log/alpalo-trades.log

[Install]
WantedBy=multi-user.target
```

2. **Create Timer File**: `/etc/systemd/system/alpalo-trade.timer`

```ini
[Unit]
Description=Alpalo Live Trading Timer
Requires=alpalo-trade.service

[Timer]
OnCalendar=Mon..Fri 15:45:00
Persistent=true

[Install]
WantedBy=timers.target
```

3. **Enable and Start**

```bash
sudo systemctl enable alpalo-trade.timer
sudo systemctl start alpalo-trade.timer

# Check status
sudo systemctl status alpalo-trade.timer
```

---

## Monitoring & Alerts

### Slack Notifications

When configured, the system sends notifications for:

- ✅ **Trading Run Started**: Account name, date, mode (PAPER/LIVE)
- ✅ **Trading Run Completed**: Decision details, orders placed, portfolio state
- ❌ **Trading Run Failed**: Error message and stack trace

Configure the `SLACK_WEBHOOK_URL` in `.env.local` to enable.

### Log Files

Monitor execution via log files:

```bash
# View live trading logs
tail -f /var/log/alpalo-trades.log

# Search for errors
grep -i error /var/log/alpalo-trades.log

# View recent executions
tail -100 /var/log/alpalo-trades.log
```

### Health Checks

Set up monitoring with:

1. **Cron Job Status Monitoring**
   - Use external monitoring (UptimeRobot, Cronitor, etc.)
   - Expects HTTP endpoint hit on successful execution

2. **Slack Alert Monitoring**
   - Ensure notifications are received daily
   - Set up alerting if no notification received by expected time

3. **Portfolio Monitoring**
   - Check Alpaca dashboard daily
   - Verify orders were executed as expected

---

## Troubleshooting

### Common Issues

#### 1. Market Closed Error

```
❌ Market is currently CLOSED
```

**Solution**: The market schedule check failed. This is expected outside market hours.
- Run during market hours (9:30 AM - 4:00 PM ET)
- Or use `--skip-market-check` flag for testing

#### 2. Missing API Keys

```
❌ Failed to load account configuration
```

**Solution**: Check `.env.local` file
- Ensure all required environment variables are set
- Verify API keys are correct and active
- Check file permissions: `ls -la .env.local`

#### 3. Rate Limiting

```
❌ API rate limit exceeded
```

**Solution**: The script already implements rate limiting:
- 2-second delay between accounts
- Sequential execution (no parallel requests)
- If still seeing errors, increase delay in `trade-live.ts`

#### 4. Network Errors

```
❌ Failed to fetch market data
```

**Solution**:
- Check internet connectivity
- Verify Polygon API key is valid
- Check API service status: https://status.polygon.io

#### 5. Permission Denied

```bash
bash: /usr/bin/npm: Permission denied
```

**Solution**:
- Use full path to npm: `/usr/bin/npm` or `which npm`
- Ensure cron user has execute permissions
- Run as appropriate user (not root unless necessary)

### Testing Commands

```bash
# Dry run (no real orders)
npm run trade:dry-run

# Dry run with market check skipped
tsx src/scripts/trade-live.ts --dry-run --skip-market-check

# Check specific date (for testing)
NODE_ENV=test npm run trade:dry-run

# Verify environment variables
node -e "require('dotenv').config({ path: '.env.local' }); console.log(process.env.POLYGON_API_KEY ? 'OK' : 'MISSING')"
```

### Getting Help

1. **Check Logs**: Always start with log files
2. **Review Notifications**: Check Slack for error details
3. **Test Dry Run**: Use `--dry-run` to test without real orders
4. **Check APIs**: Verify Alpaca and Polygon service status
5. **GitHub Issues**: Report bugs at repository issues page

---

## Security Best Practices

1. **Protect Credentials**
   ```bash
   chmod 600 .env.local  # Only owner can read/write
   ```

2. **Use Paper Trading First**
   - Test thoroughly with paper accounts
   - Verify execution logic before going live

3. **Limit Live Account Exposure**
   - Start with small capital
   - Monitor closely during initial weeks
   - Use stop-loss safeguards if applicable

4. **Regular Backups**
   ```bash
   # Backup configuration
   cp .env.local .env.local.backup

   # Backup crontab
   crontab -l > ~/crontab-backup.txt
   ```

5. **Keep System Updated**
   ```bash
   # Update dependencies regularly
   pnpm update

   # Update system packages
   sudo apt update && sudo apt upgrade
   ```

---

## Update Deployment

To deploy code updates:

```bash
# Pull latest changes
cd /path/to/alpalo-backtest-engine
git pull origin main

# Install any new dependencies
pnpm install

# Test with dry run
npm run trade:dry-run

# Changes will take effect on next cron execution
```

---

## Additional Resources

- **Alpaca API Documentation**: https://alpaca.markets/docs/
- **Polygon API Documentation**: https://polygon.io/docs/
- **Cron Expression Generator**: https://crontab.guru/
- **Slack Incoming Webhooks**: https://api.slack.com/messaging/webhooks

---

## Support

For issues or questions:
- Check the [Troubleshooting](#troubleshooting) section
- Review project README.md
- Open an issue on GitHub
- Contact the development team

---

**⚠️ Important Disclaimer**: Live trading involves real financial risk. This system is provided as-is without any guarantees. Always test thoroughly with paper trading before using real funds. The developers are not responsible for any financial losses incurred.
