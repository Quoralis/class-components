import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import CardsList from './CardsList';

type MockUser = {
  name: string;
  email: string;
  age: number;
  gender: string;
  country: string;
  image: string;
};

type AddFormState = {
  dataUser: MockUser[];
  lastAddedEmail: string;
};

type PreloadedState = {
  addForm: AddFormState;
};

const addFormReducer = (
  state: AddFormState = { dataUser: [], lastAddedEmail: '' }
): AddFormState => state;

const renderWithStore = (preloadedState: PreloadedState) => {
  const store = configureStore({
    reducer: combineReducers({
      addForm: addFormReducer,
    }),
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <CardsList />
    </Provider>
  );
};

describe('CardsList', () => {
  it('renders "No users yet" when dataUser is empty', () => {
    renderWithStore({
      addForm: {
        dataUser: [],
        lastAddedEmail: '',
      },
    });

    expect(screen.getByText(/No users yet/i)).toBeInTheDocument();
  });

  it('renders list of users', () => {
    const mockUsers: MockUser[] = [
      {
        name: 'Alice',
        email: 'alice@example.com',
        age: 25,
        gender: 'female',
        country: 'USA',
        image: '',
      },
      {
        name: 'Bob',
        email: 'bob@example.com',
        age: 30,
        gender: 'male',
        country: 'Canada',
        image: '',
      },
    ];

    renderWithStore({
      addForm: {
        dataUser: mockUsers,
        lastAddedEmail: '',
      },
    });

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('applies special class to last added user', () => {
    const mockUsers: MockUser[] = [
      {
        name: 'Alice',
        email: 'alice@example.com',
        age: 25,
        gender: 'female',
        country: 'USA',
        image: '',
      },
      {
        name: 'Bob',
        email: 'bob@example.com',
        age: 30,
        gender: 'male',
        country: 'Canada',
        image: '',
      },
    ];

    renderWithStore({
      addForm: {
        dataUser: mockUsers,
        lastAddedEmail: 'bob@example.com',
      },
    });

    const bobCard = screen.getByText('Bob').closest('.card');
    expect(bobCard).toHaveClass('bg-primary-subtle');
    expect(bobCard).toHaveClass('border');
  });
});
