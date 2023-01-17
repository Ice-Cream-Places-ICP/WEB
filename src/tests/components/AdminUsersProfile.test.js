import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import AdminUserProfile from '../../components/AdminUsersProfile'
import axios from "axios";
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

jest.mock("axios");

const getMockedResponse = (status = false, data = []) => ({
  status,
  data
})

describe('AdminUserProfile', () => {
  it('render AdminsUserProfile component | state: loading', async () => {
    await act(async () => {
      await render(
        <MemoryRouter>
          <AdminUserProfile />
        </MemoryRouter>
        )
    })

    expect(screen.getByTestId(/color-ring-svg/)).toBeInTheDocument();
  });

  // TODO fix this test: useParams got {} instead of { id: 1 }
  // it('render AdminsUserProfile component on route users/1 ', async () => {
  //   await act(async () => {
  //     const mockedUser = {
  //       name: 'test'
  //     }
  //     axios.get.mockResolvedValueOnce(getMockedResponse(mockedUser));
  //     await render(
  //       <MemoryRouter initialEntries={["/users/1"]}>
  //         <AdminUserProfile />
  //       </MemoryRouter>
  //       )
  //   })
  // });
});