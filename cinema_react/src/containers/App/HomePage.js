import React, { useState, useEffect } from "react";
import AdditionalNavbar from '../../components/AdditionalNavbar';
import { getMovies } from "../../actions/api";
import {
  Grid,
  Container,
  Box
} from '@mui/material';
import { useHistory } from "react-router-dom";

import "./../../components/styles.css";

const HomePage = () => {
  const history = useHistory();

  const handleMovieClick = (id) => {
    history.push(`/movie/${id}`);
  };

  const [data, setData] = useState(null);

  useEffect(async () => {
    const movies = await getMovies();
    setData(movies);
  }, []);

  if (!data) {
    return (
      <div>
        <AdditionalNavbar />
        <Container>
          <Box>
            <h1>Home Page</h1>
            <p>Loading...</p>
          </Box>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <AdditionalNavbar />
        <h1>Home Page</h1>
        <Container>
          <Box>
            <Grid container spacing={2}>
              {data.map((movie) => (
                <Grid item xs={12} sm={4} key={movie.id}>
                  <div className="container">
                    <a href="#" onClick={() => handleMovieClick(movie.id)}>
                      <img className="image" src={`data:image/jpeg;base64,${movie.poster}`} alt={movie.name} />
                      <div className="middle">
                        <div className="text">More Info</div>
                      </div>
                      <p className="refText">{movie.name}</p>
                    </a>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </div >
    );
  }
};

export default HomePage;
