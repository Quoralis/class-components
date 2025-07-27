import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '../components/pages/SearchResults/ErrorBoundary.tsx';
import ResultsFieldFn from '../components/pages/SearchResults/ResultsFieldFn.tsx';
import { BrowserRouter } from 'react-router-dom';

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
      <BrowserRouter>
        <ErrorBoundary>
          <ResultsFieldFn search="" triggerSearch={false} />
        </ErrorBoundary>
      </BrowserRouter>
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
