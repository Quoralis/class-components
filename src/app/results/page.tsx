import styles from './page.module.scss';
import { fetchCharacters } from './fetchCharacters';
import CardCharacter from '../../layout/SearchResults/CardsCharacter';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import Pagination from '../../components/Pagination/Pagination';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export const dynamic = 'force-dynamic';

export default async function Page(props: { searchParams: SearchParams }) {
  const query = await props.searchParams;
  const currentPage = Array.isArray(query.page)
    ? query.page[0]
    : (query.page ?? '1');
  const searchStr = Array.isArray(query.search)
    ? query.search[0]
    : (query.search ?? '');

  const apiPage = Number(currentPage) - 1;
  const data = await fetchCharacters(Number(apiPage), searchStr);
  return (
    <div className={styles.container}>
      <div className={styles.navbar}></div>
      <SearchBar />
      <div className={styles.wrapper_results}>
        <CardCharacter items={data.characters} query={query} />
        <Pagination
          currentPage={Number(currentPage)}
          totalPages={data.page.totalPages}
        />
      </div>
    </div>
  );
}
