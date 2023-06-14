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


export const postTicketForSessionId = async (movie, user_name, user_surname, user_email, user_phone, seat, sessionID, price) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const parseAndFormatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const formattedDate = parseAndFormatDate(movie.start_time);
    try {
        axios.defaults.baseURL = 'http://127.0.0.1:8000'
        const body = JSON.stringify({
            "hall": movie.hall_number,
            "dateTime": formattedDate,
            "seat": seat,
            "price": price,
            "telephoneNumber": user_phone,
            "name": user_name,
            "surname": user_surname,
            "email": user_email,
            "filmName": movie.name,
            "additionalServices": "",
            "sessionId": sessionID
        });
        const res = await axios.post(`/api/v1/movie-seats/`, body, config);
        return true;
    } catch (err) {
        throw new Error('503 - Django server is down');
        return false;
    }
};

export const getTicketsForUser = async () => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        try {
            axios.defaults.baseURL = 'http://127.0.0.1:8000'
            const res = await axios.get(`api/v1/movie-tickets/`, config);
            return res.data;
        } catch (err) {
            throw new Error('503 - Django server is down');
        }
    } else {
        return [];
    }
};

export const getReviews = async (movieId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        axios.defaults.baseURL = 'http://127.0.0.1:8000'
        const res = await axios.get(`/api/v1/reviews/${movieId}/`, config);
        return res.data;
    } catch (err) {
        throw new Error('503 - Django server is down');
    }
};

export const postReview = async (movieId, review) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        axios.defaults.baseURL = 'http://127.0.0.1:8000'
        const body = JSON.stringify(review);
        const res = await axios.post(`/api/v1/reviews/${movieId}/`, body, config);
        return res.data;
    } catch (err) {
        throw new Error('503 - Django server is down');
    }
};


export const getGenres = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        axios.defaults.baseURL = 'http://127.0.0.1:8000'
        const res = await axios.get(`/api/v1/genres/`, config);
        return res.data;
    } catch (err) {
        throw new Error('503 - Django server is down');
    }
};

export const getMoviesByGenre = async (genre) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        axios.defaults.baseURL = 'http://127.0.0.1:8000'
        const res = await axios.get(`/api/v1/movies/`, { params: { genre: genre } }, config);
        return res.data;
    } catch (err) {
        throw new Error('503 - Django server is down');
    }
};
