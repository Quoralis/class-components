import { useCallback, useEffect, useState } from 'react';

interface Props {
  search: string;
  triggerSearch: boolean;
}

interface Item {
  uid: string;
  name: string;
}

function ResultsField(props: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Item[]>([]);
  const [throwError, setThrowError] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const search = props.search;
      const url = `https://stapi.co/api/v1/rest/character/search`;

      const response = await fetch(url);
      const result = await response.json();
      const filtered = search
        ? result.characters.filter((char: { name: string }) =>
            char.name.toLowerCase().includes(search.toLowerCase())
          )
        : result.characters;

      setData(filtered);
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [props.search]);

  useEffect(() => {
    fetchData();
  }, [fetchData, props.triggerSearch]);

  const throwErr = () => {
    setThrowError(true);
  };

  if (throwError) {
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
      <button onClick={throwErr}>Throw Error</button>
    </div>
  );
}

export default ResultsField;
