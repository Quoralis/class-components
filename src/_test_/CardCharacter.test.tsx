import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';
import CardCharacter from '../layout/SearchResults/CardsCharacter';

const mockItems = [
  {
    uid: '001',
    name: 'Spock',
    gender: 'Male',
    birthDate: '2230-01-01',
  },
  {
    uid: '002',
    name: 'Uhura',
    gender: 'Female',
    birthDate: undefined,
  },
];

describe('CardCharacter', () => {
  test('renders character details', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardCharacter items={mockItems} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Spock')).toBeInTheDocument();
    expect(screen.getByText('Uhura')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('Female')).toBeInTheDocument();
    expect(screen.getByText('2230-01-01')).toBeInTheDocument();
    expect(screen.getByText('unknown')).toBeInTheDocument(); // Uhura.birthDate
  });

  test('link with correct href', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/search?page=2']}>
          <CardCharacter items={mockItems} />
        </MemoryRouter>
      </Provider>
    );

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/details/001?page=2');
    expect(links[1]).toHaveAttribute('href', '/details/002?page=2');
  });
});
