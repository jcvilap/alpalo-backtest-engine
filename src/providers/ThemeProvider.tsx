'use client';

import { createContext, useContext, useEffect, useLayoutEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    // Use lazy initialization to get theme from localStorage or system preference
    const [theme, setThemeState] = useState<Theme>(() => {
        // This only runs once on mount
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('theme') as Theme | null;

            if (stored && (stored === 'light' || stored === 'dark')) {
                return stored;
            }

            // Use system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return prefersDark ? 'dark' : 'light';
        }
        return 'light'; // SSR fallback
    });

    const [mounted, setMounted] = useState(false);

    // Use useLayoutEffect for mounted flag to prevent hydration mismatch
    // This is a valid use case for setState in an effect for client-side hydration
    useLayoutEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    // Apply theme to document and localStorage
    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;

        // Remove both classes first
        root.classList.remove('light', 'dark');

        // Add the current theme class
        root.classList.add(theme);

        // Store in localStorage
        localStorage.setItem('theme', theme);
    }, [theme, mounted]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    const toggleTheme = () => {
        setThemeState(prev => prev === 'light' ? 'dark' : 'light');
    };

    // Prevent flash of wrong theme
    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
