import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import user from './user';
import post from './post';
import postload from './postload';

export default combineReducers({
  alert,
  auth,
  post,
  user,
  postload
});
