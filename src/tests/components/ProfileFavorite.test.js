import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import ProfileFavorite from '../../components/ProfileFavorite'

describe('ProfileFavorite', () => {
  it('render profile edit', () => {
    render(<ProfileFavorite />)

    expect(screen.getByText(/Ulubione/)).toBeInTheDocument();
    expect(screen.getByText(/W budowie.../)).toBeInTheDocument();
  });
});