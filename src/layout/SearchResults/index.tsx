import SearchBarFn from './SearchBarFn.tsx';
import ResultsFieldFn from './ResultsFieldFn.tsx';
import { ErrorBoundary } from './ErrorBoundary.tsx';
import SelectedLayout from './SelectedLayout.tsx';

function SearchPage() {
  return (
    <div className="wrapper-results">
      <SearchBarFn />
      <ErrorBoundary>
        <ResultsFieldFn />
      </ErrorBoundary>
      <SelectedLayout />
    </div>
  );
}

export default SearchPage;
