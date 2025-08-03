import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store.ts';

describe('ReactApp', () => {
  test('should render the App', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
  });
});
