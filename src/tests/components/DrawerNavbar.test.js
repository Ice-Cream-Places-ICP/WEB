import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom';
import DrawerNavbar from '../../components/DrawerNavbar'
import { mockedNavbarLinks } from '../__mocks__/mockedNavbar';

describe('DrawerNavbar', () => {
  it('render closed navbar, then click to open', async () => {
    render(
      <MemoryRouter>
        <DrawerNavbar links={mockedNavbarLinks} />
      </MemoryRouter>
    )
    
    expect(screen.queryByText(/Szukaj/)).toBeNull();
    expect(screen.queryByText(/Profil/)).toBeNull();
  
    await userEvent.click(screen.getAllByRole('link')[1])

    await screen.findByText(/Szukaj/)
    await screen.findByText(/Profil/)
  });
});