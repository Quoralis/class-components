import './globals.scss';
import type { Metadata } from 'next';
import styles from './layout.module.scss';
import { ThemeProvider } from '../../providers/ThemeProvider';

import { NavMenu } from '../../components';
import { StoreProvider } from '../../providers/StoreProvider';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Star Trek Characters Search',
  description:
    'A web application for searching and exploring Star Trek characters with detailed information.',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body className={styles.body}>
        <StoreProvider>
          <ThemeProvider>
            <NextIntlClientProvider /* locale={locale} messages={messages} */>
              <main id="root">
                <NavMenu />
                {children}
              </main>
            </NextIntlClientProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
