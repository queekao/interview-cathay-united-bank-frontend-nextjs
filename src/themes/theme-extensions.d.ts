import '@mui/material/styles'
import { PaletteOptions } from '@mui/material/styles/createPalette'

declare module '@mui/material/styles' {
  interface ThemeOptions {
    flexCenter?: React.CSSProperties
    positionCenter?: React.CSSProperties
    positionTop?: React.CSSProperties
    palette?: PaletteOptions & {
      calendar?: {
        background?: string
        hover?: string
        today?: string
        active?: string
        nonCurrentMonth?: string
      }
    }
  }

  interface Theme {
    flexCenter?: React.CSSProperties
    positionCenter?: React.CSSProperties
    positionTop?: React.CSSProperties
    palette: PaletteOptions & {
      calendar?: {
        background?: string
        hover?: string
        today?: string
        active?: string
        nonCurrentMonth?: string
      }
    }
  }
}
