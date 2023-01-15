import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeContext } from '../../context/ThemeContext';
import { UserContext } from '../../context/UserContext';
import { NotificationContext } from '../../context/NotificationContext';
import { MemoryRouter } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader'

describe('AdminHeader', () => {
  it('renders AdminHeader component', async () => {
    render(
      <ThemeContext.Provider value={{}}>
        <UserContext.Provider value={{}}>
          <NotificationContext.Provider value={{}}>
            <MemoryRouter>
              <AdminHeader />
            </MemoryRouter>
          </NotificationContext.Provider>
        </UserContext.Provider>
      </ThemeContext.Provider>
    )

    await userEvent.click(screen.getByRole('button'))
    expect(screen.queryByText(/Profil/)).toBeInTheDocument();
    expect(screen.queryByText(/Administrator/)).toBeInTheDocument();
    expect(screen.queryByText(/Wyloguj/)).toBeInTheDocument();
  })
})