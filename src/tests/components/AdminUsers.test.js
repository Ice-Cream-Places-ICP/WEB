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
  
});