import MovieListPage from './MovieListPage';
import HomePage from './HomePage';
import React, {Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";

export default class MyRouter extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (<Router>
        <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route path="/movies" element={<MovieListPage/>}/>
        </Routes>
    </Router>);
  }
}