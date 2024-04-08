import React from 'react'
import { useCalendar } from '@/hooks'
import { SxProps } from '@mui/system'
import { Box } from '@mui/material'
import { useTheme, Theme } from '@mui/material/styles'
import { getCalendarCellsAndKeys } from '../method'
import CalendarCell from './CalendarCell'

const CalendarCellsGroupSx = (theme: Theme): SxProps<Theme> => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',

  '& .cell': {
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
  // console.log('re-render group')

  const [currentDay] = useCalendar(calendar => calendar['currentDay'])
  const { calendarCells, calendarKeys } = getCalendarCellsAndKeys(currentDay)

  return (
    <Box
      sx={CalendarCellsGroupSx(theme)}
      data-testid={
        isForbiddenNonCurrentMonth
          ? 'forbidden-current-month'
          : 'no-forbidden-current-month'
      }
    >
      {calendarKeys.map(key => {
        const calendarCell = calendarCells.get(key)
        if (calendarCell) {
          return (
            <CalendarCell
              calendarCell={calendarCell}
              isForbiddenNonCurrentMonth={isForbiddenNonCurrentMonth}
              key={key}
              data-date-key={key}
            />
          )
        }
      })}
    </Box>
  )
}
export default React.memo(CalendarCellsGroup)
