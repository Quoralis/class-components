import { useCallback, useEffect, useState } from 'react';
import CardCharacter from './CardsCharacter.tsx';

interface Props {
  search: string;
  triggerSearch: boolean;
}

export interface Item {
  uid: string;
  name: string;
  birthDate?: string;
  deathDate?: string;
  gender?: string;
  species?: string;
  homeWorld?: string;
  hologram?: boolean;
}
interface CharacterSearchResponse {
  characters: Item[];
  page: {
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  };
}

function ResultsField(props: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Item[]>([]);
  const [throwError, setThrowError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const search = props.search;
      const url = `https://stapi.co/api/v1/rest/character/search?pageNumber=${currentPage}&pageSize=16`;

      const response = await fetch(url);
      const result: CharacterSearchResponse = await response.json();
      setCurrentPage(result.page.pageNumber);
      setTotalPage(result.page.totalPages);
      console.log(totalPage); // заглушка для линтера
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
        <CardCharacter items={data} />
      )}
      <button onClick={throwErr}>Throw Error</button>
    </div>
  );
}

export default ResultsField;
