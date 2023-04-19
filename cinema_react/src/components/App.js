import React, { Component } from 'react';
import { render } from 'react-dom';
import CinemaRouter from './Router';
import { Provider } from 'react-redux';
import store from './Store'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red, deepPurple, lightBlue, green, amber, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: '#DC4C64',
    },
    error: {
      main: red[500],
    },
    warning: {
      main: amber[500],
    },
    info: {
      main: lightBlue[500],
    },
    success: {
      main: green[500],
    },
    grey: {
      main: grey[500],
    },
  },
  // typography: {
  //   fontFamily: 'gongo',
  // },
});

theme.components = {
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: "#000000",
        "&.MuiAppBar-lg": {
          paddingLeft: 400,
          paddingRight: 400,
        },
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      title: {
        flexGrow: 1,
        fontFamily: "gongo",
        fontSize: 40,
        color: "#ffffff",
        textDecoration: "none",
      },
    },
  },
};


const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CinemaRouter />
    </ThemeProvider>
  </Provider>
);

export default App;
