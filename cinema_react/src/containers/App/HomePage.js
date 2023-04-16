import React, { useState } from "react";
import AdditionalNavbar from '../../components/AdditionalNavbar'
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

  const [movieID, setMovieID] = useState(true);

  const handleMovieChange = (event) => {
    setMovieID(e.target.value === 'true');
  }

  return (
    <div>
      <AdditionalNavbar />
      <Grid container spacing={1}>
        <h1>Home Page</h1>
      </Grid>
    </div>
  );
};

export default HomePage;