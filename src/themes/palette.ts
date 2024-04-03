import { ThemeOption } from './themeOptions'

export default function themePalette(theme: ThemeOption): any {
  return {
    calendar: {
      background: theme.colors?.white,
      hover: '#e6e6e6',
      today: '#ffff76',
      active: '#006edc',
      nonCurrentMonth: '#757575'
    },
    success: {
      light: theme.colors?.successLight,
      main: theme.colors?.successMain
    },
    error: {
      light: theme.colors?.errorLight,
      main: theme.colors?.errorMain
    },
    common: {
      white: theme.colors?.white,
      black: theme.colors?.black
    },
    grey: {
      100: theme.colors?.grey100,
      400: theme.colors?.grey400
    },
    shadow: {},
    text: {
      primary: theme.colors?.black
    }
  }
}
