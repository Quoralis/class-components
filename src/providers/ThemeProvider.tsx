'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  handleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  handleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme') as Theme | null;
      const initial: Theme =
        saved === 'light' || saved === 'dark'
          ? saved
          : window.matchMedia?.('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';

      setTheme(initial);
      document.documentElement.classList.toggle('dark', initial === 'dark');
    } catch {
      document.documentElement.classList.toggle('dark', false);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('theme', theme);
    } catch {
      console.error();
    }
  }, [theme]);

  const handleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo(() => ({ theme, handleTheme }), [theme, handleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
