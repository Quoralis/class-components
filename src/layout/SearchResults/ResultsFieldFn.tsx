import { useState } from 'react';
import CardCharacter from './CardsCharacter';
import Pagination from './Pagination';
import styles from './ResultsFieldFn.module.scss';
import { useSearchParams } from 'react-router-dom';
import useCharacterSearch from '../../hooks/useCharacters';
import { useTheme } from '../../hooks/useTheme.tsx';

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

function ResultsField(props: Props) {
  const { theme: actualTheme } = useTheme();
  const [throwError, setThrowError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  function onPageChange(currentPage: number) {
    setCurrentPage(currentPage);
    setSearchParams({ page: String(currentPage + 1) });
  }
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const validPage =
    !isNaN(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl - 1 : 0;
  const { data, totalPages, loading, error } = useCharacterSearch(
    props.search,
    validPage,
    props.triggerSearch
  );

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
      <button
        className={actualTheme === 'dark' ? 'buttonDark' : ''}
        onClick={throwErr}
      >
        Throw Error
      </button>
    </div>
  );
}

export default ResultsField;
