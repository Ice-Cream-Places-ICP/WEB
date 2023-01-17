import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import LoginFailed from '../../pages/LoginFailed'
import { MemoryRouter } from 'react-router-dom';

describe('LoginFailed', () => {
  it('render LoginFailed component', async () => {
    render(
      <MemoryRouter>
        <LoginFailed />
      </MemoryRouter>
    )

    expect(screen.getByText(/Coś poszło nie tak.../)).toBeInTheDocument();
    expect(screen.queryByText(/Kliknij tutaj aby spróbować ponownie./)).toBeInTheDocument;
  });

});