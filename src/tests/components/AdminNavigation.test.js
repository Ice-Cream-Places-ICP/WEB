import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotificationContext } from '../../context/NotificationContext';
import { ThemeContext } from '../../context/ThemeContext';
import { UserContext } from '../../context/UserContext';
import AdminNavigation from '../../components/AdminNavigation'

describe('AdminNavigation', () => {
  it('renders AdminNavigation component', async () => {
    const mockedTheme = { getIsMobile: () => true } 
    const mockedUser = {}
    const mockedNotification = {}

    render(
      <ThemeContext.Provider value={mockedTheme}>
        <UserContext.Provider value={mockedUser}>
          <NotificationContext.Provider value={mockedNotification}>
            <MemoryRouter>
              <AdminNavigation />
            </MemoryRouter>
          </NotificationContext.Provider>
        </UserContext.Provider>
      </ThemeContext.Provider>
    )

    expect(screen.queryByText(/Lodziarnie/)).toBeInTheDocument();
    expect(screen.queryByText(/Użytkownicy/)).toBeInTheDocument();

    // TODO: click link and check if url match
  })
})