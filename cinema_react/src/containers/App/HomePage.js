import React, { useState, useEffect } from "react";
import AdditionalNavbar from '../../components/AdditionalNavbar'
import { getMovies } from "../../actions/api";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  FormControlLabel,
  FormControl,
  FormHelperText,
  RadioGroup,
  Radio
} from '@mui/material';

const HomePage = () => {

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
        <Grid container spacing={1}>
          <h1>Home Page</h1>
          <p>data is loaded, check console {console.log(data)}</p>
        </Grid>
      </div>
    );
  }
};

export default HomePage;