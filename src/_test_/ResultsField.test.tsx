import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store.ts';
import { ErrorBoundary } from '../layout/SearchResults/ErrorBoundary';
import ResultsFieldFn from '../layout/SearchResults/ResultsFieldFn';

describe('Test ResultsField', () => {
  const user = userEvent.setup();
  let errorBtn: HTMLButtonElement;
  beforeEach(() => {
    window.fetch = vi.fn().mockResolvedValue({
      json: async () => ({
        characters: [{ uid: 'CHMA0000215045', name: '0413 Theta' }],
        page: {
          pageNumber: 0,
          pageSize: 16,
          totalElements: 1,
          totalPages: 1,
        },
      }),
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ErrorBoundary>
            <ResultsFieldFn search="" triggerSearch={false} />
          </ErrorBoundary>
        </BrowserRouter>
      </Provider>
    );
  });

  test('renders results div after fetch', async () => {
    const elementResults = await screen.findByTestId('results');
    expect(elementResults).toBeInTheDocument();
  });

  test('test click button throwError', async () => {
    errorBtn = await screen.findByRole('button', {
      name: /throw error/i,
    });
    await user.click(errorBtn);
    const div = await screen.findByText('ErrorRender');
    expect(div).toBeInTheDocument();
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });
});
