import Link from 'next/link';

import styles from './NavMenu.module.scss';

export function NavMenu() {
  return (
    <nav className={styles.navbar}>
      <Link href="/">Main</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}
