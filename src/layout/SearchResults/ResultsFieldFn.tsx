import { useEffect, useState } from 'react';
import CardCharacter from './CardsCharacter';
import Pagination from './Pagination';
import styles from './ResultsFieldFn.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useGetCharactersQuery } from '../../store/characterApi.ts';
import { filterCharacterResponse } from '../../utils/filterCharacterResponse.ts';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store.ts';

function ResultsField() {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchFromStore = useSelector(
    (state: RootState) => state.search.search
  );

  function onPageChange(currentPage: number) {
    setCurrentPage(currentPage);
    setSearchParams({ page: String(currentPage + 1) });
  }

  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const validPage =
    !isNaN(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl - 1 : 0;

  useEffect(() => {
    setCurrentPage(validPage);
  }, [validPage]);

  const { data, isLoading, isFetching, error } =
    useGetCharactersQuery(validPage);

  if (!data) return null;

  const searchData = filterCharacterResponse(data, searchFromStore);

  if (error) return <div>{'Error loading'}</div>;

  return (
    <div data-testid="results" className={styles['container__results']}>
      {(isLoading || isFetching) && (
        <div className={styles.loadingOn}>
          <div className={styles.spinner}></div>
        </div>
      )}
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
    </div>
  );
}

export default ResultsField;
