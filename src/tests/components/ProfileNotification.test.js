import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { NotificationContext } from '../../context/NotificationContext';
import { UserContext } from '../../context/UserContext';
import ProfileNotification from '../../components/ProfileNotification'

describe('ProfileNotification', () => {
  const mockedUser = { setUser: () => {}, user: { notifications: []}, deleteUser: () => {} }

  it('render profile edit', () => {
    render(
      <UserContext.Provider value={mockedUser}>
        <NotificationContext.Provider value={{}}>
          <ProfileNotification />
        </NotificationContext.Provider>
      </UserContext.Provider>
    )

    expect(screen.getByText(/Powiadomienia/)).toBeInTheDocument();
  });
});