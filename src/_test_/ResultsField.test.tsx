import { beforeEach, afterEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';
import ResultsField from '../layout/SearchResults/ResultsFieldFn';

const listPayload = {
  page: { pageNumber: 0, pageSize: 16, totalElements: 2, totalPages: 3 },
  characters: [
    { uid: 'CHMA0001', name: 'Spock' },
    { uid: 'CHMA0002', name: 'Kirk' },
  ],
};

function renderWithProviders(route = '/') {
  window.history.pushState({}, 'Test', route);
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <ResultsField />
      </MemoryRouter>
    </Provider>
  );
}

beforeEach(() => {
  vi.restoreAllMocks();
  vi.spyOn(globalThis, 'fetch').mockImplementation((input) => {
    const url = typeof input === 'string' ? input : (input as Request).url;
    if (url.includes('/character/search')) {
      return Promise.resolve(
        new Response(JSON.stringify(listPayload), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      );
    }
    return Promise.resolve(new Response(null, { status: 404 }));
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ResultsFieldFn', () => {
  test('renders results container and character names after fetch', async () => {
    renderWithProviders('/?page=1');
    const results = await screen.findByTestId('results');
    expect(results).toBeInTheDocument();
    expect(await screen.findByText(/Spock/i)).toBeInTheDocument();
    expect(await screen.findByText(/Kirk/i)).toBeInTheDocument();
  });

  test('handles page number from query string', async () => {
    renderWithProviders('/?page=2');
    const results = await screen.findByTestId('results');
    expect(results).toBeInTheDocument();
  });
});
