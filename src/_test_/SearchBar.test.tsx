import { beforeEach, afterEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../store/store';
import SearchBarFn from '../layout/SearchResults/SearchBarFn';
import { setSearchTerm } from '../store/searchSlice';

function renderWithProvider(ui: React.ReactNode) {
  return render(<Provider store={store}>{ui}</Provider>);
}

describe('SearchBarFn (redux-driven)', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  test('initializes from localStorage on mount (and syncs into input via store)', async () => {
    localStorage.setItem('search', 'Qwerty');
    renderWithProvider(<SearchBarFn />);
    const input = await screen.findByRole('searchbox');
    expect(input).toHaveValue('Qwerty');
  });

  test('updates input value on user typing', async () => {
    renderWithProvider(<SearchBarFn />);
    const input = screen.getByRole('searchbox');
    await user.clear(input);
    await user.type(input, 'Spock');
    expect(input).toHaveValue('Spock');
  });

  test('clicking Search saves to localStorage and dispatches setSearchTerm', async () => {
    const spy = vi.spyOn(store, 'dispatch');
    renderWithProvider(<SearchBarFn />);
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: /search/i });
    await user.clear(input);
    await user.type(input, 'Spock');
    await user.click(button);
    expect(localStorage.getItem('search')).toBe('Spock');
    expect(spy).toHaveBeenCalledWith(setSearchTerm('Spock'));
  });

  test('clicking Search with spaces saves spaces and dispatches as-is', async () => {
    const spy = vi.spyOn(store, 'dispatch');
    renderWithProvider(<SearchBarFn />);
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: /search/i });
    await user.clear(input);
    await user.type(input, '   ');
    await user.click(button);
    expect(localStorage.getItem('search')).toBe('   ');
    expect(spy).toHaveBeenCalledWith(setSearchTerm('   '));
  });
});
