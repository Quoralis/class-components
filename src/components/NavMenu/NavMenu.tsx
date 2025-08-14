'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavMenu.module.scss';

export function NavMenu() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={pathname === '/' ? styles.active : undefined}>
        Main
      </Link>
      <Link
        href="/results"
        className={pathname.startsWith('/results') ? styles.active : undefined}
      >
        Search
      </Link>
      <Link
        href="/about"
        className={pathname === '/about' ? styles.active : undefined}
      >
        About
      </Link>
    </nav>
  );
}
