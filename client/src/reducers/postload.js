import { GET_POST_LOAD, POST_LOAD_ERROR } from '../actions/types';
const initialState = {
  postsload: [],
  postload: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POST_LOAD:
      return {
        ...state,
        postsload: payload,
        loading: false
      };

    case POST_LOAD_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
}
