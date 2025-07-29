import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App.tsx';
import { BrowserRouter } from 'react-router-dom';

describe('ReactApp', () => {
  test('should render the App', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
  });
});
