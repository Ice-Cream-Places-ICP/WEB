import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import AdminShops from '../../components/AdminShops'
import { mockedShop } from '../__mocks__/mockedShop'
import axios from "axios";
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event'

jest.mock("axios");

const getMockedResponse = (status = false, data = []) => ({
  status,
  data
})

describe('AdminShops', () => {
  it('render AdminsShops component', async () => {
    await act(async () => {
      axios.get.mockResolvedValueOnce(getMockedResponse());
      await render(<AdminShops />)
    })

    expect(screen.getByText(/Lodziarnie/)).toBeInTheDocument();
  });

  it('render AdminShops component with mockedShop: test 1', async () => {
    await act(async () => {
      axios.get.mockResolvedValueOnce(getMockedResponse(true, [mockedShop]));
      await render(<AdminShops />)
    })

    const searchButton = screen.getByLabelText(/Szukaj/)
    expect(searchButton).toBeInTheDocument();

    await act(async () => {
      await userEvent.type(searchButton, '1')
    })

    // TODO
    // expect(screen.getByText(/name: test 1/)).toBeInTheDocument();
  }); 
});