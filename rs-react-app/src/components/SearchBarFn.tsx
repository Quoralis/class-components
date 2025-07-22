import { type ChangeEvent } from 'react';

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
    <div key="searchBar" className="search-bar">
      <input
        type="text"
        onChange={handleChange}
        value={props.search}
        className="search-bar__input"
        placeholder="Enter name character.."
      />
      <button className="search-bar__button" onClick={handleClick}>
        Search
      </button>
    </div>
  );
}
export default SearchBarFn;
