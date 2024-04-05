import { ReactElement, Suspense } from 'react'
import './globals.css'

import type { AppProps } from 'next/app'
import {
  StyledEngineProvider,
  ThemeProvider,
  Backdrop,
  CircularProgress
} from '@mui/material'
import { theme } from '@/themes'
import MainLayout from '@/layouts/MainLayout'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
export default function App({ pageProps }: AppProps): ReactElement {
  const router = useRouter()
  const { asPath } = router
  const { id } = router.query

  const AnyComponent = dynamic(
    () =>
      asPath === `/test/${id}` ? import('./test/[id]') : import('./index'),
    {
      loading: () => (
        <Backdrop
          sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ),
      suspense: true
    }
  )

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme()}>
          <Suspense>
            <MainLayout>
              <AnyComponent {...pageProps} />
            </MainLayout>
          </Suspense>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  )
}
