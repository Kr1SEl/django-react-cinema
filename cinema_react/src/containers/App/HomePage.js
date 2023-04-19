import React, { useState, useEffect } from "react";
import AdditionalNavbar from '../../components/AdditionalNavbar'
import { getMovies } from "../../actions/api";
import {
  Grid
} from '@mui/material';
import { useHistory } from "react-router-dom";

import "./../../components/styles.css"

const HomePage = () => {

  const history = useHistory();

  const handleMovieClick = (id) => {
    history.push(`/movie/${id}`);
  };

  const [data, setData] = useState(null);

  useEffect(async () => {
    const movies = await getMovies();
    setData(movies)
  }, []);

  if (!data) {
    return (
      <div>
        <AdditionalNavbar />
        <Grid container spacing={1}>
          <h1>Home Page</h1>
          <p>Loading...</p>
        </Grid>
      </div>
    );
  } else {
    return (
      <div>
        <AdditionalNavbar />
        <h1>Home Page</h1>
        {data.map((movie) => (
          <div key={movie.id} className="container">
            <a href="#" onClick={() => handleMovieClick(movie.id)}>
              <img className="image" src={`data:image/jpeg;base64,${movie.poster}`} alt={movie.name} />
              <div className="middle">
                <div className="text">More Info</div>
              </div>
              <p className="refText">{movie.name}</p>
            </a>
          </div>
        ))
        }
      </div >
    );
  }
};

export default HomePage;