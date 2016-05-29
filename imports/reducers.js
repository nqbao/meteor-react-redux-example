import { combineReducers } from 'redux';
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, TOGGLE_VISIBILITY_FILTER } from './actionCreators';
import update from 'immutability-helper';

function todos(state = [], action) {
  const payload = action.payload;
  let index;

  switch (action.type) {
    case REMOVE_TODO:
      index = state.findIndex(todo => todo.id === payload.id);

      return update(state, {
        $splice: [[index, 1]]
      });
    case ADD_TODO:
      return state.concat([ {...action.payload} ])
    case TOGGLE_TODO:
      index = state.findIndex(todo => todo.id === payload.id);

      if (index !== -1) {
        return update(state, {
          [index]: {
            checked: { $set: !state[index].checked }
          }
        });
      }

      return state;
    default:
      return state
  }
}

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