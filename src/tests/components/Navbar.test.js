import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import { mockedNavbarLinks } from '../__mocks__/mockedNavbar';

describe('Navbar', () => {
  it('render search, profile and admin items', () => {
    render(
      <MemoryRouter>
        <Navbar links={mockedNavbarLinks} />
      </MemoryRouter>
    )

    expect(screen.getByText(/Szukaj/)).toBeInTheDocument();
    expect(screen.getByText(/Profil/)).toBeInTheDocument();
    expect(screen.queryByText(/Admin/)).toBeNull();
  });
});