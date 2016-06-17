import { Meteor } from 'meteor/meteor';
import { createAction } from 'redux-actions';
import { createMeteorCallAction } from './lib/meteorActions';
import { TOGGLE_VISIBILITY_FILTER } from './actionTypes';
import { ADD_TASK, REMOVE_TASK, TOGGLE_TASK, REMOVE_ALL_TASKS } from './api/tasks/constants';

export const addTask = createMeteorCallAction(ADD_TASK, (text) => ({ text }));
export const removeTask = createMeteorCallAction(REMOVE_TASK, (id) => ({ id }));
export const toggleTask = createMeteorCallAction(TOGGLE_TASK, (id) => ({ id }));
export const removeAllTasks = createMeteorCallAction(REMOVE_ALL_TASKS);

// view state actions
export const toggleVisibilityFilter = createAction(TOGGLE_VISIBILITY_FILTER);
