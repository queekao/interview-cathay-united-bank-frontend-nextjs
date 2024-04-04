import React from 'react'
import { useCalendar } from '@/hooks'
import clsx from 'clsx'
import { SxProps } from '@mui/system'
import { Box } from '@mui/material'
import { useTheme, Theme } from '@mui/material/styles'

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
export const CalendarCellsGroup: React.FC<ICalendarProps> = ({
  isForbiddenNonCurrentMonth
}) => {
  const theme = useTheme()
  const { calendar, getCalendarRows, selectedDateHandler } = useCalendar()
  const rows = getCalendarRows()
  console.log(calendar)

  return (
    <Box sx={CalendarCellsGroupSx(theme)}>
      {rows.map((cells, rowIndex) => {
        return (
          <div key={rowIndex} className="cell">
            {cells.map(({ text, value, key, isThisMonth }) => {
              return (
                <div
                  key={key}
                  className={clsx('cell__day', {
                    cell__day_selected:
                      value.toString() ===
                        calendar?.selectedNextDate?.toString() ||
                      false ||
                      value.toString() ===
                        calendar?.selectedPrevDate?.toString() ||
                      false,
                    cell__day_today:
                      value.toString() === calendar.currentDay.toString(),
                    cell__day_hover: isThisMonth || !isForbiddenNonCurrentMonth,
                    cell__day_disabled:
                      isForbiddenNonCurrentMonth && !isThisMonth
                  })}
                  onClick={
                    isThisMonth
                      ? () => selectedDateHandler(value)
                      : !isThisMonth && !isForbiddenNonCurrentMonth //If we are not forbidden the month days
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
