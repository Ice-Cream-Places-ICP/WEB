import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import { mockedShop } from '../__mocks__/mockedShop';
import ShopAddAddress from '../../components/ShopAddAddress'
import userEvent from '@testing-library/user-event';

describe('ShopAddAddress', () => {
  const mockSetStep = jest.fn()

  it('render mocked shop add addredss form', async () => {
    render(
      <ShopAddAddress 
        step={0} 
        setStep={mockSetStep}
        formData={mockedShop} 
        setFormData={() => {}} 
      />
    )

    expect(screen.getByText(/Adres lodziarni/)).toBeInTheDocument();

    const country =  screen.getByLabelText(/Państwo/)
    const city =  screen.getByLabelText(/Miasto/)
    const postCode =  screen.getByLabelText(/Kod pocztowy/)
    const streetName =  screen.getByLabelText(/Ulica/)
    const streetNumber =  screen.getByLabelText(/Numer domu/)
    const nextButton = screen.getByText('Dalej') 

    expect(country).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    expect(postCode).toBeInTheDocument();
    expect(streetName).toBeInTheDocument();
    expect(streetNumber).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    
    await act(async () => {
      await userEvent.type(country, 'country test 1')
      await userEvent.type(city, 'city test 1')
      await userEvent.type(postCode, 'postCode test 1')
      await userEvent.type(streetName, 'streetName test 1')
      await userEvent.type(streetNumber, 'streetNumber test 1')
      await userEvent.click(nextButton);
    })

    expect(mockSetStep).toBeCalled()
    expect(mockSetStep).toBeCalledWith(1)
  });
});