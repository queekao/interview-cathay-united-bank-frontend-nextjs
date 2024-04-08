import React from 'react'
import { render, screen } from '@testing-library/react'
import CalendarSelector from '@/components/CustomElement/Calendar/DateElements/CalendarSelector'
import { CalendarProvider } from '@/providers'
import dayjs from 'dayjs'
const currentYearAndMonth = dayjs().format('YYYY年MM月')
describe('CalendarSelector', () => {
  it('renders first type of selector', () => {
    render(
      <CalendarProvider currentDay={dayjs()}>
        <CalendarSelector isMonthNavigator={true} />
      </CalendarProvider>
    )
    expect(screen.getByText(currentYearAndMonth)).toBeInTheDocument()
    expect(screen.getByTestId('navigator')).toBeInTheDocument()
  })
  it('renders second type of selector', () => {
    render(
      <CalendarProvider currentDay={dayjs()}>
        <CalendarSelector isMonthNavigator={false} />
      </CalendarProvider>
    )
    expect(screen.getByText(currentYearAndMonth)).toBeInTheDocument()
    expect(screen.getByTestId('ChevronRightIcon')).toBeInTheDocument()
    expect(screen.getByTestId('no-navigator')).toBeInTheDocument()
  })
})
