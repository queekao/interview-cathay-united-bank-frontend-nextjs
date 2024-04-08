import React, { ReactElement } from 'react'
import { Backdrop, CircularProgress } from '@mui/material'
const LoadingSpinner = (): ReactElement => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
      open={true}
      data-testid="backdrop"
    >
      <CircularProgress color="inherit" data-testid="progressbar" />
    </Backdrop>
  )
}
export default LoadingSpinner
