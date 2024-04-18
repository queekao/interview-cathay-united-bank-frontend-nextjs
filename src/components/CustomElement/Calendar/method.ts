// Common function for this directory
import type { Dayjs } from 'dayjs'

type TCalendarMap = Map<string, ICalendarCell>
type TCalendarKeys = Array<string>

function generateCell(
  date: Dayjs,
  dayNumber: number,
  isCurMonth?: boolean
): ICalendarCell {
  return {
    text: String(dayNumber),
    value: date.clone().set('date', dayNumber),
    isCurMonth: isCurMonth || false
  }
}
/**
 * Generates an array of calendar cells and keys for a given month.
 * Each row represents one week, with an array of ICalendarCell objects representing days.
 *
 * @param {Dayjs} date - The date object representing the month to generate.
 * @return {{ TCalendarMap, TCalendarKeys }} A map contain all date information and a group of date keys for reference
 */
export function getCalendarCellsAndKeys(date: Dayjs): {
  calendarCells: TCalendarMap
  calendarKeys: TCalendarKeys
} {
  const daysArray = new Array(date.daysInMonth()).fill(1)
  // Utilize Key-vale pair instead of nested array
  const calendarCells: TCalendarMap = new Map()
  const calendarKeys: TCalendarKeys = []

  const cellsToAdd = 35 - daysArray.length
  const lastMonth = date.subtract(1, 'month')
  const daysInLastMonth = lastMonth.daysInMonth()
  // Calculate the start day for iteration
  const startDay = daysInLastMonth - Math.floor(cellsToAdd / 2) + 1

  for (let i = startDay; i <= daysInLastMonth; i++) {
    const key = lastMonth.set('date', i).format('YYYY-MM-D')
    calendarCells.set(key, generateCell(lastMonth, i))
    calendarKeys.push(lastMonth.set('date', i).format('YYYY-MM-D'))
  }
  // need to mark the current month `isCurMonth = true`
  daysArray.forEach((_, i) => {
    const key = date.set('date', i + 1).format('YYYY-MM-D')
    calendarCells.set(key, generateCell(date, i + 1, true))
    calendarKeys.push(date.set('date', i + 1).format('YYYY-MM-D'))
  })

  const nextMonth = date.add(1, 'month')
  for (let i = 0; i < Math.round(cellsToAdd / 2); i++) {
    const key = nextMonth.set('date', i + 1).format('YYYY-MM-D')
    calendarCells.set(key, generateCell(nextMonth, i + 1))
    calendarKeys.push(nextMonth.set('date', i + 1).format('YYYY-MM-D'))
  }

  return { calendarCells, calendarKeys }
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
      currentDate = currentDate.add(1, 'day') // add until reach the end of the loop
    }
  }
  return datesInRange
}
