'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useIsHydrated } from '@/lib/hooks/useIsHydrated';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const isHydrated = useIsHydrated();

  // Read the persisted/system preference once on the client. We render the
  // default first and sync here so the server and first client render match
  // (the inline script in the layout prevents a visual flash).
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    // Use light only if the system explicitly prefers it; otherwise default to dark.
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const next = stored ?? (systemPrefersLight ? 'light' : 'dark');
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe init from persisted browser state
    setThemeState(next);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme, isHydrated]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem('theme');
      // Only auto-switch if user hasn't manually set a preference
      if (!stored) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
  };

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
