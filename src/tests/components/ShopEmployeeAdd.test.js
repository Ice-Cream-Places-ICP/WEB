import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { mockedShop } from '../__mocks__/mockedShop';
import ShopEmployeeAdd from '../../components/ShopEmployeeAdd'
import { ThemeContext } from '../../context/ThemeContext';

describe('ShopEmployeeAdd', () => {
  const mockSetStep = jest.fn()

  it('render mocked shop add addredss form', async () => {
    render(
      <ThemeContext.Provider value={{getIsMobile: () => false}}>
        <ShopEmployeeAdd 
          step={0} 
          setStep={mockSetStep}
          formData={mockedShop} 
          setFormData={() => {}} 
        />
      </ThemeContext.Provider>
    )

    expect(screen.getByText(/Zaproś nowego pracownika/)).toBeInTheDocument();

    const email =  screen.getByLabelText(/Email pracownika/)
    const jobTitle =  screen.getByLabelText(/Stanowisko/)
    const inviteButton = screen.getAllByRole('button')[1]

    expect(email).toBeInTheDocument();
    expect(jobTitle).toBeInTheDocument();
    expect(inviteButton).toBeInTheDocument();
  });
});