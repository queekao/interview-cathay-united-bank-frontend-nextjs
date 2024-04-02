import { ThemeOption } from './themeOptions'
export default function themeTypography(theme: ThemeOption): any {
  return {
    fontFamily: theme?.fontFamily,
    h4: {
      fontSize: '1.0rem',
      color: theme.colors.textDark,
      fontWeight: 400,
      whiteSpace: 'break-spaces'
    },
    h3: {
      fontWeight: 600,
      color: theme.colors.textDark,
      fontSize: '1.2rem',
      whiteSpace: 'break-spaces',
      lineHeight: '1.666em'
    },
    h2: {
      fontSize: '1.4rem',
      color: theme.colors.textDark,
      fontWeight: 600,
      lineHeight: '1.714em',
      whiteSpace: 'break-spaces'
    },
    h1: {
      fontSize: '2.4rem',
      color: theme.colors.textDark,
      fontWeight: 600,
      whiteSpace: 'break-spaces'
    },
    subtitle1: {
      fontWeight: 400,
      color: theme.colors.textDark,
      fontSize: '1.2rem',
      whiteSpace: 'break-spaces',
      lineHeight: '1.666em'
    },
    body1: {
      fontSize: '1.4rem',
      color: theme.colors.textDark,
      fontWeight: 400,
      lineHeight: '1.714em'
    },
    body2: {
      fontSize: '1.0rem',
      color: theme.colors.textDark,
      fontWeight: 400,
      lineHeight: '1.334em'
    }
  }
}
