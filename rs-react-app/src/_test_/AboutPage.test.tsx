import { render, screen } from '@testing-library/react';
import AboutPage from '../components/pages/About/AboutPage.tsx';
import { expect, test } from 'vitest';

test('AboutPage renders content', () => {
  render(<AboutPage />);
  const items = screen.getAllByText(/about/i);
  expect(items.length).toBeGreaterThan(0);
});
