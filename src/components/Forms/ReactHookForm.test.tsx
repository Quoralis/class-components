import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ReactHookForm from './ReactHookForm';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const mockReducer = {
  countries: () => ({ list: ['Serbia', 'Germany', 'USA'] }),
  addForm: () => ({
    dataUser: [],
    lastAddedEmail: null,
  }),
};

const renderWithRedux = (ui: React.ReactElement) => {
  const store = configureStore({ reducer: mockReducer });
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('ReactHookForm basic', () => {
  it('renders form and disables submit', () => {
    renderWithRedux(<ReactHookForm close={() => {}} />);
    expect(screen.getByText(/React Hook Form/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeDisabled();
  });
});
