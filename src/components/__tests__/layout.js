import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'
// import axiosMock from 'axios'
import Layout from '../layout'

test('loads and displays greeting', async () => {
  const url = '/greeting'
  const { getByText, getByRole, asFragment } = render(<Layout />)

//   axiosMock.get.mockResolvedValueOnce({
//     data: { greeting: 'hello there' },
//   })

//   fireEvent.click(getByText('Load Greeting'))

//   const greetingTextNode = await waitForElement(() => getByRole('heading'))

//   expect(axiosMock.get).toHaveBeenCalledTimes(1)
//   expect(axiosMock.get).toHaveBeenCalledWith(url)
//   expect(getByRole('heading')).toHaveTextContent('hello there')
//   expect(getByRole('button')).toHaveAttribute('disabled')
  expect(asFragment()).toMatchSnapshot()
})