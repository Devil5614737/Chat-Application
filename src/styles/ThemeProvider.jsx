import OpenSans from '../assets/fonts/OpenSans.ttf';
import { createTheme, CssBaseline, ThemeProvider as ThmePrvdr } from '@mui/material';

export const ThemeProvider=({children})=>{
const theme = createTheme({
  typography: {
    fontFamily: 'Open Sans, Arial',
  },
  
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Open Sans';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Open Sans'), local('Open Sans'), url(${OpenSans}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
  
  palette:{
    // mode:'dark',
    background:{
      default:"#F2F2F2",
    }
  }
});


    return(
<ThmePrvdr theme={theme}>
    <CssBaseline/>
    {children}
  </ThmePrvdr>
    )
}