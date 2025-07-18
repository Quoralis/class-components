import { beforeAll, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResultsField } from '../components/ResultsField.tsx';

describe('Test ResultsField', () => {
  beforeAll(() => {
    window.fetch = vi.fn().mockResolvedValue({
      json: async () => ({
        characters: [{ uid: 'CHMA0000215045', name: '0413 Theta' }],
      }),
    });
    render(<ResultsField search={''} triggerSearch={false} />);
  });

  test('renders results div after fetch', async () => {
    const elementResults = await screen.findByTestId('results');
    expect(elementResults).toBeInTheDocument();
  });
});
