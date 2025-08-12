import { useEffect, useMemo, useState } from 'react';
import styles from './SearchBar.module.scss';
import ThemeSwitcher from './ThemeSwitcher';
import { useTheme } from '../../hooks/useTheme';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store.ts';
import { setSearchTerm } from '../../store/searchSlice';

function SearchBarFn() {
  const { theme: actualTheme } = useTheme();
  const dispatch = useDispatch();

  const searchFromStore = useSelector(
    (state: RootState) => state.search.search
  );

  const [inputValue, setInputValue] = useState(searchFromStore);

  useEffect(() => {
    setInputValue(searchFromStore);
  }, [searchFromStore]);

  useEffect(() => {
    const saved = localStorage.getItem('search');
    if (saved && saved !== searchFromStore) {
      dispatch(setSearchTerm(saved));
    }
  }, [dispatch, searchFromStore]);

  const inputClass = useMemo(
    () =>
      `${styles['search-bar__input']} ${
        actualTheme === 'dark' ? styles['search-bar__inputDark'] : ''
      }`,
    [actualTheme]
  );

  const buttonClass = useMemo(
    () =>
      `${styles['search-bar__button']} ${
        actualTheme === 'dark' ? styles['buttonDark'] : ''
      }`,
    [actualTheme]
  );

  const handleSearch = () => {
    localStorage.setItem('search', inputValue);
    dispatch(setSearchTerm(inputValue));
  };

  return (
    <div className={styles['search-bar']}>
      <input
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
        className={inputClass}
        placeholder="Enter name character.."
        aria-label="Search character"
      />
      <button type="button" className={buttonClass} onClick={handleSearch}>
        Search
      </button>
      <ThemeSwitcher />
    </div>
  );
}

export default SearchBarFn;
