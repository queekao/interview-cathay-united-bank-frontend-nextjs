// Common function for this directory
import type { Dayjs } from 'dayjs'

interface ICalendarCell {
  key: string
  text: string
  value: Dayjs
  isCurMonth: boolean
  isInRange: boolean
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
    isCurMonth: isCurMonth || false,
    isInRange: false
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
// To acquire all the rows
export function getCalendarRows(date: Dayjs): Array<ICalendarCell[]> {
  const cells = getCalendarCells(date)
  const rows: Array<ICalendarCell[]> = []

  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7))
  }

  return rows
}
export function getDatesInRange(
  selectedPrevDate: Dayjs,
  selectedNextDate: Dayjs
): Dayjs[] {
  let currentDate = selectedPrevDate.startOf('day')
  const endDate = selectedNextDate.startOf('day')

  const datesInRange = []

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
    datesInRange.push(currentDate)
    currentDate = currentDate.add(1, 'day')
  }

  return datesInRange
}
