import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CalendarSelectorBtn from '@/components/CustomElement/Calendar/DateElements/CalendarSelectorBtn'
describe('CalendarSelectorBtn', () => {
  const mockChangeDateMonth = jest.fn()
  it('renders first type of button', () => {
    render(
      <CalendarSelectorBtn
        isRight={false}
        changeDateMonth={mockChangeDateMonth}
        disabled={false}
      />
    )
    expect(screen.getByTestId('ChevronLeftIcon')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button'))
    expect(mockChangeDateMonth).toHaveBeenCalledTimes(1)
  })
  it('renders second type of button', () => {
    render(
      <CalendarSelectorBtn
        isRight={true}
        changeDateMonth={mockChangeDateMonth}
        disabled={true}
      />
    )
    expect(screen.getByTestId('ChevronRightIcon')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
