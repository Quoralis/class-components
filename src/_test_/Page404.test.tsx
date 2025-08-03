import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Page404 from '../layout/Page404/Page404';

test('Page404 shows not found text', () => {
  render(
    <BrowserRouter>
      <Page404 />
    </BrowserRouter>
  );
  expect(screen.getByText(/404/i)).toBeInTheDocument();
});
