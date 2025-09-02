import { lazy, Suspense } from 'react';
import Spinner from '../components/Spinner/Spinner';

const CountryList = lazy(() => import('../components/Countries/CountryList'));

export default function MainPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <CountryList />
    </Suspense>
  );
}
