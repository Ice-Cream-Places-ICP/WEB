import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import ProfileEdit from '../../components/ProfileEdit'

describe('ProfileEdit', () => {
  it('render profile edit', () => {
    render(
      <ProfileEdit />
    )

    expect(screen.getByText(/Edytuj profil/)).toBeInTheDocument();
    expect(screen.getByText(/W budowie.../)).toBeInTheDocument();
  });
});