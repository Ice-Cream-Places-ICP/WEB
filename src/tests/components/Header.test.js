import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { ThemeContext } from '../../context/ThemeContext';
import { UserContext } from '../../context/UserContext';
import { NotificationContext } from '../../context/NotificationContext';
import { userTestOne } from '../__mocks__/user';
import Header from '../../components/Header'
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('Header', () => {
  it('render Header component', async () => {
    const mockedTheme = { darkMode: true } 
    const mockedUser = { setUser: () => {}, user: userTestOne, deleteUser: () => {} }
    const mockedNotification = {}

    render(
      <ThemeContext.Provider value={mockedTheme}>
        <UserContext.Provider value={mockedUser}>
          <NotificationContext.Provider value={mockedNotification}>
            <MemoryRouter>
              <Header />
            </MemoryRouter>
          </NotificationContext.Provider>
        </UserContext.Provider>
      </ThemeContext.Provider>
    )

    await userEvent.click(screen.getByRole('button'))
    expect(screen.queryByText(/Zaloguj/)).toBeInTheDocument();
    expect(screen.queryByText(/Zarejestruj/)).toBeInTheDocument();
    expect(screen.queryByText(/Tryb ciemny/)).toBeInTheDocument();
  });
});