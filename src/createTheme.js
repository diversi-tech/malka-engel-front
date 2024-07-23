import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#7851A9', // Royal Purple
    },
    secondary: {
      main: '#008080', // Teal
    },
    background: {
      default: '#F5F5F5', // Light grey
    },
    text: {
      primary: '#000000', // Black
      secondary: '#4F4F4F', // Dark Gray
    },
  },
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
});

export default theme;
