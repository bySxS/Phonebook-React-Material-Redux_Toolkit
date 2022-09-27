import React from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import 'styles/app.css';
import Header from 'shared/header'
import Main from 'shared/main'
import Footer from 'shared/footer'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router'
import Loader from './shared/loader'

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
        <Loader />
        <Footer />
      </ThemeProvider>
    </div>
    </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
