import { Meteor } from 'meteor/meteor';
import { createAction } from 'redux-actions';
import Tasks from './api/tasks/collection';

export const addTask = (text) => () => {
  Tasks.insert({ text });
};

export const removeTodo = (id) => () => {
  Tasks.remove({ _id: id });
};

export const toggleTodo = id => () => {
  const task = Tasks.findOne(id);

  if (task) {
    Tasks.update({ _id: id }, { $set: { checked: !task.checked } })
  }
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
