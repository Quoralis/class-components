import { useParams } from 'react-router-dom';
import styles from './DetailLayout.module.scss';
import SearchPage from './SearchResults';
import ItemDetails from './SearchResults/ItemDetails';

export default function DetailLayout() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className={styles['results__wrapper']}>
      <SearchPage />
      {id ? <ItemDetails /> : null}
    </div>
  );
}
