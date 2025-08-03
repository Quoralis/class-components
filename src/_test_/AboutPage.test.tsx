import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import AboutPage from '../layout/About/AboutPage';

test('AboutPage renders content', () => {
  render(<AboutPage />);
  const items = screen.getAllByText(/about/i);
  expect(items.length).toBeGreaterThan(0);
});
