import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface ThemeOptions {
    // This is my custom options
    flexCenter?: React.CSSProperties
    positionCenter?: React.CSSProperties
    positionTop?: React.CSSProperties
  }
  interface Theme {
    // This is for the type that 'mui' defining the Theme type
    flexCenter?: React.CSSProperties
    positionCenter?: React.CSSProperties
    positionTop?: React.CSSProperties
  }
}
