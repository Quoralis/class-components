import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { ResultsField } from '../components/ResultsField.tsx';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '../components/ErrorBoundary.tsx';

describe('Test ResultsField', () => {
  const user = userEvent.setup();
  let errorBtn: HTMLButtonElement;
  beforeEach(() => {
    window.fetch = vi.fn().mockResolvedValue({
      json: async () => ({
        characters: [{ uid: 'CHMA0000215045', name: '0413 Theta' }],
      }),
    });
    render(
      <ErrorBoundary>
        <ResultsField search="" triggerSearch={false} />
      </ErrorBoundary>
    );
  });

  test('renders results div after fetch', async () => {
    const elementResults = await screen.findByTestId('results');
    expect(elementResults).toBeInTheDocument();
  });

  test('test click button throwError', async () => {
    errorBtn = await screen.findByRole('button');
    await user.click(errorBtn);
    const div = await screen.findByText('ErrorRender');
    expect(div).toBeInTheDocument();
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });
});
