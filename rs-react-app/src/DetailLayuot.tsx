import { useParams } from 'react-router-dom';
import SearchPage from './components/pages/SearchResults';
import ItemDetails from './components/pages/SearchResults/ItemDetails';

export default function DetailLayout() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <div>
        <SearchPage />
      </div>
      <div>{id ? <ItemDetails /> : null}</div>
    </div>
  );
}
