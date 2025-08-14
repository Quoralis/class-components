import styles from './page.module.scss';
import { fetchCharacters } from './fetchCharacters';
import CardCharacter from '../../layout/SearchResults/CardsCharacter';
import { SearchBar } from '../../components/SearchBar/SearchBar';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export const dynamic = 'force-dynamic';

export default async function Page(props: { searchParams: SearchParams }) {
  const query = await props.searchParams;
  const searchStr = Array.isArray(query.search)
    ? query.search[0]
    : (query.search ?? ''); // проверка на массив или строку
  const items = await fetchCharacters(1, searchStr); //temporarily for tests
  return (
    <div className={styles.container}>
      <div className={styles.navbar}></div>
      <SearchBar />
      <div className={styles.wrapper_results}>
        <CardCharacter items={items} query={query} />
      </div>
    </div>
  );
}
