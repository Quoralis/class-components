import styles from './ThemeSwitcher.module.scss';
import { useTheme } from '../../hooks/useTheme';

const ThemeSwitcher = () => {
  const { theme: actualTheme, handleTheme } = useTheme();
  return (
    <div className={`form-check form-switch ${styles.switcherContainer}`}>
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="switchCheckDefault"
        onChange={handleTheme}
      />
      <label className="form-check-label" htmlFor="switchCheckDefault">
        {actualTheme === 'dark' ? 'Dark theme' : 'Light  theme'}
      </label>
    </div>
  );
};

export default ThemeSwitcher;
