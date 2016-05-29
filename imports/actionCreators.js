import { createAction } from 'redux-actions';

let nextTodoId = 0;

export const ADD_TODO = 'ADD_TODO';
export const addTodo = createAction(ADD_TODO, text => ({ text, id: nextTodoId++ }));

export const REMOVE_TODO = 'REMOVE_TODO';
export const removeTodo = createAction(REMOVE_TODO, id => ({ id }));

export const TOGGLE_TODO = 'TOGGLE_TODO';
export const toggleTodo = createAction(TOGGLE_TODO, id => ({ id }));

export const TOGGLE_VISIBILITY_FILTER = 'TOGGLE_VISIBILITY_FILTER';
export const toggleVisibilityFilter = createAction(TOGGLE_VISIBILITY_FILTER);
