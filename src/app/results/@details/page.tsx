import styles from './ItemDetails.module.scss';
import Link from 'next/link';
import { fetchCharactersById } from '../fetchCharacters';

export default async function ItemDetails({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const id = Array.isArray(searchParams?.id)
    ? searchParams.id[0]
    : searchParams?.id;
  if (!id) return null;
  const dataChar = await fetchCharactersById(id);

  return (
    <div className={styles['container_details']}>
      <h2>{dataChar.character.name}</h2>
      <p>
        <strong>UID:</strong> {dataChar.character.uid || 'unknown'}
      </p>
      <p>
        <strong>Species:</strong> {dataChar.character.species || 'unknown'}
      </p>
      <p>
        <strong>Home World:</strong> {dataChar.character.homeWorld || 'unknown'}
      </p>

      <Link href={'/'}>
        <button>⨯ Back</button>
      </Link>
    </div>
  );
}
