import React from 'react'
import { render, screen } from '@testing-library/react'
import Calendar from '@/components/CustomElement/Calendar'
import { CalendarProvider } from '@/providers'
import dayjs from 'dayjs'
describe('Calendar', () => {
  it('renders first type of calendar', () => {
    render(
      <CalendarProvider currentDay={dayjs()}>
        <Calendar isMonthNavigator={false} isForbiddenNonCurrentMonth={true} />
      </CalendarProvider>
    )
    expect(screen.getByTestId('no-navigator')).toBeInTheDocument()
    expect(screen.getByTestId('forbidden-current-month')).toBeInTheDocument()
  })
  it('renders second type of calendar', () => {
    render(
      <CalendarProvider currentDay={dayjs()}>
        <Calendar isMonthNavigator={true} isForbiddenNonCurrentMonth={false} />
      </CalendarProvider>
    )
    expect(screen.getByTestId('navigator')).toBeInTheDocument()
    expect(screen.getByTestId('no-forbidden-current-month')).toBeInTheDocument()
  })
})
