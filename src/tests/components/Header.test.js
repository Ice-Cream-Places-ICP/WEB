import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { UserContextProvider } from '../../context/UserContext';
import Header from '../../components/Header'
import { getUserContextStateMock, getThemeContextMock } from '../__mocks__/mockedContexts';

describe('Header', () => {
  it('render header for default user type', () => {
    render(
      <MemoryRouter>
        <ThemeContext.Provider value={{...getThemeContextMock()}}>
          <UserContextProvider value={{...getUserContextStateMock()}}>
            <Header />
          </UserContextProvider>
        </ThemeContext.Provider>
      </MemoryRouter>
    )

    expect(screen.getByText(/Szukaj/)).toBeInTheDocument();
    expect(screen.getByText(/Zaloguj/)).toBeInTheDocument();
    expect(screen.getByText(/Zarejestruj/)).toBeInTheDocument();
  });
});