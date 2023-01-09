import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ShopCard from '../../components/ShopCard'
import { mockedParams, mockedShop } from '../__mocks__/mockedShop';

describe('ShopCard', () => {
  it('render mocked shop card for test 1', () => {
    render(
      <MemoryRouter>
        <ShopCard shop={mockedShop} params={mockedParams} />
      </MemoryRouter>
    )

    expect(screen.getByText(/name: test 1/)).toBeInTheDocument();
    expect(screen.getByText(/streetName: test 1/)).toBeInTheDocument();
    expect(screen.getByText(/streetNumber test 1/)).toBeInTheDocument();
    expect(screen.queryByText(/streetNumber test 23/)).toBeNull();
  });
});