declare module '@mui/material/styles' {
  interface Palette {
    black: Palette['primary']
    white: Palette['primary']
  }

  interface PaletteOptions {
    black?: PaletteOptions['primary']
    white?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    black: true
    white: true
  }

  interface ButtonPropsVariantOverrides {
    'nav-link': true
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    black: true
    white: true
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    black: true
    white: true
  }
}

export {}
