import { useEffect, useState } from 'react';
import CardCharacter from './CardsCharacter.tsx';
import Pagination from './Pagination.tsx';
import styles from './ResultsFieldFn.module.scss';
import { useSearchParams } from 'react-router-dom';

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
  const [totalPages, setTotalPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  function onPageChange(currentPage: number) {
    setCurrentPage(currentPage);
    setSearchParams({ page: String(currentPage + 1) });
  }
  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
    const validPage =
      !isNaN(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl - 1 : 0;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://stapi.co/api/v1/rest/character/search?pageNumber=${validPage}&pageSize=16`;
        const response = await fetch(url);
        const result: CharacterSearchResponse = await response.json();

        setTotalPage(result.page.totalPages);
        setCurrentPage(validPage); // ← обновляем текущую страницу
        const filtered = props.search
          ? result.characters.filter((char) =>
              char.name.toLowerCase().includes(props.search.toLowerCase())
            )
          : result.characters;

        setData(filtered);
      } catch (err) {
        console.error(err);
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams, props.search, props.triggerSearch]);

  const throwErr = () => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error('Render error');
  }
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div data-testid="results" className={styles['container__results']}>
      {data.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <CardCharacter items={data} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <button onClick={throwErr}>Throw Error</button>
    </div>
  );
}

export default ResultsField;
