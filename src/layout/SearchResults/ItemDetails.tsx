import { useParams, useSearchParams, Link } from 'react-router-dom';
import useCharacterById from '../../hooks/useDataCharacterByUid';
import styles from './ItemDetails.module.scss';

export default function ItemDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.toString();

  const { character, loading, error } = useCharacterById(id ?? '');
  if (!id) {
    return <div>Missing UID</div>;
  }
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!character)
    return (
      <div>
        <Link to={`/?${query}`}>
          <button>X</button>
        </Link>
        Character not found
      </div>
    );

  return (
    <div className={styles['container_details']}>
      <h2>{character.name}</h2>
      <p>
        <strong>UID:</strong> {character.uid || 'unknown'}
      </p>
      <p>
        <strong>Species:</strong> {character.species || 'unknown'}
      </p>
      <p>
        <strong>Home World:</strong> {character.homeWorld || 'unknown'}
      </p>

      <Link to={`/?${query}`}>
        <button>⨯ Back</button>
      </Link>
    </div>
  );
}
