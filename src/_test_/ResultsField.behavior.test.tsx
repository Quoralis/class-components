import { beforeEach, afterEach, describe, expect, test, vi } from 'vitest';
import type { MockInstance } from 'vitest';
import { render, screen, cleanup, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import type { Store, AnyAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import type { setSearchTerm as SetSearchTermFn } from '../store/searchSlice';
import type { characterApi as CharacterApiExport } from '../store/characterApi';
import type ResultsFieldCmp from '../layout/SearchResults/ResultsFieldFn';

let store: Store<RootState, AnyAction>;
let setSearchTerm: typeof SetSearchTermFn;
let characterApi: typeof CharacterApiExport;
let ResultsField: typeof ResultsFieldCmp;
let fetchSpy: MockInstance<typeof fetch>;

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

function parseBody(body: unknown): Record<string, string> {
  if (!body) return {};
  if (typeof body === 'string')
    return Object.fromEntries(new URLSearchParams(body));
  if (body instanceof URLSearchParams) return Object.fromEntries(body);
  return {};
}

function mockSuccessFetch() {
  fetchSpy = vi
    .spyOn(globalThis, 'fetch')
    .mockImplementation(async (input, init) => {
      const url =
        typeof input === 'string'
          ? input
          : input instanceof Request
            ? input.url
            : String(input);
      if (!url.includes('/character/search')) {
        return new Response(null, { status: 404 });
      }
      const { name = '' } = parseBody(init?.body);
      const payload =
        name === 'Kirk'
          ? {
              page: {
                pageNumber: 0,
                pageSize: 16,
                totalElements: 1,
                totalPages: 1,
              },
              characters: [{ uid: 'CHMA0002', name: 'Kirk' }],
            }
          : {
              page: {
                pageNumber: 0,
                pageSize: 16,
                totalElements: 2,
                totalPages: 3,
              },
              characters: [
                { uid: 'CHMA0001', name: 'Spock' },
                { uid: 'CHMA0002', name: 'Kirk' },
              ],
            };
      return new Response(JSON.stringify(payload), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    });
}

beforeEach(async () => {
  vi.resetModules();
  vi.restoreAllMocks();
  ({ default: store } = await import('../store/store'));
  ({ setSearchTerm } = await import('../store/searchSlice'));
  ({ characterApi } = await import('../store/characterApi'));
  ({ default: ResultsField } = await import(
    '../layout/SearchResults/ResultsFieldFn'
  ));
  store.dispatch(characterApi.util.resetApiState());
  store.dispatch(setSearchTerm(''));
  mockSuccessFetch();
});

afterEach(() => {
  vi.restoreAllMocks();
  cleanup();
});

describe('ResultsField caching and states', () => {
  test('renders error state on server error', async () => {
    fetchSpy.mockImplementationOnce(async () => {
      return new Response(JSON.stringify({ message: 'fail' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    });

    await act(async () => {
      store.dispatch(characterApi.util.resetApiState());
      store.dispatch(setSearchTerm('error-case'));
    });

    renderWithProviders('/?page=1');
    expect(await screen.findByText(/Error loading/i)).toBeInTheDocument();
  });

  test('uses cached query result on remount with same args', async () => {
    renderWithProviders('/?page=1');
    expect(await screen.findByTestId('results')).toBeInTheDocument();
    expect(await screen.findByText(/Spock/i)).toBeInTheDocument();
    expect(await screen.findByText(/Kirk/i)).toBeInTheDocument();

    const callsBefore = fetchSpy.mock.calls.length;

    cleanup();
    renderWithProviders('/?page=1');

    expect(await screen.findByTestId('results')).toBeInTheDocument();
    expect(await screen.findByText(/Spock/i)).toBeInTheDocument();
    expect(await screen.findByText(/Kirk/i)).toBeInTheDocument();

    const callsAfter = fetchSpy.mock.calls.length;
    expect(callsAfter).toBe(callsBefore);
  });

  test('refetches when search term changes', async () => {
    renderWithProviders('/?page=1');
    expect(await screen.findByText(/Spock/i)).toBeInTheDocument();
    expect(await screen.findByText(/Kirk/i)).toBeInTheDocument();

    const callsBefore = fetchSpy.mock.calls.length;

    await act(async () => {
      store.dispatch(setSearchTerm('Kirk'));
    });

    expect(await screen.findByText(/^Kirk$/i)).toBeInTheDocument();

    const callsAfter = fetchSpy.mock.calls.length;
    expect(callsAfter).toBeGreaterThan(callsBefore);
  });
});
