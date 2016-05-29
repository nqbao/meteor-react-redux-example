import { createSelector } from 'reselect';

const getVisibleFilter = state => state.visibilityFilter;
const getTodos = state => state.todos;

export const getVisibleTodos = createSelector(
  getTodos,
  getVisibleFilter,
  (todos, visibility) => todos.filter(todo => visibility === 'ALL' || !todo.checked)
);
