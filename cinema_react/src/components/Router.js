import MovieListPage from '../containers/App/MovieListPage';
import HomePage from '../containers/App/HomePage';
import MoviePage from '../containers/App/MoviePage';
import ActivationPage from '../containers/Auth/ActivationPage';
import TicketsPage from '../containers/App/TicketsPage';
import PromosPage from '../containers/App/PromosPage';
import SeatPickerPage from '../containers/App/SeatPickerPage';
import ResetPasswordConfirmationPage from '../containers/Auth/ResetPasswordConfirmationPage';
import ResetPasswordPage from '../containers/Auth/ResetPasswordPage';
import SignUpPage from '../containers/Auth/SignUpPage';
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Layout from '../hocs/Layout';

const CinemaRouter = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/reset-password" component={ResetPasswordPage} />
        <Route exact path="/password/reset/confirm/:uid/:token" component={ResetPasswordConfirmationPage} />
        <Route exact path="/activate/:uid/:token" component={ActivationPage} />
        <Route exact path="/movies" component={MovieListPage} />
        <Route exact path="/movie/seats/:sessionID" component={SeatPickerPage} />
        <Route exact path="/tickets" component={TicketsPage} />
        <Route exact path="/promos" component={PromosPage} />
        <Route exact path="/movie/:movieID" component={MoviePage} />
      </Switch>
    </Layout>
  </Router>
);

export default CinemaRouter;