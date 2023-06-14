import React from "react";
import AdditionalNavbar from '../../components/AdditionalNavbar'
import { StylesProvider } from '@material-ui/core/styles';
import "./../../components/styles.css"
import SessionTable from "../../components/SessionTable";
import MovieData from "../../components/MovieData";
import Review from '../../components/Review';


const MoviePage = ({ match }) => {
  return (
    <div>
      <StylesProvider injectFirst>
        <AdditionalNavbar />
        <MovieData movieId={match.params.movieID} />
        <br />
      </StylesProvider>
      <SessionTable movieId={match.params.movieID} />
      <Review movieId={match.params.movieID} />
    </div>
  );
};

export default MoviePage;