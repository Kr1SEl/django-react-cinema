import React, { useState, useEffect } from "react";
import { getMovieById } from "../actions/api";
import {
    Grid
} from '@mui/material';


const MovieData = ({ movieId }) => {
    const [movie, setMovie] = useState(null);

    useEffect(async () => {
        const movie = await getMovieById(movieId);
        setMovie(movie)
    }, []);

    if (!movie) {
        return (
            <div>
                <Grid container spacing={1}>
                    <h1>Movie Page</h1>
                    <p>Loading...</p>
                </Grid>
            </div>
        );
    } else {
        return (
            <div>
                <h2>{movie.name}</h2>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                        <iframe
                            width="95%"
                            height="315"
                            src={`https://www.youtube.com/embed/${new URL(movie.trailer_link).searchParams.get('v')}`}
                            title={movie.name}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </Grid>
                    <Grid item xs={12} md={6} style={{ backgroundImage: `url("data:image/png;base64,${movie.poster}")` }}>
                        <p>Directed by: {movie.directed_by}</p>
                        <p>Length: {movie.length_mins} minutes</p>
                        <p>Grade: {movie.grade}</p>
                        <p>Description: {movie.description}</p>
                        <p>Genres: {movie.genres.map((genre) => genre.name).join(', ')}</p>
                        <p>Production Year: {movie.production_year}</p>
                        <p>Production Country: {movie.production_country}</p>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default MovieData;