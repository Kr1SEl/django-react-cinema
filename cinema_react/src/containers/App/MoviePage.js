import React from "react";
import AdditionalNavbar from '../../components/AdditionalNavbar'
import { StylesProvider } from '@material-ui/core/styles';
import "./../../components/styles.css"
import SessionTable from "../../components/SessionTable";
import MovieData from "../../components/MovieData";

const MoviePage = ({ match }) => {
  return (
    <div>
      <StylesProvider injectFirst>
        <AdditionalNavbar />
        <MovieData movieId={match.params.movieID} />
        <br />
      </StylesProvider>
      <SessionTable movieId={match.params.movieID} />
    </div>
  );
};

export default MoviePage;