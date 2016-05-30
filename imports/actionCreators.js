import { Meteor } from 'meteor/meteor';
import { createAction } from 'redux-actions';
import Tasks from './api/tasks/collection';

export const ADD_TODO = 'ADD_TODO';
export const addTodo = text => dispatch => {
  dispatch({ type: ADD_TODO, payload: { text } });
  Tasks.insert({ text });
};

export const REMOVE_TODO = 'REMOVE_TODO';
export const removeTodo = id => dispatch => {
  dispatch({ type: REMOVE_TODO, payload: { id } });
  Tasks.remove(id);
};

export const TOGGLE_TODO = 'TOGGLE_TODO';
export const toggleTodo = id => dispatch => {
  dispatch({ type: TOGGLE_TODO, payload: { id } });
  const task = Tasks.findOne(id);

  if (task) {
    Tasks.update({ _id: id }, { $set: { checked: !task.checked } })
  }
};

export const TOGGLE_VISIBILITY_FILTER = 'TOGGLE_VISIBILITY_FILTER';
export const toggleVisibilityFilter = createAction(TOGGLE_VISIBILITY_FILTER);
