import { ThemeOption } from './themeOptions'
export default function themePalette(theme: ThemeOption): any {
  return {
    // mode: theme?.customization?.navType || '', // To define dark or light
    success: {
      light: theme.colors?.successLight,
      main: theme.colors?.successMain
    },
    error: {
      light: theme.colors?.errorLight,
      main: theme.colors?.errorMain
      // dark: theme.colors?.secondaryDark,
    },
    common: {
      white: theme.colors?.white,
      black: theme.colors?.black
    },
    grey: {
      100: theme.colors.grey100,
      400: theme.colors.grey400
    },
    shadow: {},

    text: {
      primary: theme.colors.black
    }
  }
}
