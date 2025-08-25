import { render, screen, fireEvent } from '@testing-library/react';
import InputField from './InputField';
import { describe, expect, test } from 'vitest';

describe('InputField', () => {
  test('renders input with label', () => {
    render(<InputField label="Email" id="email" type="email" />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });

  test('accepts user input', () => {
    render(<InputField label="Username" id="username" />);
    const input = screen.getByLabelText(/Username/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'John' } });
    expect(input.value).toBe('John');
  });
});
