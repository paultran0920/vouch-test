import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    lightgreen: Palette['primary'];
  }

  interface PaletteOptions {
    lightgreen?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    lightgreen: true;
  }
}

const defaultTheme = createTheme({
  palette: {
    lightgreen: {
      main: '#5DB075',
      contrastText: '#FFFFFF',
    }
  },
});

export const CustomizedTheme = createTheme(defaultTheme, {});
