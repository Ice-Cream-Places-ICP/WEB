import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProfileNavigation from '../../components/ProfileNavigation'

describe('ProfileNavigation', () => {
  it('render profile navigation', () => {
    render(
      <MemoryRouter>
        <ProfileNavigation />
      </MemoryRouter>
    )

    expect(screen.getByText(/Przeglądaj/)).toBeInTheDocument();
    expect(screen.getByText(/Edytuj/)).toBeInTheDocument();
  });
});