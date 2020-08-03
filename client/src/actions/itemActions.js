import { GET_ITEMS, DELETE_ITEMS, ADD_ITEMS, ITEMS_LOADING } from './types';
import axios from 'axios';

export const getItems = () => dispatch =>{
    dispatch(setItemsLoading());
    axios
        .get('/api/questions')
        .then(res => 
            dispatch({
                type: GET_ITEMS,
                payload: res.data,
            })) 
};


export const addItem = item => dispatch => {
    axios
        .post('/api/questions', item)
        .then(res => 
            dispatch({
                type: ADD_ITEMS,
                payload: res.data
            }))
}


export const deleteItems = id => dispatch => {
    axios
        .delete(`/api/questions/${id}`)
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

