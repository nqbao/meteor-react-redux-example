import { combineReducers } from 'redux';
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, TOGGLE_VISIBILITY_FILTER } from '../actionCreators';
import update from 'immutability-helper';

function todos(state = [], action) {
  const payload = action.payload;
  let index;

  switch (action.type) {
    case 'METEOR_ITEM_ADDED':
      // TODO: make sure this is my collection by checking meta
      return state.concat([ payload ]);

    case 'METEOR_ITEM_CHANGED':
      // TODO: make sure this is my collection by checking meta
      index = state.findIndex(todo => todo._id === payload._id);

      return update(state, {
        [index]: {
          $set: payload
        }
      });

    case 'METEOR_ITEM_REMOVED':
      // TODO: make sure this is my collection by checking meta
      index = state.findIndex(todo => todo._id === payload._id);
      return update(state, {
        $splice: [[index, 1]]
      });

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