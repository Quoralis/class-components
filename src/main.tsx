import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import MainPage from './layout/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <Suspense fallback={<p>Loading</p>}>
        <MainPage />
      </Suspense>
    </StrictMode>
  );
}
