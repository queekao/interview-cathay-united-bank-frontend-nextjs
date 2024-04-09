import '@testing-library/jest-dom'
// This is for the provider of the __tests__
import { render } from '@testing-library/react'
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider
} from '@mui/material/styles'

const ProviderForTest = ({ children }: ChildrenProps) => {
  const theme = createTheme()
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  )
}

const providerRender = (ui: any, options: any): any =>
  render(ui, { wrapper: ProviderForTest, ...options })

// re-export everything
export * from '@testing-library/react'

export { providerRender as render }
