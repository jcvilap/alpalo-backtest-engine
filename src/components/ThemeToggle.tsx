'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="p-2 rounded-lg bg-surface-elevated border border-border opacity-0">
                <Moon className="w-5 h-5" />
            </div>
        );
    }

    return (
        <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
            className="p-2 rounded-lg bg-surface-elevated border border-border hover:bg-surface transition-theme cursor-pointer"
        >
            {resolvedTheme === 'light' ? (
                <Moon className="w-5 h-5 text-text-secondary transition-theme" />
            ) : (
                <Sun className="w-5 h-5 text-text-secondary transition-theme" />
            )}
        </button>
    );
}
