import styles from './page.module.scss';
import { fetchCharacters } from './fetchCharacters';
import CardCharacter from '../../layout/SearchResults/CardsCharacter';

export default async function Page() {
  const items = await fetchCharacters(1, ''); //temporarily for tests
  return (
    <div className={styles.container}>
      <CardCharacter items={items} />
    </div>
  );
}
