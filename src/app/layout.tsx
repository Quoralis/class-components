import type { Metadata } from 'next';
import styles from './layout.module.scss';
import { ThemeProvider } from '../providers/ThemeProvider';
import './globals.scss';
import { NavMenu } from '../components';
import { StoreProvider } from '../providers/StoreProvider';

export const metadata: Metadata = {
  title: 'Star Trek Characters Search',
  description:
    'A web application for searching and exploring Star Trek characters with detailed information.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={styles.body}>
          <main id="root">
            <NavMenu />
            <StoreProvider>{children}</StoreProvider>
          </main>
        </body>
      </ThemeProvider>
    </html>
  );
}
