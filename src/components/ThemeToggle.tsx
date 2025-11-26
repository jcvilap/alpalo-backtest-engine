'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg bg-surface-elevated border border-border hover:bg-surface transition-theme"
        >
            {theme === 'light' ? (
                <Moon className="w-5 h-5 text-text-secondary transition-theme" />
            ) : (
                <Sun className="w-5 h-5 text-text-secondary transition-theme" />
            )}
        </button>
    );
}
