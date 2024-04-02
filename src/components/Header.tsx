import { Box } from '@mui/material'
import { ReactElement } from 'react'
import { SxProps } from '@mui/system'
import { Theme, useTheme } from '@mui/material/styles'

const HeaderSx = (theme: Theme): SxProps<Theme> => ({
  minWidth: 300,
  width: '100%',
  '& .title': {
    ...theme.flexCenter,
    justifyContent: 'start',
    gap: '1.6rem',
    marginBottom: '1.1rem',
    marginTop: '2rem'
  }
})
export const Header = (): ReactElement => {
  const theme = useTheme()
  return <Box sx={HeaderSx(theme)}></Box>
}
