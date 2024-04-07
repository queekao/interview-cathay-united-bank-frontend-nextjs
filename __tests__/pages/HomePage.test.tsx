import HomePage from '@/pages'
import { render, fireEvent, waitFor } from '@testing-library/react'
import React, { ReactElement } from 'react'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

jest.mock(
  'next/link',
  () =>
    ({ children, ...rest }: { children: ReactElement }) =>
      React.cloneElement(children, { ...rest })
)
describe('Home Page ', () => {
  it('test navigator test 1', async () => {
    const { getByText } = render(<HomePage />)
    const link = getByText('Test 1')
    fireEvent.click(link)
    await waitFor(() => {
      expect(link.closest('div')).toHaveAttribute('href', '/test/1')
    })
  })
  it('test navigator test 2', async () => {
    const { getByText } = render(<HomePage />)
    const link = getByText('Test 2')
    fireEvent.click(link)
    await waitFor(() => {
      expect(link.closest('div')).toHaveAttribute('href', '/test/2')
    })
  })
  it('test navigator test 3', async () => {
    const { getByText } = render(<HomePage />)
    const link = getByText('Test 3')
    fireEvent.click(link)
    await waitFor(() => {
      expect(link.closest('div')).toHaveAttribute('href', '/test/3')
    })
  })
})
