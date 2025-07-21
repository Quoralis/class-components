import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchBar } from '../components/SearchBar.tsx';
import userEvent from '@testing-library/user-event';

describe('Test SearchBar', () => {
  const inputValue = '';
  let input: HTMLInputElement;
  let buttonSearch: HTMLButtonElement;
  const user = userEvent.setup();
  const onSearchMok = vi.fn();

  beforeEach(() => {
    render(<SearchBar onSearch={onSearchMok} />);
    input = screen.getByRole('textbox');
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
