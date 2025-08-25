import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, it, expect, vi } from 'vitest';
import UncontrolledForm from './UncontrolledForm';
import { store } from '../../store/store';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('UncontrolledForm', () => {
  it('renders all form fields and buttons', () => {
    renderWithProvider(<UncontrolledForm close={vi.fn()} />);

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/I accept Terms and Conditions/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload your picture/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('shows validation errors when submitted with empty fields', async () => {
    renderWithProvider(<UncontrolledForm close={vi.fn()} />);

    const submitBtn = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getAllByText((text) => text.length > 0)).not.toHaveLength(
        0
      );
    });
  });
});
