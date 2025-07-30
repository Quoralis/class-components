import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBarFn from '../components/pages/SearchResults/SearchBarFn.tsx';
import { useState } from 'react';
import { Provider } from 'react-redux';
import store from '../store/store.ts';

describe('Test SearchBar', () => {
  const inputValue = 'Qwerty';
  let input: HTMLInputElement;
  let buttonSearch: HTMLButtonElement;
  const user = userEvent.setup();
  const onSearchMok = vi.fn();

  beforeEach(() => {
    render(
      <Provider store={store}>
        <SearchBarFn onSearch={onSearchMok} search="Qwerty" />
        );
      </Provider>
    );
    input = screen.getByRole('searchbox');
    buttonSearch = screen.getByRole('button', { name: 'Search' });
  });

  test('renders empty input initially', () => {
    expect(input.value).toBe(inputValue);
  });

  test('renders input field', () => {
    expect(input).toBeInTheDocument();
  });

  test('updates input value on user typing', async () => {
    await user.type(input, 'Qwerty');
    expect(input).toHaveValue('Qwerty');
  });

  test('test button is clicked ', async () => {
    await user.type(input, 'Qwerty');
    await user.click(buttonSearch);
    expect(onSearchMok).toHaveBeenCalledWith('Qwerty');
  });
});

describe('SearchBarFn localStorage interaction', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    localStorage.clear();
  });

  function Wrapper() {
    const [search, setSearch] = useState('');
    return (
      <Provider store={store}>
        <SearchBarFn search={search} onSearch={setSearch} />
      </Provider>
    );
  }

  test('adds value to localStorage on button click', async () => {
    render(<Wrapper />);
    const input = screen.getByPlaceholderText(/enter name character/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'Spock');
    await user.click(button);

    expect(localStorage.getItem('search')).toBe('Spock');
  });

  test('does not save empty', async () => {
    render(<Wrapper />); // Wrapper — компонент с useState

    const input = screen.getByPlaceholderText(/enter name character/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, '   ');
    await user.click(button);

    expect(localStorage.getItem('search')).toBeNull();
  });
});
