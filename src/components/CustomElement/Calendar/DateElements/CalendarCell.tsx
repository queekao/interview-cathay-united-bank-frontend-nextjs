import React from 'react'
import { useCalendar } from '@/hooks'
import { getDatesInRange } from '../method'
import { Dayjs } from 'dayjs'
import clsx from 'clsx'

interface CalendarCellProp {
  calendarCell: ICalendarCell
  isForbiddenNonCurrentMonth: ICalendarProps['isForbiddenNonCurrentMonth']
}
const CalendarCell: React.FC<CalendarCellProp> = ({
  calendarCell,
  isForbiddenNonCurrentMonth
}) => {
  const [selectedNextDate, setSelectedNextDate, cloneCurDay] = useCalendar(
    calendar => calendar['selectedNextDate']
  )
  const [selectedPrevDate, setSelectedPrevDate] = useCalendar(
    calendar => calendar['selectedPrevDate']
  )
  // console.log('re-render cell')

  const datesInRange = getDatesInRange(selectedPrevDate, selectedNextDate)
  const selectedDateHandler = (date: Dayjs): void => {
    if (!selectedPrevDate || date.isBefore(selectedPrevDate)) {
      setSelectedPrevDate({ selectedPrevDate: date })
    } else if (!selectedNextDate) {
      setSelectedNextDate({ selectedNextDate: date })
    } else {
      // If both dates are set, determine which date the current date is closer to
      const isCloserToPrev =
        date.diff(selectedPrevDate, 'day') < selectedNextDate.diff(date, 'day')

      if (isCloserToPrev) {
        setSelectedPrevDate({ selectedPrevDate: date })
      } else {
        setSelectedNextDate({ selectedNextDate: date })
      }
    }
  }
  const { text, value, isCurMonth } = calendarCell
  return (
    <div
      data-date-key={value.format('YYYY-MM-D')}
      className={clsx('cell__day', {
        cell__day_selected:
          value.toString() === selectedNextDate?.toString() ||
          false ||
          value.toString() === selectedPrevDate?.toString() ||
          false ||
          datesInRange.get(value.toString()) ||
          false,
        cell__day_today: value.toString() === cloneCurDay.toString(),
        cell__day_hover: isCurMonth || !isForbiddenNonCurrentMonth,
        cell__day_disabled: isForbiddenNonCurrentMonth && !isCurMonth
      })}
      onClick={
        isCurMonth
          ? () => selectedDateHandler(value)
          : !isCurMonth && !isForbiddenNonCurrentMonth //If we are not forbidden the month days
            ? () => selectedDateHandler(value)
            : () => {}
      }
    >
      {`${text}日`}
    </div>
  )
}
export default React.memo(CalendarCell)
