import { GET_ITEMS, DELETE_ITEMS, ADD_ITEMS, ITEMS_LOADING } from './types';
import axios from 'axios';
import { tokenCofig } from '../actions/authActions';
import { returnErrors } from '../actions/errorActions'

export const getItems = () => dispatch=>{
    dispatch(setItemsLoading());
    axios
        .get('/api/questions')
        .then(res => 
            dispatch({
                type: GET_ITEMS,
                payload: res.data,
            }))
        .catch( err => 
            dispatch(returnErrors(err.response.data, err.response.status)))    
};


export const addItem = item => (dispatch, getState) => {
    axios
        .post('/api/questions', item, tokenCofig(getState))
        .then(res => 
            dispatch({
                type: ADD_ITEMS,
                payload: res.data
            }))
        .catch( err => 
            dispatch(returnErrors(err.response.data, err.response.status)))    
    
}


export const deleteItems = id => (dispatch, getState) => {
    axios
        .delete(`/api/questions/${id}`, tokenCofig(getState))
        .then(res => 
            dispatch({
                type: DELETE_ITEMS,
                payload: id
            }))
};



export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}

