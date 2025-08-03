import { describe, expect, test, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const hookPath = '../hooks/useCharacterById';

const renderWithRouter = async (route = '/details/123') => {
  const { default: ItemDetails } = await import(
    '../layout/SearchResults/ItemDetails'
  );
  render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/details/:id" element={<ItemDetails />} />
        <Route path="/details/" element={<ItemDetails />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Testing ItemDetails', () => {
  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  test('renders character card', async () => {
    vi.doMock(hookPath, () => ({
      __esModule: true,
      default: () => ({
        character: {
          name: 'Stas',
          uid: '123',
          species: 'Human',
          homeWorld: 'Earth',
        },
        loading: false,
        error: null,
      }),
    }));
    await renderWithRouter('/details/123');
    expect(screen.getByText('Stas')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Earth')).toBeInTheDocument();
  });

  test('renders Missing UID if id param is missing', async () => {
    vi.doMock(hookPath, () => ({
      __esModule: true,
      default: () => ({
        character: null,
        loading: false,
        error: null,
      }),
    }));
    await renderWithRouter('/details/');
    expect(screen.getByText('Missing UID')).toBeInTheDocument();
  });

  test('renders Loading... when loading', async () => {
    vi.doMock(hookPath, () => ({
      __esModule: true,
      default: () => ({
        character: null,
        loading: true,
        error: null,
      }),
    }));
    await renderWithRouter('/details/123');
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
