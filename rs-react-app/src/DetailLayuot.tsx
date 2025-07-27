import { useParams } from 'react-router-dom';
import SearchPage from './components/pages/SearchResults';
import ItemDetails from './components/pages/SearchResults/ItemDetails';
import styles from './DetailLayout.module.scss';

export default function DetailLayout() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className={styles['results__wrapper']}>
      <SearchPage />
      {id ? <ItemDetails /> : null}
    </div>
  );
}
