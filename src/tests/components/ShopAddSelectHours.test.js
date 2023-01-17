import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { mockedShop } from '../__mocks__/mockedShop';
import ShopAddSelectHours from '../../components/ShopAddSelectHours'

describe('ShopAddSelectHours', () => {
  it('render mocked shop add addredss form', async () => {
    render(
      <ShopAddSelectHours 
        dayName={"Poniedziałek"}
        dayNumber={0}
        addDaysData={jest.fn()}
        removeDaysData={jest.fn()}
        updateDaysData={jest.fn()}
        getValue={jest.fn()}
        menuItems={[]}
        formData={mockedShop} 
      />
    )

    expect(screen.getByText(/Poniedziałek/)).toBeInTheDocument()
  });
});