import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import { mockedShop } from '../__mocks__/mockedShop';
import ShopAddOpeningHours from '../../components/ShopAddOpeningHours'
import userEvent from '@testing-library/user-event';

describe('ShopAddOpeningHours', () => {
  const mockSetStep = jest.fn()

  it('render mocked shop add addredss form', async () => {
    render(
      <ShopAddOpeningHours 
        step={0} 
        setStep={mockSetStep}
        formData={mockedShop} 
        setFormData={() => {}} 
        styleTime={() => jest.fn}
      />
    )

    screen.debug()

    expect(screen.getByText(/Godziny otwarcia/)).toBeInTheDocument();

    expect(screen.getByText(/Poniedziałek/)).toBeInTheDocument()
    expect(screen.getByText(/Wtorek/)).toBeInTheDocument()
    expect(screen.getByText(/Środa/)).toBeInTheDocument()
    expect(screen.getByText(/Czwartek/)).toBeInTheDocument()
    expect(screen.getByText(/Piątek/)).toBeInTheDocument()
    expect(screen.getByText(/Sobota/)).toBeInTheDocument()
    expect(screen.getByText(/Niedziela/)).toBeInTheDocument()

    const nextButton = screen.getByText('Dalej') 
    expect(nextButton).toBeInTheDocument();
    
    await act(async () => {
      await userEvent.click(nextButton);
    })

    expect(mockSetStep).toBeCalled()
    expect(mockSetStep).toBeCalledWith(1)
  });
});