import { combineReducers } from 'redux';
import { makeCursorReducer } from '../lib/cursorReducer';
import Tasks from '../api/tasks/collection';
import { TOGGLE_VISIBILITY_FILTER } from '../actionCreators';

const todos = makeCursorReducer(Tasks);

function visibilityFilter(state = 'ALL', action) {
  switch (action.type) {
    case TOGGLE_VISIBILITY_FILTER:
      return state === 'NONE' ? 'ALL' : 'NONE';
    default:
      return state;
  }
}

const todoApps = combineReducers({
  visibilityFilter,
  todos
});

export default todoApps;
