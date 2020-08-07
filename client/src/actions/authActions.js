import axios from 'axios';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS, 
} from '../actions/types';

import { returnErrors, clearErrors } from '../actions/errorActions'

// Check token & load user

export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });
    axios.get('/api/auth/user', tokenCofig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        })
}

// Register user
export const register = ({ name, email, password }) => dispatch => {
    // Header
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({ name, email, password });
    axios.post('/api/users', body, config)
        .then(res => {
            dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(clearErrors());
    }) 
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

// Login
export const login = ({ email, password }) => dispatch => {
    // Header
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({ email, password });
    axios.post('/api/auth', body, config)
        .then(res => {
            dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(clearErrors());
    }) 
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

// Logout 
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}



// Setup cofig/headers and token

export const tokenCofig = getState => {
        // get token from localStorage

        const token = getState().auth.token;

        // Headers
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
    
        // if token, add to headers
        if(token) {
            config.headers['x-auth-token'] = token;
        }

        return config;
}

