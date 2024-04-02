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
import { Header } from '@/components/Header'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
// Dynamically imported pages

export default function App({ pageProps }: AppProps): ReactElement {
  const router = useRouter()
  const { pathname } = router
  const AnyComponent = dynamic(
    () => (pathname === '/test' ? import('./testOne') : import('./index')),
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
          <MainLayout>
            <Header />
            <Suspense>
              <AnyComponent {...pageProps} />
            </Suspense>
          </MainLayout>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  )
}
