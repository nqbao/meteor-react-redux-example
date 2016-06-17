import { Meteor } from 'meteor/meteor';
import { createAction } from 'redux-actions';
import { createMeteorCallAction } from './lib/meteorActions';

export const addTask = createMeteorCallAction('addTask', (text) => ({ text }));
export const removeTask = createMeteorCallAction('removeTask', (id) => ({ id }));
export const toggleTask = createMeteorCallAction('toggleTask', (id) => ({ id }));
export const removeAllTasks = createMeteorCallAction('removeAllTasks');

// view state actions
export const TOGGLE_VISIBILITY_FILTER = 'TOGGLE_VISIBILITY_FILTER';
export const toggleVisibilityFilter = createAction(TOGGLE_VISIBILITY_FILTER);
