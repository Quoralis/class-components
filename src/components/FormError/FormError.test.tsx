import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FormError from './FormError';
import type { FieldError } from 'react-hook-form';

describe('FormError component', () => {
  it('renders RHF error as string', () => {
    render(<FormError field="name" rhfErrors="Name is required" />);
    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });

  it('renders RHF error as array of strings', () => {
    render(
      <FormError
        field="email"
        rhfErrors={['Invalid email', 'Must be @gmail.com']}
      />
    );
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.getByText('Must be @gmail.com')).toBeInTheDocument();
  });

  it('renders RHF error as object with message', () => {
    const rhfError: FieldError = {
      type: 'required',
      message: 'This field is required',
    };

    render(<FormError field="age" rhfErrors={rhfError} />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders empty container when no error', () => {
    render(<FormError field="name" />);
    const container = screen.getByText(
      (_, node) => node?.classList?.contains('text-danger') ?? false
    );
    expect(container).toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();
  });
});
