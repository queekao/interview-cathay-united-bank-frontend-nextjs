import React from 'react'
import { Button } from '@mui/material'
import { SxProps } from '@mui/system'
import { useTheme, Theme } from '@mui/material/styles'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const CalendarSelectorBtnSx = (theme: Theme): SxProps<Theme> => ({
  background: theme.palette.common?.white,
  ...theme.flexCenter,
  width: '4.4rem !important',
  minWidth: '4.4rem !important',
  height: '4.4rem !important',
  minHeight: '4.4rem !important',
  color: theme.palette.common?.black,
  transition: 'all 0.3s',
  cursor: 'pointer',
  '&:hover': {
    background: theme.palette?.calendar?.hover
  }
})

interface CalendarSelectorBtnProp {
  isRight: boolean
  changeDateMonth: () => void
  disabled: boolean
}
const CalendarSelectorBtn: React.FC<CalendarSelectorBtnProp> = ({
  isRight,
  changeDateMonth,
  disabled
}) => {
  // console.log('re-render selector btn')
  const theme = useTheme()
  return (
    <Button
      sx={CalendarSelectorBtnSx(theme)}
      onClick={changeDateMonth}
      disabled={disabled}
    >
      {isRight ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </Button>
  )
}
export default React.memo(CalendarSelectorBtn)
