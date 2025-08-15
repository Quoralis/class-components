import { useParams, useSearchParams, Link } from 'react-router-dom';
import styles from '../../app/results/@details/ItemDetails.module.scss';
import { useGetCharacterByIdQuery } from '../../store/characterApi';

export default function ItemDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.toString();

  const { data, isLoading, error } = useGetCharacterByIdQuery(id ?? '', {
    skip: !id,
  });
  if (!id) {
    return <div>Missing UID</div>;
  }
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{'Error loading'}</div>;
  if (!data)
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
      <h2>{data.character.name}</h2>
      <p>
        <strong>UID:</strong> {data.character.uid || 'unknown'}
      </p>
      <p>
        <strong>Species:</strong> {data.character.species || 'unknown'}
      </p>
      <p>
        <strong>Home World:</strong> {data.character.homeWorld || 'unknown'}
      </p>

      <Link to={`/?${query}`}>
        <button>⨯ Back</button>
      </Link>
    </div>
  );
}
