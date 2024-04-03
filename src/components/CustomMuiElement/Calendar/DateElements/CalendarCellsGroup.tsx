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
      transition: 'all 0.3s',
      '&_selected': {
        background: theme.palette.calendar?.active,
        color: theme.palette.common?.white
      },
      '&_today': {
        background: theme.palette.calendar?.today
      }
    }
  }
})
export const CalendarCellsGroup: React.FC = () => {
  const theme = useTheme()
  const { calendar, getCalendarRows, selectedDateHandler } = useCalendar()
  const rows = getCalendarRows()

  return (
    <Box sx={CalendarCellsGroupSx(theme)}>
      {rows.map((cells, rowIndex) => {
        return (
          <div key={rowIndex} className="cell">
            {cells.map(({ text, value }) => {
              console.log(calendar.currentDay.toString())

              return (
                <div
                  key={value.toString()}
                  className={clsx('cell__day', {
                    cell__day_selected:
                      value.toString() ===
                        calendar?.selectedNextDate?.toString() ||
                      false ||
                      value.toString() ===
                        calendar?.selectedPrevDate?.toString() ||
                      false,
                    cell__day_today:
                      value.toString() === calendar.currentDay.toString()
                  })}
                  onClick={() => selectedDateHandler(value)}
                >
                  {text}
                </div>
              )
            })}
          </div>
        )
      })}
    </Box>
  )
}
