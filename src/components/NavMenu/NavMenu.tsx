'use client';

import { Link } from '@/i18n/navigation';
import styles from './NavMenu.module.scss';
import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher';
import { routing } from '../../i18n/routing';

export function NavMenu() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  return (
    <nav className={styles.navbar}>
      <Link href="/">{t('main')}</Link>
      <Link href="/results">{t('search')}</Link>
      <Link href="/about">{t('about')}</Link>
      <LocaleSwitcher defaultValue={locale} label={t('label')}>
        {routing.locales.map((cur) => (
          <option key={cur} value={cur}>
            {t('locale', { locale: cur })}
          </option>
        ))}
      </LocaleSwitcher>
    </nav>
  );
}
