import { render, screen, fireEvent } from '@testing-library/react';
import CheckboxField from './CheackBoxField';
import { describe, expect, test } from 'vitest';

describe('CheckboxField', () => {
  test('renders checkbox with label', () => {
    render(<CheckboxField label="Accept terms" id="accept" />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(screen.getByLabelText(/Accept terms/i)).toBeInTheDocument();
  });

  test('responds to click', () => {
    render(<CheckboxField label="Subscribe" id="subscribe" />);
    const checkbox = screen.getByLabelText(/Subscribe/i) as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });
});
