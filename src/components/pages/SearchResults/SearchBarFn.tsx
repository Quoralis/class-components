import { type ChangeEvent } from 'react';
import styles from './SearchBar.module.scss';
import ThemeSwitcher from './ThemeSwither';

interface Props {
  search: string;
  onSearch: (query: string) => void;
}

function SearchBarFn(props: Props) {
  const handleClick = () => {
    const clearSearch = props.search.trim();
    if (clearSearch) {
      localStorage.setItem('search', clearSearch);
    }
    props.onSearch(clearSearch);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onSearch(e.target.value);
  };

  return (
    <div key="searchBar" className={styles['search-bar']}>
      <input
        type="search"
        onChange={handleChange}
        value={props.search}
        className="search-bar__input"
        placeholder="Enter name character.."
      />
      <button className="search-bar__button" onClick={handleClick}>
        Search
      </button>
      <ThemeSwitcher />
    </div>
  );
}
export default SearchBarFn;
