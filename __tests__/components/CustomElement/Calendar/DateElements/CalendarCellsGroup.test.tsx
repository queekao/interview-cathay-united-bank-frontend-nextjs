import React from 'react'
import { render, screen } from '@testing-library/react'
import CalendarCellsGroup from '@/components/CustomElement/Calendar/DateElements/CalendarCellsGroup'
import { CalendarProvider } from '@/providers'
import dayjs from 'dayjs'

describe('CalendarCellsGroup', () => {
  it('renders first type of Cells Group', () => {
    render(
      <CalendarProvider currentDay={dayjs()}>
        <CalendarCellsGroup isForbiddenNonCurrentMonth={false} />
      </CalendarProvider>
    )
    expect(screen.getByTestId('no-forbidden-current-month')).toBeInTheDocument()
  })
  it('renders second type of Cells Group', () => {
    render(
      <CalendarProvider currentDay={dayjs()}>
        <CalendarCellsGroup isForbiddenNonCurrentMonth={true} />
      </CalendarProvider>
    )
    expect(screen.getByTestId('forbidden-current-month')).toBeInTheDocument()
  })
})
