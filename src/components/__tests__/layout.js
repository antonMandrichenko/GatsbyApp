import React from 'react'
import {cleanup, fireEvent, render} from '@testing-library/react';
import Layout from '../layout'

afterEach(cleanup);


test('loads and displays greeting', async () => {
  const url = '/greeting'
  const { getByText, getByRole, asFragment } = render(<Layout />)

  expect(getByText(/Tickets/i)).toBeTruthy();

  expect(asFragment()).toMatchSnapshot()
})