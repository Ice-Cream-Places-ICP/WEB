import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { UserContext } from '../../context/UserContext';
import ProfileView from '../../components/ProfileView'

describe('ProfileView', () => {
  it('render profile view', () => {
    render(
      <UserContext.Provider value={{}}>
        <ProfileView />
      </UserContext.Provider>
    )

    expect(screen.getByTestId(/color-ring-svg/)).toBeInTheDocument();
  });
});