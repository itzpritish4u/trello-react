import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#222',
      dark: '#111',
      accent : '#26f'
    },
    secondary: {
      main: '#333',
      light: '#444',
      extraLight: '#555'
    },
    background: {
      default: '#111'
    },
    text: {
      primary: '#fff',
      secondary: '#c7c7c7'
    }
  },
  typography: {
    fontFamily: 'Poppins, sans-serif'
  },
  scrollbar: {
    width: '5px',
    backgroundColor: '#1e1e1e57',
    thumbColor: '#3e3e3e'
  }
});

export default theme;
