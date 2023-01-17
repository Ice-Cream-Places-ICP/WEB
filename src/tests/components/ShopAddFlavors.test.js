import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { mockedShop } from '../__mocks__/mockedShop';
import ShopAddFlavors from '../../components/ShopAddFlavors'

describe('ShopAddFlavors', () => {
  const mockSetStep = jest.fn()

  it('render mocked shop add flavors form', async () => {
    render(
      <ShopAddFlavors 
        step={0} 
        setStep={mockSetStep}
        formData={mockedShop} 
        setFormData={() => {}} 
        editEmployee={false}
      />
    )

    expect(screen.getByText(/Smaki/)).toBeInTheDocument();
    expect(screen.getByText(/1/)).toBeInTheDocument();
  });
});