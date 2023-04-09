import React, { Component } from 'react';
import { render } from 'react-dom';
import CinemaRouter from './Router';
import { Provider } from 'react-redux';
import store from './Store'


const App = () => (
  <Provider store={store}>
    <CinemaRouter />
  </Provider>
);

export default App;


