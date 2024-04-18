import React from 'react'
import { useCalendar } from '@/hooks'
import { Box } from '@mui/material'
import { SxProps } from '@mui/system'
import { useTheme, Theme } from '@mui/material/styles'
import CalendarSelectorBtn from './CalendarSelectorBtn'

const CalendarSelectorSx = (theme: Theme): SxProps<Theme> => ({
  ...theme.flexCenter,
  justifyContent: 'space-between',
  width: '100%',
  height: '4.4rem',
  marginBottom: '1.6rem'
})

const CalendarSelector: React.FC<ICalendarProps> = ({ isMonthNavigator }) => {
  const [currentDay, setCurrentDay] = useCalendar(
    calendar => calendar['currentDay']
  )
  // console.log('re-render selector')

  const changeDateMonth = (isNextMonth: boolean): void => {
    const newCurrentDay =
      currentDay.month() === 0 && !isNextMonth
        ? currentDay.set('year', currentDay.year() - 1).set('month', 11)
        : currentDay.month() === 11 && isNextMonth
          ? currentDay.set('year', currentDay.year() + 1).set('month', 0)
          : currentDay.add(isNextMonth ? 1 : -1, 'month')

    setCurrentDay({ currentDay: newCurrentDay })
    // resetRangeDays()
  }
  const theme = useTheme()
  return (
    <Box
      sx={CalendarSelectorSx(theme)}
      data-testid={isMonthNavigator ? 'navigator' : 'no-navigator'}
    >
      <>
        <CalendarSelectorBtn
          isRight={false}
          changeDateMonth={
            isMonthNavigator ? () => changeDateMonth(false) : () => {}
          }
          disabled={!isMonthNavigator || false}
        />

        <div>{currentDay.format('YYYY年MM月')}</div>
        <CalendarSelectorBtn
          isRight={true}
          changeDateMonth={
            isMonthNavigator ? () => changeDateMonth(true) : () => {}
          }
          disabled={!isMonthNavigator || false}
        />
      </>
    </Box>
  )
}
export default React.memo(CalendarSelector)
