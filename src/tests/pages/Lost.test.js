import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Lost from '../../pages/Lost'

describe('Lost', () => {
  it('render mocked shop card for test 1', () => {
    render(
      <MemoryRouter>
        <Lost />
      </MemoryRouter>
    )

    expect(screen.getByText(/Upsss... Wygląda na to, że się zgubiłeś.../)).toBeInTheDocument();
    expect(screen.getByText(/Lub nie masz uprawnień, aby przeglądać zawartość tej podstrony. Jeśli jesteś użytkownikiem, możesz nie być zalogowany. Kliknij/)).toBeInTheDocument();
    expect(screen.getByText(/aby się zalogować./)).toBeInTheDocument();
    expect(screen.getByText(/aby przejść na stronę główną./)).toBeInTheDocument();
  });
});