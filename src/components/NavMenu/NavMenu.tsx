'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavMenu.module.scss';
import { useTranslations } from 'next-intl';

export function NavMenu() {
  const pathname = usePathname();
  const t = useTranslations('Nav');
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={pathname === '/' ? styles.active : undefined}>
        {t('main')}
      </Link>
      <Link
        href="/results"
        className={pathname.startsWith('/results') ? styles.active : undefined}
      >
        {t('search')}
      </Link>
      <Link
        href="/about"
        className={pathname === '/about' ? styles.active : undefined}
      >
        {t('about')}
      </Link>
    </nav>
  );
}
