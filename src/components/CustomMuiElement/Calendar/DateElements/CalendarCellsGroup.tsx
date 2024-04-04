import React from 'react'
import type { Dayjs } from 'dayjs'
import { useCalendar } from '@/hooks'
import clsx from 'clsx'
import { SxProps } from '@mui/system'
import { Box } from '@mui/material'
import { useTheme, Theme } from '@mui/material/styles'
import { getCalendarRows, getDatesInRange } from '../method'

const CalendarCellsGroupSx = (theme: Theme): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'column',

  '& .cell': {
    ...theme.flexCenter,
    '&__day': {
      ...theme.flexCenter,
      width: '5rem',
      height: '3.6rem',
      background: theme.palette.common?.white,
      transition: 'background 0.2s, color 0.4s',
      cursor: 'pointer',
      '&_selected': {
        background: `${theme.palette.calendar?.active} !important`,
        color: theme.palette.common?.white
      },
      '&_hover': {
        '&:hover': {
          background: theme.palette.calendar?.hover
        },
        '&:active': {
          background: theme.palette.calendar?.active
        }
      },
      '&_today': {
        background: theme.palette.calendar?.today
      },
      '&_disabled': {
        color: theme.palette.calendar?.nonCurrentMonth,
        cursor: 'not-allowed !important'
      }
    }
  }
})
const CalendarCellsGroup: React.FC<ICalendarProps> = ({
  isForbiddenNonCurrentMonth
}) => {
  const theme = useTheme()
  const [selectedNextDate, setSelectedNextDate] = useCalendar(
    calendar => calendar['selectedNextDate']
  )
  const [selectedPrevDate, setSelectedPrevDate] = useCalendar(
    calendar => calendar['selectedPrevDate']
  )
  const [currentDay] = useCalendar(calendar => calendar['currentDay'])
  const rows = getCalendarRows(currentDay)
  const datesInRange = getDatesInRange(selectedPrevDate, selectedNextDate)
  console.log('re-render')
  const selectedDateHandler = (date: Dayjs): void => {
    if (!selectedPrevDate || date.isBefore(selectedPrevDate))
      setSelectedPrevDate({ selectedPrevDate: date })
    else setSelectedNextDate({ selectedNextDate: date })
  }

  return (
    <Box sx={CalendarCellsGroupSx(theme)}>
      {rows.map((cells, rowIndex) => {
        return (
          <div key={rowIndex} className="cell">
            {cells.map(({ text, value, key, isCurMonth }) => {
              return (
                <div
                  key={key}
                  className={clsx('cell__day', {
                    cell__day_selected:
                      value.toString() === selectedNextDate?.toString() ||
                      false ||
                      value.toString() === selectedPrevDate?.toString() ||
                      false ||
                      datesInRange.get(value.toString()) ||
                      false,
                    cell__day_today: value.toString() === currentDay.toString(),
                    cell__day_hover: isCurMonth || !isForbiddenNonCurrentMonth,
                    cell__day_disabled:
                      isForbiddenNonCurrentMonth && !isCurMonth
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
            })}
          </div>
        )
      })}
    </Box>
  )
}
export default React.memo(CalendarCellsGroup)
