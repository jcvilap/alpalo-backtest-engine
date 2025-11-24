import React from 'react';
import { CliLine } from '@/lib/utils/resultPrinter';
import { Terminal } from 'lucide-react';

interface CliOutputProps {
    lines: CliLine[];
}

const COLOR_MAP: Record<string, string> = {
    reset: 'text-gray-300',
    bright: 'font-bold text-white',
    green: 'text-emerald-400',
    red: 'text-red-400',
    blue: 'text-blue-400',
    cyan: 'text-cyan-400',
    yellow: 'text-yellow-400',
    gray: 'text-gray-500',
};

export default function CliOutput({ lines }: CliOutputProps) {
    if (!lines || lines.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-gray-400 bg-gray-900 rounded-xl border border-gray-800">
                <Terminal className="w-12 h-12 mb-4 opacity-50" />
                <p>No CLI output available.</p>
            </div>
        );
    }

    return (
        <div className="bg-[#0d1117] rounded-xl border border-gray-800 shadow-2xl overflow-hidden font-mono text-sm">
            {/* Terminal Header */}
            <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700 flex items-center gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="ml-2 text-xs text-gray-400 flex items-center gap-1.5">
                    <Terminal className="w-3 h-3" />
                    <span>alpalo-cli — backtest</span>
                </div>
            </div>

            {/* Terminal Content */}
            <div className="p-6 overflow-x-auto">
                <div className="min-w-max">
                    {lines.map((line, i) => (
                        <div key={i} className="whitespace-pre">
                            {line.segments.map((segment, j) => {
                                const colorClass = segment.color ? COLOR_MAP[segment.color] : COLOR_MAP.reset;
                                return (
                                    <span key={j} className={`${colorClass} transition-colors`}>
                                        {segment.text}
                                    </span>
                                );
                            })}
                        </div>
                    ))}
                    {/* Cursor */}
                    <div className="mt-2 flex items-center gap-2 text-gray-500">
                        <span>➜</span>
                        <span className="w-2.5 h-5 bg-gray-500 animate-pulse"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
