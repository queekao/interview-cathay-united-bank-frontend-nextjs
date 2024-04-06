import TestPage, { mockUsers, User } from '@/pages/test/[id]'
import { render, screen } from '@testing-library/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { act } from 'react-dom/test-utils'
import Calendar from '@/components/CustomElement/Calendar'
dayjs().locale('zh-cn')
const currentYearAndMonth = dayjs().format('YYYY年MM月')

// Mock the dynamic import Calendar component
jest.mock('next/dynamic', () => () => Calendar)

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

const router = useRouter as jest.Mock

describe('Test Page ', () => {
  it('test in /test/1 route', async () => {
    router.mockImplementation(() => ({
      query: { id: '1' },
      pathname: '/test/1'
    }))
    await act(async () => {
      render(<TestPage />)
    })
    expect(screen.getByTestId('back to home page icon'))
    expect(screen.getByText('Test 1.1'))
    mockUsers.forEach((user: User) => {
      expect(
        screen.getByText(
          new RegExp(
            `${user.firstName} ${user?.lastName ? user.lastName : ''}.*${
              user.customerID
            }`
          )
        )
      )
    })

    expect(screen.getByText('Test 1.2'))
    mockUsers.forEach(user => {
      expect(screen.getByText(user.firstName))
    })

    expect(screen.getByText('test 2'))
    expect(screen.getByTestId('container'))
    expect(screen.getByText('5/8 外出確認表'))
    const listItems = screen.getAllByRole('listitem')
    listItems.forEach(listItem => {
      expect(listItem)
    })
    expect(screen.getByText('以上僅共參考'))
    expect(screen.getByText('test 3'))
    expect(screen.getByText('Unique Value:96'))
  })
  it('test in /test/2 route', async () => {
    router.mockImplementation(() => ({
      query: { id: '2' },
      pathname: '/test/2'
    }))
    await act(async () => {
      render(<TestPage />)
    })
    expect(screen.getByTestId('back to home page icon'))
    expect(screen.getByText(currentYearAndMonth))
  })
  it('test in /test/3 route', async () => {
    router.mockImplementation(() => ({
      query: { id: '3' },
      pathname: '/test/3'
    }))
    await act(async () => {
      render(<TestPage />)
    })
    expect(screen.getByTestId('back to home page icon'))
    expect(screen.getByText(currentYearAndMonth))
  })
})
