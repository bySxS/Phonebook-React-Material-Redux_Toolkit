import React from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import 'styles/App.css';
import Header from 'shared/Header/Header'
import Main from 'shared/Main/Main'
import Footer from 'shared/Footer/Footer'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './Router'

const theme = createTheme({
  palette: {
    primary: {
      main: '#007e0a',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});

function App() {
  return (
    <HelmetProvider>
    <BrowserRouter>
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Main>
          <AppRouter />
        </Main>
        <Footer />
      </ThemeProvider>
    </div>
    </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
