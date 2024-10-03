import { ReactElement, Suspense, useEffect } from 'react'
import './globals.css'

import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { StyledEngineProvider, ThemeProvider } from '@mui/material'
import { theme } from '@/themes'
import MainLayout from '@/layouts/MainLayout'
import LoadingSpinner from '@/components/LoadingSpinner'
export default function App({ pageProps }: AppProps): ReactElement {
  const router = useRouter()
  const { asPath } = router
  const { id } = router.query
  const AnyComponent = dynamic(
    () =>
      asPath === `/test/${id}` ? import('./test/[id]') : import('./index'),
    {
      loading: () => <LoadingSpinner />,
      suspense: true
    }
  )
  useEffect(() => {
    return () => {
      console.log('id change', id)
    }
  }, [id])

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
