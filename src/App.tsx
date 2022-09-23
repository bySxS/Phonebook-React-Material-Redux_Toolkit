import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react';
import 'styles/App.css';
import Header from 'features/components/Header/Header'
import Main from 'features/components/Main/Main'
import Footer from 'features/components/Footer/Footer'
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
  );
}

export default App;
