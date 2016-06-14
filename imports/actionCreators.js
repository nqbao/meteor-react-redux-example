import { Meteor } from 'meteor/meteor';
import { createAction } from 'redux-actions';

export const addTask = (text) => () => {
  Meteor.call('addTask', { text });
};

export const removeTask = (id) => () => {
  Meteor.call('removeTask', { id });
};

export const toggleTask = (id) => () => {
  Meteor.call('toggleTask', { id });
};

// view state actions
export const TOGGLE_VISIBILITY_FILTER = 'TOGGLE_VISIBILITY_FILTER';
export const toggleVisibilityFilter = createAction(TOGGLE_VISIBILITY_FILTER);

export const REMOVE_ALL_TASK_SUCCESS = 'REMOVE_ALL_TASK_SUCCESS';
export const REMOVE_ALL_TASK_ERROR = 'REMOVE_ALL_TASK_ERROR';

export const removeAllTasks = () => (dispatch) => {
  dispatch({ type: 'REMOVE_ALL_TASK_REQUEST' });
  Meteor.call('removeAllTasks', (error, result) => {
    if (error) dispatch({ type: REMOVE_ALL_TASK_ERROR, payload: error });
    else dispatch({ type: REMOVE_ALL_TASK_SUCCESS, payload: result });
  });
};
