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

});