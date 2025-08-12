import { NavLink } from 'react-router-dom';
import styles from './NavMenu.module.scss';
import { navLinkClass } from '../../utils/navLinkClass.ts';
import { RefreshButton } from '../RefreshButton/RefreshButton.tsx';

export function NavMenu() {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/" end className={navLinkClass}>
        Main
      </NavLink>
      <NavLink to="/about" className={navLinkClass} end>
        About
      </NavLink>
      <RefreshButton />
    </nav>
  );
}
