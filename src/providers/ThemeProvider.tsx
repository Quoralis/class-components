'use client';

import { type ReactNode, useCallback, useState } from 'react';
import { createContext } from 'react';

export interface ThemeContextType {
  theme: 'light' | 'dark';
  handleTheme: () => void;
}

const initialTheme: ThemeContextType = {
  theme: 'light',
  handleTheme: () => {},
};
export const ThemeContext = createContext<ThemeContextType>(initialTheme);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleThemeChange = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, handleTheme: handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};
