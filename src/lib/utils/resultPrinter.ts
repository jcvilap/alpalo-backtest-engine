import { BacktestResult } from '../backtest/backtestEngine';

export type PrintMode = 'cli' | 'browser' | 'capture';

export interface PrintOptions {
    mode: PrintMode;
}

export interface CliLine {
    segments: Array<{ text: string; color?: keyof typeof CLI_COLORS }>;
}

// ANSI color codes for CLI
const CLI_COLORS = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    yellow: '\x1b[33m',
    gray: '\x1b[90m',
};

// CSS styles for Browser Console
const BROWSER_STYLES = {
    reset: 'color: inherit; font-weight: normal;',
    bright: 'font-weight: bold;',
    green: 'color: #10b981;', // emerald-500
    red: 'color: #ef4444;',   // red-500
    blue: 'color: #3b82f6;',  // blue-500
    cyan: 'color: #06b6d4;',  // cyan-500
    yellow: 'color: #eab308;', // yellow-500
    gray: 'color: #6b7280;',  // gray-500
};

interface FormattedValue {
    text: string;
    style?: string;
    ansi?: string;
}

function formatPercent(value: number, mode: PrintMode, decimals: number = 2): FormattedValue {
    const sign = value >= 0 ? '+' : '';
    const text = `${sign}${value.toFixed(decimals)}%`;

    if (mode === 'cli') {
        const color = value >= 0 ? CLI_COLORS.green : CLI_COLORS.red;
        return { text: `${color}${text}${CLI_COLORS.reset}`, ansi: '' };
    } else if (mode === 'browser') {
        const style = value >= 0 ? BROWSER_STYLES.green : BROWSER_STYLES.red;
        return { text, style };
    } else {
        // Capture mode: return raw text, color logic handled by printer
        return { text };
    }
}

function formatNumber(value: number, decimals: number = 2): string {
    return value.toFixed(decimals);
}

class ConsolePrinter {
    private mode: PrintMode;
    private capturedLines: CliLine[] = [];

    constructor(mode: PrintMode) {
        this.mode = mode;
    }

    getCapturedLines(): CliLine[] {
        return this.capturedLines;
    }

    // Add a line with segments. Each segment can have a style/color.
    // Segments: [text, colorName?]
    log(segments: Array<{ text: string; color?: keyof typeof CLI_COLORS }>) {
        if (this.mode === 'capture') {
            this.capturedLines.push({ segments });
            return;
        }

        if (this.mode === 'cli') {
            const line = segments.map(s => {
                const colorCode = s.color ? CLI_COLORS[s.color] : '';
                const resetCode = s.color ? CLI_COLORS.reset : '';
                return `${colorCode}${s.text}${resetCode}`;
            }).join('');
            console.log(line);
        } else {
            // Browser: construct format string and args
            let formatStr = '';
            const args: string[] = [];

            segments.forEach(s => {
                formatStr += '%c' + s.text;
                args.push(s.color ? BROWSER_STYLES[s.color] : BROWSER_STYLES.reset);
            });

            console.log(formatStr, ...args);
        }
    }

    // Specialized log for pre-formatted percent objects
    logPercent(label: string, valueObj: FormattedValue, labelColor: keyof typeof CLI_COLORS = 'cyan', padding: number = 0, value: number) {
        const paddedLabel = label.padEnd(padding);

        if (this.mode === 'capture') {
            const valueColor = value >= 0 ? 'green' : 'red';
            this.log([
                { text: '  ' },
                { text: paddedLabel, color: labelColor },
                { text: ' ' },
                { text: valueObj.text, color: valueColor }
            ]);
            return;
        }

        if (this.mode === 'cli') {
            // valueObj.text already has ANSI codes for CLI
            console.log(`  ${CLI_COLORS[labelColor]}${paddedLabel}${CLI_COLORS.reset} ${valueObj.text}`);
        } else {
            console.log(
                `%c  %c${paddedLabel}%c ${valueObj.text}`,
                BROWSER_STYLES.reset, // Indent
                BROWSER_STYLES[labelColor],
                BROWSER_STYLES.reset,
                valueObj.style || BROWSER_STYLES.reset
            );
        }
    }

    divider() {
        const line = '───────────────────────────────────────────────────────────';
        this.log([{ text: line, color: 'bright' }]);
        this.log([{ text: '\n' }]); // Empty line after divider
    }

    header(text: string) {
        this.log([{ text: '\n' }]);
        this.log([{ text, color: 'blue' }]); // Blue header
        this.divider();
    }
}

