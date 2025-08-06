import { useState } from 'react';
import CardCharacter from './CardsCharacter';
import Pagination from './Pagination';
import styles from './ResultsFieldFn.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme.tsx';
import { useGetCharactersQuery } from '../../store/characterApi.ts';
import { filterCharacterResponse } from '../../utils/filterCharacterResponse.ts';

interface Props {
  search: string;
  triggerSearch: boolean;
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
  const { data, isLoading, error } = useGetCharactersQuery(validPage);

  if (!data) return null;

  const searchData = filterCharacterResponse(data, props.search);
  console.log(searchData);

  const throwErr = () => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error('Render error');
  }
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{'Error loading'}</div>;

  return (
    <div data-testid="results" className={styles['container__results']}>
      {searchData.characters.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <CardCharacter items={searchData.characters} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={searchData.page.totalPages}
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
