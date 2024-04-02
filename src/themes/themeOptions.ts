export const Colors = {
  paper: '#ffffff',

  // success
  successLight: '#48DA82',
  successMain: '#15B48E',
  // successDark: '',

  // error
  errorLight: '#EF646140',
  errorMain: '#EF6461',
  // secondaryDark: '',

  // common
  white: '#FFFFFF',
  black: '#2A2B38',
  // grey
  grey100: '#DCDDE5',
  grey400: '#B9BACC',
  //gradient
  //shadow
  shadow100: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  shadow200: '0px 3px 10px #00000061',
  // text
  textDark: '#2A2B38'
}

// For all the theme type definition
export interface ThemeOption {
  colors: typeof Colors
  // palette
  navType?: string
  // typography
  fontFamily?: string
  // border radis
  borderRadisRound?: string
  borderRadisSharp?: string
  borderRadisCircle?: string
}
