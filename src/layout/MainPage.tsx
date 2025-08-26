import { lazy, Suspense } from 'react';

const CountryList = lazy(() => import('../components/CountryList.tsx'));

export default function MainPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CountryList />
    </Suspense>
  );
}