export function printBacktestResult(
    result: BacktestResult,
    displayFrom: string,
    endDate: string,
    capital: number,
    options: PrintOptions
): CliLine[] {
    const printer = new ConsolePrinter(options.mode);

    // Header Info
    // Ensure dates are formatted correctly using NY time if they are date objects,
    // but here they are passed as strings. We should assume they are already formatted or format them if needed.
    // Ideally, the caller should pass Date objects or we parse them.
    // For now, let's treat them as strings but we could use formatNYDate if we parsed them.
    // Given the refactoring plan, let's assume displayFrom/endDate are strings for now but we might want to standardize later.

    printer.log([
        { text: 'Date Range: ', color: 'gray' },
        { text: `${displayFrom} → ${endDate}`, color: 'gray' }
    ]);
    printer.log([
        { text: 'Capital:    ', color: 'gray' },
        { text: `$${capital.toLocaleString()}`, color: 'gray' }
    ]);
    printer.log([{ text: '\n' }]);

    printer.log([{ text: '✓ Backtest complete', color: 'green' }]);

    // PERFORMANCE METRICS
    printer.header('PERFORMANCE METRICS');

    const metrics = [
        { label: 'Total Return', value: formatPercent(result.metrics.totalReturn, options.mode), raw: result.metrics.totalReturn },
        { label: 'CAGR', value: formatPercent(result.metrics.cagr, options.mode), raw: result.metrics.cagr },
        { label: 'Max Drawdown', value: formatPercent(result.metrics.maxDrawdown, options.mode), raw: result.metrics.maxDrawdown },
        { label: 'Win Rate', value: formatPercent(result.metrics.winRate.winPct, options.mode), raw: result.metrics.winRate.winPct },
        { label: 'Avg Position Size', value: formatPercent(result.metrics.avgPositionSize, options.mode), raw: result.metrics.avgPositionSize },
        { label: 'Sharpe Ratio', value: { text: formatNumber(result.metrics.sharpeRatio) }, raw: 0 }, // Sharpe doesn't need color logic here
        { label: 'Total Trades', value: { text: result.trades.length.toString() }, raw: 0 },
    ];

    const labelWidth = Math.max(...metrics.map(m => m.label.length)) + 2;

    metrics.forEach(m => {
        if (m.label === 'Sharpe Ratio' || m.label === 'Total Trades') {
            printer.log([
                { text: '  ' },
                { text: m.label.padEnd(labelWidth), color: 'cyan' },
                { text: ' ' },
                { text: m.value.text }
            ]);
        } else {
            printer.logPercent(m.label, m.value, 'cyan', labelWidth, m.raw);
        }
    });

    // BENCHMARK COMPARISON
    printer.header('BENCHMARK COMPARISON');

    const benchmarks = [
        { label: 'Strategy', value: formatPercent(result.metrics.totalReturn, options.mode), raw: result.metrics.totalReturn },
        { label: 'QQQ (Nasdaq-100)', value: formatPercent(result.metrics.benchmark.totalReturn, options.mode), raw: result.metrics.benchmark.totalReturn },
        { label: 'TQQQ (3x Leveraged)', value: formatPercent(result.metrics.benchmarkTQQQ.totalReturn, options.mode), raw: result.metrics.benchmarkTQQQ.totalReturn },
    ];

    benchmarks.forEach(b => {
        printer.logPercent(b.label, b.value, 'cyan', labelWidth + 5, b.raw);
    });

    // TRADE SUMMARY
    printer.header('TRADE SUMMARY');

    const wins = result.metrics.winRate.wins;
    const losses = result.metrics.winRate.losses;

    // Fix alignment: Use the same labelWidth logic
    // We need to align the labels and then the values.
    // The previous implementation had hardcoded spaces which caused misalignment.

    const summaryLabelWidth = labelWidth; // Reuse the calculated width from metrics

    printer.log([
        { text: '  ' },
        { text: 'Total Trades:'.padEnd(summaryLabelWidth), color: 'cyan' },
        { text: ' ' },
        { text: `${result.trades.length}` }
    ]);
    printer.log([
        { text: '  ' },
        { text: 'Wins:'.padEnd(summaryLabelWidth), color: 'green' },
        { text: ' ' },
        { text: `${wins}` }
    ]);
    printer.log([
        { text: '  ' },
        { text: 'Losses:'.padEnd(summaryLabelWidth), color: 'red' },
        { text: ' ' },
        { text: `${losses}` }
    ]);

    printer.logPercent('Win Rate:', formatPercent(result.metrics.winRate.winPct, options.mode), 'cyan', summaryLabelWidth, result.metrics.winRate.winPct);

    printer.log([{ text: '\n' }]);
    printer.log([{ text: '═══════════════════════════════════════════════════════════', color: 'bright' }]);
    printer.log([{ text: '\n' }]);

    return printer.getCapturedLines();
}

