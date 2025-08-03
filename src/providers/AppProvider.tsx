import type { ReactNode } from 'react';
import { StoreProvider } from './StoreProvider';
import { RouterProvider } from './RouterProvider';
import { ThemeProvider } from './ThemeProvider';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StoreProvider>
      <ThemeProvider>
        <RouterProvider>{children}</RouterProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};
