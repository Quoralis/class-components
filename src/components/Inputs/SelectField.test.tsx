import { render, screen, fireEvent } from '@testing-library/react';
import SelectField from './SelectField';
import { describe, expect, test } from 'vitest';

describe('SelectField', () => {
  const options = [
    { value: '', label: 'Select gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  test('renders select with options', () => {
    render(<SelectField label="Gender" id="gender" options={options} />);
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Male' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Female' })).toBeInTheDocument();
  });

  test('selects an option', () => {
    render(<SelectField label="Gender" id="gender" options={options} />);
    const select = screen.getByLabelText(/Gender/i) as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'female' } });
    expect(select.value).toBe('female');
  });
});
