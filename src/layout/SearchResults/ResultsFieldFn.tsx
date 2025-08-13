import { useEffect, useState } from 'react';
import CardCharacter from './CardsCharacter';
import Pagination from './Pagination';
import styles from './ResultsFieldFn.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useGetCharactersQuery } from '../../store/characterApi';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store.ts';

function ResultsField() {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchFromStore = useSelector(
    (state: RootState) => state.search.search
  );

  const { isLoading, isError } = useSelector(
    (state: RootState) => state.status
  );

  function onPageChange(currentPage: number) {
    setCurrentPage(currentPage);
    setSearchParams({ page: String(currentPage + 1) });
  }

  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const validPage =
    !isNaN(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl - 1 : 0;

  useEffect(() => {
    setCurrentPage(0);
    setSearchParams(
      (prev) => {
        const page = new URLSearchParams(prev);
        page.set('page', '1');
        return page;
      },
      { replace: true }
    );
  }, [searchFromStore]);

  useEffect(() => {
    setCurrentPage(validPage);
  }, [validPage]);

  const { data } = useGetCharactersQuery({
    page: validPage,
    name: searchFromStore,
  });
  if (isError) return <div>{isError}</div>;

  if (!data) return null;

  return (
    <div data-testid="results" className={styles['container__results']}>
      {isLoading && (
        <div className={styles.loadingOn}>
          <div className={styles.spinner}></div>
        </div>
      )}
      {data.characters.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <CardCharacter items={data.characters} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={data.page.totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default ResultsField;
