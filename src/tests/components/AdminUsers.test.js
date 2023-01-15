import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import AdminUsers from '../../components/AdminUsers'
import axios from "axios";
import { act } from 'react-dom/test-utils';

jest.mock("axios");

const getMockedResponse = (status = false, data = []) => ({
  status,
  data
})

describe('AdminUsers', () => {
  it('render AdminsUsers component', async () => {
    await act(async () => {
      axios.get.mockResolvedValueOnce(getMockedResponse());
      await render(<AdminUsers />)
    })

    expect(screen.getByText(/Użytkownicy/)).toBeInTheDocument();
    expect(screen.getByText(/Błąd tokena autoryzacji/)).toBeInTheDocument();
  });
  
  // TODO
  // expect(screen.getByText(/name: test 1/)).toBeInTheDocument();
  // it('render AdminUsers component with mockedShop: test 1', async () => {
  //   await act(async () => {
  //     axios.get.mockResolvedValueOnce(getMockedResponse(true, [mockedShop]));
  //     await render(<AdminUsers />)
  //   })

  //   const searchButton = screen.getByLabelText(/Szukaj/)
  //   expect(searchButton).toBeInTheDocument();

  //   await act(async () => {
  //     await userEvent.type(searchButton, '1')
  //   })

  // }); 
});