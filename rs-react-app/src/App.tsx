import { Component } from 'react';
import { SearchBar } from './components/SearchBar.tsx';
import { ResultsField } from './components/ResultsField.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';

interface State {
  search: string;
  triggerSearch: boolean;
}

export default class App extends Component<object, State> {
  state: State = {
    search: '',
    triggerSearch: false,
  };

  handleSearch = (search: string) => {
    this.setState((prevState) => ({
      search,
      triggerSearch: !prevState.triggerSearch,
    }));
  };

  render() {
    return (
      <div className="container">
        <SearchBar onSearch={this.handleSearch} />
        <ErrorBoundary>
          <ResultsField
            search={this.state.search}
            triggerSearch={this.state.triggerSearch}
          />
        </ErrorBoundary>
      </div>
    );
  }
}
