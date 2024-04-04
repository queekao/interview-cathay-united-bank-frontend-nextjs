import React from 'react'
import { useCalendar } from '@/hooks'
import clsx from 'clsx'
import { Box } from '@mui/material'
import { SxProps } from '@mui/system'
import { useTheme, Theme } from '@mui/material/styles'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const CalendarSelectorSx = (theme: Theme): SxProps<Theme> => ({
  ...theme.flexCenter,
  justifyContent: 'space-between',
  padding: '4rem',
  width: '100%',
  height: '4.4rem',
  marginBottom: '1.6rem',
  '& .icon': {
    background: theme.palette.common?.white,
    ...theme.flexCenter,
    width: '4.4rem',
    height: '4.4rem',
    transition: 'all 0.3s',
    '&:hover': {
      background: theme.palette?.calendar?.hover
    },
    cursor: 'pointer',
    '&__left': {},
    '&__right': {}
  },
  '& .date': {}
})

const CalendarSelector: React.FC<ICalendarProps> = ({ isMonthNavigator }) => {
  const [currentDay, setCurrentDay] = useCalendar(
    calendar => calendar['currentDay']
  )

  const changeDateMonth = (isNextMonth: boolean): void => {
    const newCurrentDay =
      currentDay.month() === 0 && !isNextMonth
        ? currentDay.set('year', currentDay.year() - 1).set('month', 11)
        : currentDay.month() === 11 && isNextMonth
        ? currentDay.set('year', currentDay.year() + 1).set('month', 0)
        : currentDay.add(isNextMonth ? 1 : -1, 'month')

    setCurrentDay({ currentDay: newCurrentDay })
  }
  const theme = useTheme()
  console.log('re-render selector')
  return (
    <Box sx={CalendarSelectorSx(theme)}>
      <>
        <div
          className={clsx('icon', 'icon__left')}
          onClick={isMonthNavigator ? () => changeDateMonth(false) : () => {}}
        >
          <ChevronLeftIcon />
        </div>

        <div className="date">{currentDay.format('YYYY年MM月')}</div>

        <div
          className={clsx('icon', 'icon__right')}
          onClick={isMonthNavigator ? () => changeDateMonth(true) : () => {}}
        >
          <ChevronRightIcon />
        </div>
      </>
    </Box>
  )
}
export default React.memo(CalendarSelector)
