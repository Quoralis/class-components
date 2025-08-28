import { lazy, Suspense } from 'react';

const CountryList = lazy(() => import('../components/Countries/CountryList'));

export default function MainPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CountryList />
    </Suspense>
  );
}
