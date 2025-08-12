import SearchBarFn from './SearchBarFn';
import ResultsFieldFn from './ResultsFieldFn';
import { ErrorBoundary } from './ErrorBoundary';
import SelectedLayout from './SelectedLayout';

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
