import { Component } from 'react';
import { SearchBar } from './components/SearchBar.tsx';

interface State {
  search: string;
  triggerSearch: boolean;
}

export default class App extends Component<object, State> {
  handleSearch = (search: string) => {
    this.setState({ search });
  };
  render() {
    return (
      <div>
        <SearchBar onSearch={this.handleSearch} />
      </div>
    );
  }
}
