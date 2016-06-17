import { Meteor } from 'meteor/meteor';
import { createAction } from 'redux-actions';
import { createMeteorAction } from './lib/meteorActions';

export const addTask = createMeteorAction('addTask', (text) => ({ text }));
export const removeTask = createMeteorAction('removeTask', (id) => ({ id }));
export const toggleTask = createMeteorAction('toggleTask', (id) => ({ id }));
export const removeAllTasks = createMeteorAction('removeAllTasks');

// view state actions
export const TOGGLE_VISIBILITY_FILTER = 'TOGGLE_VISIBILITY_FILTER';
export const toggleVisibilityFilter = createAction(TOGGLE_VISIBILITY_FILTER);
