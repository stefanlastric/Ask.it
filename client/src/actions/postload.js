import axios from 'axios';
import { POST_LOAD_ERROR, GET_POST_LOAD } from './types';

// Get posts by UserId
export const getPostsLoad = num => async dispatch => {
  try {
    const res = await axios.get(`/posts/load?limit=${num}`);

    dispatch({
      type: GET_POST_LOAD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_LOAD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
