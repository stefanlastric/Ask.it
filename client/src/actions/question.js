import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_QUESTION,
  GET_QUESTIONS,
  QUESTION_ERROR,
  DELETE_QUESTION
} from './types';

//export current user questions
export const getCurrentQuestion = () => async dispatch => {
  try {
    const res = await axios.get('/questions/me');

    dispatch({
      type: GET_QUESTION,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get all questions
export const getQuestions = () => async dispatch => {
  try {
    const res = await axios.get('/questions');

    dispatch({
      type: GET_QUESTIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response, status: err.response }
    });
  }
};

//Get questions by ID
export const getQuestionsById = userId => async dispatch => {
  try {
    const res = await axios.get(`/questions/user/${userId}`);

    dispatch({
      type: GET_QUESTION,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response, status: err.response }
    });
  }
};

//Create or update questions
export const createQuestion = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/questions', formData, config);

    dispatch({
      type: GET_QUESTION,
      payload: res.data
    });

    dispatch(
      setAlert(edit ? 'Question Updated' : 'Question Created', 'success')
    );

    if (!edit) {
      history.push('/');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response, status: err.response }
    });
  }
};

//Delete questions

export const deleteQuestion = id => async dispatch => {
  try {
    await axios.delete(`/questions/${id}`);

    dispatch({
      type: DELETE_QUESTION,
      payload: id
    });

    dispatch(setAlert('Question Removed', 'success'));
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
