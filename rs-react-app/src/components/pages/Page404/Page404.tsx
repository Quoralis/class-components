import { Link } from 'react-router-dom';

function Page404() {
  return (
    <div>
      <h1>ERROR,PAGE 404</h1>
      <Link to="/">
        <button>Main</button>
      </Link>
    </div>
  );
}

export default Page404;
