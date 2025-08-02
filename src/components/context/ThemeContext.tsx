import { createContext } from 'react';

export interface ThemeContextType {
  theme: 'light' | 'dark';
  handleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
