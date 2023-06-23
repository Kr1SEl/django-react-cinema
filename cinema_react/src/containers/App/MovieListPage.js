import React, { useState, useEffect } from "react";
import AdditionalNavbar from '../../components/AdditionalNavbar';
import { getMovies } from "../../actions/api";
import {
  Grid,
  Container,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Card,
  CardContent
} from '@mui/material';
import { useHistory } from "react-router-dom";
import '../../../static/frontend/index.css';
import "./../../components/styles.css";

const MovieListPage = () => {
  const history = useHistory();

  const handleMovieClick = (id) => {
    history.push(`/movie/${id}`);
  };

  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(async () => {
    const movies = await getMovies();
    setData(movies);
  }, []);

  const genres = data ? Array.from(new Set(data.flatMap(movie => movie.genres.map(g => g.name)))) : [];

  const filteredMovies = data?.filter(movie =>
    movie.name.toLowerCase().includes(search.toLowerCase()) &&
    (genre === "" || movie.genres.some(g => g.name === genre))
  );

  if (!data) {
    return (
      <div>
        <AdditionalNavbar />
        <Container>
          <Box>
            <div className="loader" />
          </Box>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <AdditionalNavbar />
        <Container>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <p>Search</p>
                <Card>
                  <CardContent>
                    <TextField
                      label="Search by Name"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                    />
                    <FormControl style={{ width: '200px' }}>
                      <InputLabel id="genre-label">
                        Genre
                      </InputLabel>
                      <Select
                        labelId="genre-label"
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                        input={<OutlinedInput label="Genre" />}
                      >
                        <MenuItem
                          value=""
                        >
                          <em>None</em></MenuItem>
                        {genres.map((g) => (
                          <MenuItem
                            value={g} key={g}
                          >
                            {g}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </CardContent>
                </Card>
              </Grid>
              {filteredMovies.map((movie) => (
                <Grid item xs={12} sm={4} key={movie.id}>
                  <div className="container">
                    <a href="#" onClick={() => handleMovieClick(movie.id)}>
                      <img className="image" src={`data:image/jpeg;base64,${movie.poster}`} alt={movie.name} />
                      <div className="middle">
                        <div className="text">More Info</div>
                      </div>
                      <p className="refText" style={{ fontFamily: 'rajdhani' }}>{movie.name}</p>
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

export default MovieListPage;
