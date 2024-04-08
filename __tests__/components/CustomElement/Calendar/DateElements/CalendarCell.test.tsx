import React from 'react'
import { render } from '@testing-library/react'
import CalendarCell from '@/components/CustomElement/Calendar/DateElements/CalendarCell'
import { CalendarProvider } from '@/providers'
import dayjs from 'dayjs'
const mockDateKey = dayjs().format('YYYY-MM-D')
const mockPrevMonthDateKey = dayjs()
  .subtract(1, 'month')
  .date(31)
  .format('YYYY-MM-D')

const mockCellDataCurMonth = { text: '1', value: dayjs(), isCurMonth: true }
const mockCellDataNotCurMonth = {
  text: '31',
  value: dayjs().subtract(1, 'month').date(31),
  isCurMonth: false
}
describe('CalendarCell', () => {
  it('renders first type of Cells Group', () => {
    render(
      <CalendarProvider currentDay={dayjs()}>
        <CalendarCell
          calendarCell={mockCellDataNotCurMonth}
          isForbiddenNonCurrentMonth={true}
        />
      </CalendarProvider>
    )
    const element = document.querySelector('.cell__day_disabled')
    expect(element).toHaveAttribute('data-date-key', mockPrevMonthDateKey)
  })
  it('renders second type of Cells Group', () => {
    render(
      <CalendarProvider currentDay={dayjs()}>
        <CalendarCell
          calendarCell={mockCellDataCurMonth}
          isForbiddenNonCurrentMonth={false}
        />
      </CalendarProvider>
    )
    const element = document.querySelector('.cell__day_today')
    expect(element).toHaveAttribute('data-date-key', mockDateKey)
  })
})
