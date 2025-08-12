import { afterEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';

const apiPath = '../store/characterApi';

async function renderWithRouter(route = '/details/123') {
  const { default: ItemDetails } = await import(
    '../layout/SearchResults/ItemDetails'
  );
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/details/:id" element={<ItemDetails />} />
          <Route path="/details/" element={<ItemDetails />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

describe('Testing ItemDetails', () => {
  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  test('renders character card', async () => {
    vi.doMock(apiPath, () => ({
      __esModule: true,
      useGetCharacterByIdQuery: (uid: string) => ({
        data: {
          character: {
            uid,
            name: 'Stas',
            species: 'Human',
            homeWorld: 'Earth',
          },
        },
        isLoading: false,
        error: undefined,
      }),
    }));
    await renderWithRouter('/details/123');
    expect(screen.getByText('Stas')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Earth')).toBeInTheDocument();
  });

  test('renders Missing UID if id param is missing', async () => {
    vi.doMock(apiPath, () => ({
      __esModule: true,
      useGetCharacterByIdQuery: () => ({
        data: undefined,
        isLoading: false,
        error: undefined,
      }),
    }));
    await renderWithRouter('/details/');
    expect(screen.getByText('Missing UID')).toBeInTheDocument();
  });

  test('renders Loading... when loading', async () => {
    vi.doMock(apiPath, () => ({
      __esModule: true,
      useGetCharacterByIdQuery: () => ({
        data: undefined,
        isLoading: true,
        error: undefined,
      }),
    }));
    await renderWithRouter('/details/123');
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
