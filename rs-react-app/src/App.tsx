import { useEffect, useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import SearchBarFn from './components/SearchBarFn.tsx';
import ResultsFieldFn from './components/ResultsFieldFn.tsx';

function App() {
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
export default App;
