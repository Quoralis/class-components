import { useSearchParams, Link } from 'react-router-dom';

export default function ItemDetails() {
  const [searchParams] = useSearchParams();
  const query = searchParams.toString();

  return (
    <div>
      <h2>Details</h2>
      <Link to={`/?${query}`}>
        <button>X</button>
      </Link>
    </div>
  );
}
