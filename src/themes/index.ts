import { zhTW } from '@mui/material/locale'
import { createTheme, ThemeOptions, Theme } from '@mui/material/styles'
import { ThemeOption, Colors } from './themeOptions'
// project imports
import themePalette from './palette'
import themeTypography from './typography'
import componentStyleOverrides from './compStyleOverride'

export const theme = (): Theme => {
  const themeOption: ThemeOption = {
    // options inject to the other definition
    colors: Colors,
    fontFamily: `Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`,
    borderRadisCircle: '100px',
    borderRadisRound: '30px',
    borderRadisSharp: '4px'
  }

  const themeOptions: ThemeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    flexCenter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    positionCenter: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)'
    },
    positionTop: {
      position: 'absolute',
      top: '0%',
      left: '0%'
    },
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px'
        }
      }
    },
    breakpoints: {
      values: {
        xl: 2000,
        lg: 1440,
        md: 960,
        sm: 760,
        xs: 480
      }
    },
    typography: themeTypography(themeOption),
    components: componentStyleOverrides()
  }

  const themes = createTheme(themeOptions, zhTW)

  return themes
}
