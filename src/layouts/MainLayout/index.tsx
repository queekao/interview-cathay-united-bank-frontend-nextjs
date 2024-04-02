import { Box, CssBaseline } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Main } from './style'
import React from 'react'
// ==============================|| MAIN LAYOUT ||============================== //

const MainSx = () => ({
  height: '100%',
  overflow: 'scroll',
  minHeight: '100vh',
  background: '#F6F6FD'
})

const MainLayout: React.FC<ChildrenProps> = ({ children }) => {
  const theme = useTheme()

  return (
    <>
      <Box sx={MainSx}>
        <CssBaseline />
        <Main theme={theme}>{children}</Main>
      </Box>
    </>
  )
}

export default MainLayout
