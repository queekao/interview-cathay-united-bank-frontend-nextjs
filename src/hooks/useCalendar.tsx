import { useContext } from 'react'
import {
  ICalendarContextType,
  CalendarContext
} from '@/providers/CalendarProvider'
/**
 * Context for providing and managing state and operations related to a calendar component.
 *
 * @returns {ICalendarContextType} The calendar object with current state and utility functions.
 * @property {ICalendar} calendar - The calendar state including current day, selected previous date, and selected next date.
 * @param {Dayjs} calendar.currentDay - The current day which you can define from provider.
 * @param {Dayjs} calendar.selectedPrevDate - An optional previously selected date.
 * @param {Dayjs} calendar.selectedNextDate - An optional next selected date.
 * @property {function(Dayjs):void} selectedDateHandler - A function to handle the selection of a date. Receives a date you want to select.
 * @property {function(boolean):void} changeDateMonth - A function to change the current month being viewed. Accepts a boolean where `true` moves to the next month and `false` moves to the previous month.
 * @property {function():Array<ICalendarCell[]>} getCalendarRows - “A function that returns the calendar rows as an array of cells.
 *
 * @example
 * const { calendar, selectedDateHandler, changeDateMonth } = useCalendar();
 *
 */
function useCalendar(): ICalendarContextType {
  const context = useContext<ICalendarContextType>(CalendarContext)
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider')
  }
  return context
}

export default useCalendar
