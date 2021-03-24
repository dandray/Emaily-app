import axios from 'axios';
import { FETCH_USER } from './types';

//Each time the fetchUser action is called, it is dispatched to all the reducers
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload : res.data });
};

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    dispatch({ type : FETCH_USER, payload : res.data })
}