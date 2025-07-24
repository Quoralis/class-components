import SearchBarFn from './SearchBarFn.tsx';
import { useEffect, useState } from 'react';
import ResultsFieldFn from './ResultsFieldFn.tsx';
import { ErrorBoundary } from './ErrorBoundary.tsx';

function SearchPage() {
  const [search, setSearch] = useState('');
  const [triggerSearch, setTriggerSearch] = useState(false);
  useEffect(() => {
    const saveSearch = localStorage.getItem('search');
    if (saveSearch) {
      setSearch(saveSearch);
    }
  }, []);

  const handleSearch = (search: string) => {
    setSearch(search);
    setTriggerSearch(!triggerSearch);
  };
  return (
    <div className="container">
      <SearchBarFn search={search} onSearch={handleSearch} />
      <ErrorBoundary>
        <ResultsFieldFn search={search} triggerSearch={triggerSearch} />
      </ErrorBoundary>
    </div>
  );
}

export default SearchPage;
