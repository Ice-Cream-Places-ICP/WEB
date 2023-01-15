import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { ThemeContext } from '../../context/ThemeContext';
import { NotificationContext } from '../../context/NotificationContext';
import { MemoryRouter } from 'react-router-dom';
import ProfileNavigation from '../../components/ProfileNavigation'

describe('ProfileNavigation', () => {
  it('render profile edit', () => {
    render(
      <ThemeContext.Provider value={{getIsMobile: () => true}}>
        <NotificationContext.Provider value={{}}>
          <MemoryRouter>
            <ProfileNavigation />
          </MemoryRouter>
        </NotificationContext.Provider>
      </ThemeContext.Provider>
    )

    expect(screen.getByText(/Przeglądaj/)).toBeInTheDocument();
    expect(screen.getByText(/Edytuj/)).toBeInTheDocument();
    expect(screen.getByText(/Ulubione/)).toBeInTheDocument();
    expect(screen.getByText(/Powiadomienia/)).toBeInTheDocument();
    expect(screen.getByText(/Lodziarnie/)).toBeInTheDocument();
  });
});