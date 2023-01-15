import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { NotificationContext } from '../../context/NotificationContext';
import ProfileNotification from '../../components/ProfileNotification'

describe('ProfileNotification', () => {
  it('render profile edit', () => {
    render(
      <NotificationContext.Provider value={{}}>
        <ProfileNotification />
      </NotificationContext.Provider>
    )

    expect(screen.getByText(/Powiadomienia/)).toBeInTheDocument();
  });
});