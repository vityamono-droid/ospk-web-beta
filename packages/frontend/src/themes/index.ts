import { createTheme, type ThemeOptions } from '@mui/material/styles'

const options = {
  palette: {
    primary: {
      main: '#e33b11',
    },
    secondary: {
      main: '#4683c1',
    },
    background: {
      default: '#eeeeff',
    },
    black: {
      main: '#000',
    },
    white: {
      main: '#fff',
    },
    contrastThreshold: 4.5,
  },
  components: {
    MuiTypography: {
      defaultProps: {
        style: {
          userSelect: 'none',
        },
      },
    },
  },
} satisfies ThemeOptions

const theme = createTheme(options)

export default theme
