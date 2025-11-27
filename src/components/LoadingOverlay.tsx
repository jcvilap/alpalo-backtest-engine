import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

interface LoadingOverlayProps {
    isLoading: boolean;
    message?: string;
}

export default function LoadingOverlay({ isLoading, message = 'Analyzing Market Data...' }: LoadingOverlayProps) {
    const [show, setShow] = useState(false);
    const [textIndex, setTextIndex] = useState(0);

    // Rotating messages to keep user engaged
    const messages = [
        'Analyzing Market Data...',
        'Calculating Indicators...',
        'Simulating Trades...',
        'Optimizing Performance...',
        'Finalizing Results...'
    ];

    useEffect(() => {
        if (isLoading) {
            setShow(true);
            // Cycle through messages
            const interval = setInterval(() => {
                setTextIndex((prev) => (prev + 1) % messages.length);
            }, 1500);
            return () => clearInterval(interval);
        } else {
            // Small delay to allow exit animation
            const timer = setTimeout(() => setShow(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (!show) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md transition-opacity duration-300 ${isLoading ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="relative flex flex-col items-center justify-center">
                {/* Outer Ring - Spinning Gradient */}
                <div className="relative w-32 h-32">
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-accent animate-spin-slow shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
                    <div className="absolute inset-2 rounded-full border-4 border-transparent border-l-primary/50 border-b-accent/50 animate-spin-reverse-slower"></div>

                    {/* Center Pulse */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full animate-pulse-glow flex items-center justify-center backdrop-blur-sm">
                            <Activity className="w-8 h-8 text-primary animate-bounce-subtle" />
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="mt-8 flex flex-col items-center gap-2">
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent animate-pulse">
                        Backtesting
                    </h3>
                    <p className="text-text-secondary font-mono text-sm h-6 transition-all duration-300">
                        {messages[textIndex]}
                    </p>
                </div>

                {/* Progress Bar (Indeterminate) */}
                <div className="mt-6 w-64 h-1 bg-surface-elevated rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary via-accent to-primary w-[200%] animate-shimmer"></div>
                </div>
            </div>
        </div>
    );
}
