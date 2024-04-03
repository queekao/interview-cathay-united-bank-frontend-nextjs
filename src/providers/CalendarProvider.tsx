// Should Store the user data during the process
import { createContext, useState } from 'react'
import type { Dayjs } from 'dayjs'
/**
 * Provides a calendar context to manage and interact with calendar data within the application.
 * It allows selection of dates and changing the current month view.
 *
 * @component
 * @param {Object} props.currentDay - The current day you pass in.
 * @param {ReactNode} props.children - The child components that will have access to the calendar context.
 *
 * @example
 * ```jsx
 * <CalendarProvider currentDay={dayjs()}>
 *   <Calendar />
 * </CalendarProvider>
 * ```
 */
interface ICalendar {
  currentDay: Dayjs
  selectedPrevDate?: Dayjs
  selectedNextDate?: Dayjs
}
interface ICalendarCell {
  text: string
  value: Dayjs
}
export interface ICalendarContextType {
  calendar: ICalendar
  selectedDateHandler: (date: Dayjs) => void
  changeDateMonth: (isNextMonth: boolean) => void
  getCalendarRows: () => Array<ICalendarCell[]>
}

type CalendarProviderProps = {
  currentDay: Dayjs
}

export const CalendarContext = createContext<ICalendarContextType>(
  null as unknown as ICalendarContextType
)

export const CalendarProvider: React.FC<
  CalendarProviderProps & ChildrenProps
> = ({ currentDay, children }) => {
  const [calendar, setCalendar] = useState<ICalendar>({
    currentDay,
    selectedPrevDate: undefined,
    selectedNextDate: undefined
  })
  const selectedDateHandler = (date: Dayjs) => {
    setCalendar(prevCalendar => {
      if (
        !prevCalendar.selectedPrevDate ||
        date.isAfter(prevCalendar.selectedPrevDate)
      ) {
        // If there is no previous date or the selected date is after the previous date,
        return {
          ...prevCalendar,
          selectedNextDate: date
        }
      } else {
        // If the selected date is before the previous date,
        return {
          ...prevCalendar,
          selectedPrevDate: date,
          selectedNextDate: undefined
        }
      }
    })
  }
  function changeDateMonth(isNextMonth: boolean): void {
    const newCurrentDay = (() => {
      if (calendar.currentDay.month() === 0 && !isNextMonth) {
        return calendar.currentDay
          .set('year', calendar.currentDay.year() - 1)
          .set('month', 11)
      } else if (calendar.currentDay.month() === 11 && isNextMonth) {
        return calendar.currentDay
          .set('year', calendar.currentDay.year() + 1)
          .set('month', 0)
      }
      return calendar.currentDay.add(isNextMonth ? 1 : -1, 'month')
    })()

    setCalendar({ ...calendar, currentDay: newCurrentDay })
  }
  function getCalendarCells(): ICalendarCell[] {
    const daysArray = new Array(calendar.currentDay.daysInMonth()).fill(1)
    const calendarCells: ICalendarCell[] = []

    const prepareCell = (
      date: Dayjs = calendar.currentDay,
      dayNumber: number
    ) => {
      return {
        text: String(dayNumber),
        value: date.clone().set('date', dayNumber)
      }
    }
    daysArray.forEach((_, i) => {
      calendarCells.push(prepareCell(undefined, i + 1))
    })

    const cellsToAdd = 35 - daysArray.length

    const lastMonth = calendar.currentDay.subtract(1, 'month')
    for (let i = 0; i < Math.floor(cellsToAdd / 2); i++) {
      calendarCells.unshift(prepareCell(lastMonth, lastMonth.daysInMonth() - i))
    }

    const nextMonth = calendar.currentDay.add(1, 'month')
    for (let i = 0; i < Math.round(cellsToAdd / 2); i++) {
      calendarCells.push(prepareCell(nextMonth, i + 1))
    }

    return calendarCells
  }

  function getCalendarRows(): Array<ICalendarCell[]> {
    const cells = getCalendarCells()
    const rows: Array<ICalendarCell[]> = []

    for (let i = 0; i < cells.length; i += 7) {
      rows.push(cells.slice(i, i + 7))
    }

    return rows
  }

  return (
    <CalendarContext.Provider
      value={{
        calendar,
        selectedDateHandler,
        changeDateMonth,
        getCalendarRows
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}
