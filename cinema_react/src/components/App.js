import React, { Component } from 'react';
import { render } from 'react-dom';
import MyRouter from './Router';
import MovieListPage from './MovieListPage';


export default class App extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return <MyRouter/>
  }
}

const appDiv = document.getElementById("app");
render(<App name="Test website"/>, appDiv);

