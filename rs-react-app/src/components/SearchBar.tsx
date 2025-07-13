import { type ChangeEvent, Component } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

interface State {
  input: string;
}
export class SearchBar extends Component<Props, State> {
  state: State = {
    input: '',
  };
  getHistorySearch() {
    const saveSearch = localStorage.getItem('search');
    if (saveSearch) {
      this.setState({ input: saveSearch });
    }
  }
  componentDidMount() {
    this.getHistorySearch();
  }

  handleClick() {
    const clearSearch = this.state.input.trim();
    if (clearSearch) {
      localStorage.setItem('search', clearSearch);
    }
    this.props.onSearch(clearSearch);
    console.log(this.state.input);
  }
  handleChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ input: e.target.value });
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          value={this.state.input}
          onChange={this.handleChange.bind(this)}
          className="SearchBar__input"
          placeholder="Enter name character.."
        />
        <button
          onClick={this.handleClick.bind(this)}
          className="SearchBar__button"
        >
          Search
        </button>
      </div>
    );
  }
}
