import { render, screen } from '@testing-library/react';
import CountyInputField from './CountyInputField';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { describe, expect, test } from 'vitest';

const mockStore = configureStore({
  reducer: combineReducers({
    countries: () => ({
      list: ['Serbia', 'Germany', 'France'],
    }),
  }),
});

describe('CountyInputField', () => {
  test('renders input with country datalist', () => {
    render(
      <Provider store={mockStore}>
        <CountyInputField label="Country" id="country" />
      </Provider>
    );

    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    const input = screen.getByRole('combobox'); // <input type="text" list="..." />
    expect(input).toBeInTheDocument();
    expect(input.getAttribute('list')).toBe('country-list');
  });
});
