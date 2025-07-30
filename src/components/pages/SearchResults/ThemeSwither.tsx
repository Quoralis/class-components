import { toggleTheme } from '../../../store/themeSlice';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store/store.ts';
import styles from './ThemeSwitcher.module.scss';

const ThemeSwitcher = () => {
  const actualTheme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();
  const handleTheme = () => {
    dispatch(toggleTheme());
  };

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
