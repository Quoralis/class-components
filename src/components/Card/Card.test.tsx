import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from './Card';

const mockUser = {
  name: 'Alice Smith',
  email: 'alice@example.com',
  age: 28,
  gender: 'female',
  country: 'Canada',
  image: 'https://example.com/avatar.jpg',
  className: 'custom-class',
};

describe('Card', () => {
  it('renders all user data correctly', () => {
    render(<Card {...mockUser} />);

    expect(screen.getByText(/Alice Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/alice@example.com/i)).toBeInTheDocument();
    expect(screen.getByText('28')).toBeInTheDocument();
    expect(screen.getByText(/female/i)).toBeInTheDocument();
    expect(screen.getByText(/Canada/i)).toBeInTheDocument();
  });

  it('renders image with correct src and alt', () => {
    render(<Card {...mockUser} />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img).toHaveAttribute('src', mockUser.image);
    expect(img).toHaveAttribute('alt', 'avatar');
  });

  it('applies custom className', () => {
    render(<Card {...mockUser} />);
    const card = screen.getByText(mockUser.name).closest('.card');
    expect(card).toHaveClass('custom-class');
  });

  it('renders default classes correctly even without custom className', () => {
    const { ...userWithoutClass } = mockUser;
    render(<Card {...userWithoutClass} />);
    const card = screen.getByText(userWithoutClass.name).closest('.card');
    expect(card).toHaveClass('card', 'p-3', 'shadow-sm', 'mb-3');
  });
});
