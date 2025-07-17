import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchBar } from '../components/SearchBar.tsx';

describe('Test SearchBar', () => {
  const inputValue = '';
  let input: HTMLInputElement;
  beforeEach(() => {
    render(<SearchBar onSearch={vi.fn()} />);
    input = screen.getByRole('textbox');
  });
  test('Test empty input', () => {
    expect(input.value).toBe(inputValue);
  });
  test('renders input field', () => {
    expect(input).toBeInTheDocument();
  });
});
