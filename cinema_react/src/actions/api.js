import axios from 'axios';

export const getMovies = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        axios.defaults.baseURL = 'http://127.0.0.1:8000'
        const res = await axios.get(`/api/v1/movies/`, config);
        return res.data;
    } catch (err) {
        throw new Error('503 - Django server is down');
    }
};

export const getMovieById = async (id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        axios.defaults.baseURL = 'http://127.0.0.1:8000'
        const res = await axios.get(`/api/v1/movies/${id}/`, config);
        return res.data;
    } catch (err) {
        throw new Error('503 - Django server is down');
    }
};

export const getSessionsByMovieId = async (id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        axios.defaults.baseURL = 'http://127.0.0.1:8000'
        const res = await axios.get(`/api/v1/movie-session/${id}/`, config);
        return res.data;
    } catch (err) {
        throw new Error('503 - Django server is down');
    }
};

export const getPlacesBySessionId = async (id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        axios.defaults.baseURL = 'http://127.0.0.1:8000'
        const res = await axios.get(`/api/v1/movie-seats/${id}/`, config);
        return res.data;
    } catch (err) {
        throw new Error('503 - Django server is down');
    }
};

export const getMovieInfoBySessionId = async (id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        axios.defaults.baseURL = 'http://127.0.0.1:8000'
        const res = await axios.get(`/api/v1/movie-session-details/${id}/`, config);
        return res.data;
    } catch (err) {
        throw new Error('503 - Django server is down');
    }
};
