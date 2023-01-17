import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import { mockedShop } from '../__mocks__/mockedShop';
import ShopAddName from '../../components/ShopAddName'
import userEvent from '@testing-library/user-event';

describe('ShopAddName', () => {
  const mockSetStep = jest.fn()

  it('render mocked shop add addredss form', async () => {
    render(
      <ShopAddName 
        step={0} 
        setStep={mockSetStep}
        formData={mockedShop} 
        setFormData={() => {}} 
      />
    )

    expect(screen.getByText(/Nazwa lodziarni/)).toBeInTheDocument();  
    const nextButton = screen.getByText('Dalej') 
    expect(nextButton).toBeInTheDocument();
    
    await act(async () => {
      await userEvent.click(nextButton);
    })

    expect(mockSetStep).toBeCalled()
    expect(mockSetStep).toBeCalledWith(1)
  });
});