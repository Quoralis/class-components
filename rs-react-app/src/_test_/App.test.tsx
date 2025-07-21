import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App.tsx';

describe('ReactApp', () => {
  test('should render the App', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });
});
