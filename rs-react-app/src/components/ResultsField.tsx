import { Component } from 'react';

interface Props {
  search: string;
  triggerSearch: boolean;
}

interface Item {
  uid: string;
  name: string;
}

interface State {
  loading: boolean;
  error: string | null;
  data: Item[];
  throwError: boolean;
}

export class ResultsField extends Component<Props, State> {
  state: State = {
    loading: false,
    error: null,
    data: [],
    throwError: false,
  };

  async componentDidMount() {
    await this.fetchData();
  }

  async componentDidUpdate(prevProps: Props) {
    if (
      prevProps.search !== this.props.search ||
      prevProps.triggerSearch !== this.props.triggerSearch
    ) {
      await this.fetchData();
    }
  }

  async fetchData() {
    this.setState({ loading: true, error: null });

    try {
      const { search } = this.props;
      const url = `https://stapi.co/api/v1/rest/character/search`;

      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      const filtered = search
        ? result.characters.filter((char: { name: string }) =>
            char.name.toLowerCase().includes(search.toLowerCase())
          )
        : result.characters;

      this.setState({ data: filtered || [] });
    } catch (err) {
      console.error(err);
      this.setState({ error: 'Something went wrong' });
    } finally {
      this.setState({ loading: false });
    }
  }

  throwError = () => {
    this.setState({ throwError: true });
  };

  render() {
    const { loading, error, data } = this.state;
    if (this.state.throwError) {
      throw new Error('Render error');
    }
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
      <div data-testid="results" className="container__results">
        {data.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <ul>
            {data.map((item) => (
              <li key={item.uid}>
                <h3>{item.name}</h3>
              </li>
            ))}
          </ul>
        )}
        <button onClick={this.throwError}>Throw Error</button>
      </div>
    );
  }
}
