import axios from 'axios';
import { GET_USERS, USER_ERROR, UPDATE_PASS, GET_USER } from './types';

// Get users
export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get('/users');

    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Get users
export const getUser = id => async dispatch => {
  try {
    const res = await axios.get(`/users/${id}`);

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const updatePass = id => async dispatch => {
  try {
    const res = await axios.put('/users/password');

    dispatch({
      type: UPDATE_PASS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