export function printComparisonTable(results: { range: string; result: BacktestResult }[], options: PrintOptions): CliLine[] {
    const printer = new ConsolePrinter(options.mode);

    printer.header('PERFORMANCE COMPARISON');

    // Header
    const headers = ['Metric', ...results.map(r => r.range)];
    const colWidth = 12;
    const labelWidth = 20;

    const headerRow = headers.map((h, i) => {
        if (i === 0) return h.padEnd(labelWidth);
        return h.padEnd(colWidth);
    }).join('');

    printer.log([{ text: headerRow, color: 'cyan' }]);
    printer.log([{ text: '──────────────────────────────────────────────────────────────────────────────────────────', color: 'bright' }]);
    printer.log([{ text: '\n' }]);

    const rows: { label: string; getValue: (r: BacktestResult) => FormattedValue; getRaw?: (r: BacktestResult) => number }[] = [
        { label: 'Total Return', getValue: (r: BacktestResult) => formatPercent(r.metrics.totalReturn, options.mode), getRaw: (r) => r.metrics.totalReturn },
        { label: 'CAGR', getValue: (r: BacktestResult) => formatPercent(r.metrics.cagr, options.mode), getRaw: (r) => r.metrics.cagr },
        { label: 'Max Drawdown', getValue: (r: BacktestResult) => formatPercent(r.metrics.maxDrawdown, options.mode), getRaw: (r) => r.metrics.maxDrawdown },
        { label: 'Win Rate', getValue: (r: BacktestResult) => formatPercent(r.metrics.winRate.winPct, options.mode), getRaw: (r) => r.metrics.winRate.winPct },
        { label: 'Sharpe Ratio', getValue: (r: BacktestResult) => ({ text: formatNumber(r.metrics.sharpeRatio) }) },
        { label: 'Trades', getValue: (r: BacktestResult) => ({ text: r.trades.length.toString() }) },
    ];

    rows.forEach(row => {
        const lineSegments: Array<{ text: string; color?: keyof typeof CLI_COLORS }> = [];

        // Label
        lineSegments.push({ text: row.label.padEnd(labelWidth) });

        // Values
        results.forEach(({ result }) => {
            const val = row.getValue(result);
            const padding = colWidth;

            let color: keyof typeof CLI_COLORS | undefined;

            if (options.mode === 'capture' && row.getRaw) {
                const rawVal = row.getRaw(result);
                color = rawVal >= 0 ? 'green' : 'red';
            } else if (val.text.includes('+')) {
                color = 'green';
            } else if (val.text.includes('-')) {
                color = 'red';
            }

            lineSegments.push({
                text: val.text.padEnd(padding),
                color
            });
        });

        printer.log(lineSegments);
    });

    printer.log([{ text: '──────────────────────────────────────────────────────────────────────────────────────────', color: 'bright' }]);
    printer.log([{ text: '\n' }]);

    // Benchmark Comparison (Total Return)
    printer.header('BENCHMARK COMPARISON (Total Return)');

    const benHeaders = ['Range', 'Strategy', 'QQQ', 'TQQQ'];
    const benHeaderRow = benHeaders.map((h, i) => h.padEnd(i === 0 ? labelWidth : colWidth)).join('');

    printer.log([{ text: benHeaderRow, color: 'cyan' }]);
    printer.log([{ text: '──────────────────────────────────────────────────────────────────────────────────────────', color: 'bright' }]);

    results.forEach(({ range, result }) => {
        const strat = formatPercent(result.metrics.totalReturn, options.mode);
        const qqq = formatPercent(result.metrics.benchmark.totalReturn, options.mode);
        const tqqq = formatPercent(result.metrics.benchmarkTQQQ.totalReturn, options.mode);

        if (options.mode === 'capture') {
            const lineSegments: Array<{ text: string; color?: keyof typeof CLI_COLORS }> = [];
            lineSegments.push({ text: range.padEnd(labelWidth) });

            lineSegments.push({ text: strat.text.padEnd(colWidth), color: result.metrics.totalReturn >= 0 ? 'green' : 'red' });
            lineSegments.push({ text: qqq.text.padEnd(colWidth), color: result.metrics.benchmark.totalReturn >= 0 ? 'green' : 'red' });
            lineSegments.push({ text: tqqq.text.padEnd(colWidth), color: result.metrics.benchmarkTQQQ.totalReturn >= 0 ? 'green' : 'red' });

            printer.log(lineSegments);
        } else if (options.mode === 'cli') {
            let line = range.padEnd(labelWidth);
            line += strat.text.padEnd(colWidth + 10);
            line += qqq.text.padEnd(colWidth + 10);
            line += tqqq.text.padEnd(colWidth + 10);
            console.log(line);
        } else {
            console.log(
                `%c${range.padEnd(labelWidth)}%c${strat.text.padEnd(colWidth)}%c${qqq.text.padEnd(colWidth)}%c${tqqq.text.padEnd(colWidth)}`,
                BROWSER_STYLES.reset,
                strat.style,
                qqq.style,
                tqqq.style
            );
        }
    });

    printer.log([{ text: '──────────────────────────────────────────────────────────────────────────────────────────', color: 'bright' }]);
    printer.log([{ text: '\n' }]);

    return printer.getCapturedLines();
}
