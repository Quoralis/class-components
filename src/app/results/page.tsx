import styles from './page.module.scss';
import { fetchCharacters } from './fetchCharacters';
import CardCharacter from '../../layout/SearchResults/CardsCharacter';
import { NavMenu } from '../../components';
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export const dynamic = 'force-dynamic';

export default async function Page(props: { searchParams: SearchParams }) {
  const query = await props.searchParams;
  const items = await fetchCharacters(1, ''); //temporarily for tests
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <NavMenu />
      </div>
      <div className={styles.wrapper_results}>
        <CardCharacter items={items} query={query} />
      </div>
    </div>
  );
}
