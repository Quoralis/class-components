import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import MainPage from './layout/MainPage';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <Provider store={store}>
        <MainPage />;
      </Provider>
    </StrictMode>
  );
}
