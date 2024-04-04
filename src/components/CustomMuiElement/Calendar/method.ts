// Common function for this directory
import type { Dayjs } from 'dayjs'

interface ICalendarCell {
  key: string
  text: string
  value: Dayjs
  isCurMonth: boolean
}
function generateCell(
  date: Dayjs,
  dayNumber: number,
  isCurMonth?: boolean
): ICalendarCell {
  const key = date.clone().set('date', dayNumber).format('YYYY-MM-DD')
  return {
    key,
    text: String(dayNumber),
    value: date.clone().set('date', dayNumber),
    isCurMonth: isCurMonth || false
  }
}
function getCalendarCells(date: Dayjs): ICalendarCell[] {
  const daysArray = new Array(date.daysInMonth()).fill(1)
  const calendarCells: ICalendarCell[] = []

  // need to mark the current month
  daysArray.forEach((_, i) => {
    calendarCells.push(generateCell(date, i + 1, true))
  })

  const cellsToAdd = 35 - daysArray.length

  const lastMonth = date.subtract(1, 'month')
  for (let i = 0; i < Math.floor(cellsToAdd / 2); i++) {
    calendarCells.unshift(generateCell(lastMonth, lastMonth.daysInMonth() - i))
  }
  const nextMonth = date.add(1, 'month')
  for (let i = 0; i < Math.round(cellsToAdd / 2); i++) {
    calendarCells.push(generateCell(nextMonth, i + 1))
  }

  return calendarCells
}
/**
 * Generates an array of calendar rows for a given month.
 * Each row represents one week, with an array of ICalendarCell objects representing days.
 *
 * @param {Dayjs} date - The date object representing the month to generate.
 * @return {Array<ICalendarCell[]>} An array of weeks, each week is an array of days.
 */
export function getCalendarRows(date: Dayjs): Array<ICalendarCell[]> {
  const cells = getCalendarCells(date)
  const rows: Array<ICalendarCell[]> = []
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7))
  }

  return rows
}
/**
 * Generates a map of date strings representing the range of dates between
 * the provided previous and next dates, inclusive.
 *
 * @param {Dayjs} selectedPrevDate - The starting date of the range.
 * @param {Dayjs} selectedNextDate - The ending date of the range.
 * @returns {Map<string, string>} A map where each key is a string representation of a date
 */

export function getDatesInRange(
  selectedPrevDate?: Dayjs,
  selectedNextDate?: Dayjs
): Map<string, string> {
  const datesInRange = new Map()
  if (selectedPrevDate && selectedNextDate) {
    let currentDate = selectedPrevDate
    const endDate = selectedNextDate

    while (
      currentDate.isBefore(endDate) ||
      currentDate.isSame(endDate, 'day')
    ) {
      datesInRange.set(currentDate.toString(), currentDate.toString()) // push the comparing value
      currentDate = currentDate.add(1, 'day')
    }
  }
  return datesInRange
}
