import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ButtonAction from './ButtonAction';

describe('ButtonAction', () => {
  it('renders with default props', () => {
    render(<ButtonAction name="Click me" />);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).not.toBeDisabled();
  });

  it('renders with custom type and className', () => {
    render(
      <ButtonAction name="Submit" type="submit" className="btn-primary" />
    );
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveClass('btn btn-primary');
  });

  it('renders disabled button when disabled is true', () => {
    render(<ButtonAction name="Disabled" disabled />);
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<ButtonAction name="Click" onClick={handleClick} />);
    const button = screen.getByRole('button', { name: /click/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
