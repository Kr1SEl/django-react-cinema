import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL
} from '../actions/types'

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email, password });
    try {
        axios.defaults.baseURL = 'http://127.0.0.1:8000'
        const res = await axios.post(`/auth/jwt/create/`, body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
        return true;
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
        return false;
    }
};

export const signup = (name, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ name, email, password, re_password });
    try {
        axios.defaults.baseURL = 'http://127.0.0.1:8000'
        const res = await axios.post(`/auth/users/`, body, config);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
        return true;
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        });
        return false;
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ uid, token });
    console.log(body)
    console.log(uid)
    console.log(token)
    try {
        axios.defaults.baseURL = 'http://127.0.0.1:8000'
        await axios.post(`/auth/users/activation/`, body, config);
        dispatch({
            type: ACTIVATION_SUCCESS,
        });
        return true;
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        });
        return false;
    }
};

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        try {
            axios.defaults.baseURL = 'http://127.0.0.1:8000'
            const res = await axios.get(`/auth/users/me/`, config);
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: res.data
            });
            dispatch(load_user());
        } catch (err) {
            dispatch({
                type: LOAD_USER_FAIL
            })
        }
    } else {
        dispatch({
            type: LOAD_USER_FAIL
        })
    }
};

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        const body = JSON.stringify({ token: localStorage.getItem('access') });
        try {
            axios.defaults.baseURL = 'http://127.0.0.1:8000'
            const res = await axios.post(`/auth/jwt/verify/`, body, config)
            if (res.data.code !== 'roken_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    const body = JSON.stringify({ email });
    try {
        axios.defaults.baseURL = 'http://127.0.0.1:8000'
        await axios.post(`auth/users/reset_password/`, body, config);
        dispatch({
            type: PASSWORD_RESET_SUCCESS
        })
        return true;
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
        return false;
    }
};

export const reset_password_confim = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    const body = JSON.stringify({ uid, token, new_password, re_new_password });
    try {
        axios.defaults.baseURL = 'http://127.0.0.1:8000'
        await axios.post(`auth/users/reset_password_confirm/`, body, config);
        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        })
        return true;
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
        return false;
    }
};



export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};