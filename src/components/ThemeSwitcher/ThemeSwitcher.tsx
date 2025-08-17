'use client';

import styles from './ThemeSwitcher.module.scss';
import { useTheme } from '../../hooks/useTheme';

const ThemeSwitcher = () => {
  const { theme: actualTheme, handleTheme } = useTheme();
  const checked = actualTheme === 'dark';

  return (
    <div className={styles.switcher_container}>
      <label className={styles.switch} htmlFor="themeSwitch">
        <input
          id="themeSwitch"
          type="checkbox"
          checked={checked}
          onChange={handleTheme}
          aria-label="Toggle theme"
        />
        <span className={styles.slider} aria-hidden="true" />
        <span className={styles.labelText}>
          {checked ? 'Dark theme' : 'Light theme'}
        </span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
