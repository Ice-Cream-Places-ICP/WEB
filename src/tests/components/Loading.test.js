import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Loading from '../../components/Loading'
import { MemoryRouter } from 'react-router-dom';

describe('Loading', () => {
  it('render Loading component | state: loading', async () => {
    render(
      <MemoryRouter>
        <Loading />
      </MemoryRouter>
    )

    expect(screen.getByTestId(/color-ring-svg/)).toBeInTheDocument();
  });

});