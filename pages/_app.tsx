import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../src/index.css';
import CookieBanner from '../components/CookieBanner';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3387a2',
      light: '#5ba0b7',
      dark: '#24678d',
    },
    secondary: {
      main: '#3387a2',
      light: '#5ba0b7',
      dark: '#24678d',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    amazon: {
      main: '#ff8400',
      light: '#ffab40',
      dark: '#e97901',
    },
  },
  typography: {
    fontFamily: '"Lato", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 300, fontSize: '3rem' },
    h2: { fontWeight: 400, fontSize: '2.5rem' },
    h3: { fontWeight: 400, fontSize: '2rem' },
    h4: { fontWeight: 400, fontSize: '1.5rem' },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '12px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <CookieBanner />
    </ThemeProvider>
  );
} 