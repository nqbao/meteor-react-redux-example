import update from 'immutability-helper';
import { METEOR_ITEM_ADDED, METEOR_ITEM_CHANGED, METEOR_ITEM_REMOVED} from './constants';

export const makeCursorReducer = (collection) => (state = [], action) => {
  const payload = action.payload;
  let index;

  // ignore unknown action
  if (!action.meta || action.meta.collection !== collection._name) {
    return state;
  }

  switch (action.type) {
    case METEOR_ITEM_ADDED:
      return state.concat([payload]);

    case METEOR_ITEM_CHANGED:
      index = state.findIndex(item => item._id === payload._id);

      return update(state, {
        [index]: {
          $set: payload
        }
      });

    case METEOR_ITEM_REMOVED:
      index = state.findIndex(item => item._id === payload._id);
      return update(state, {
        $splice: [[index, 1]]
      });

    default:
      return state
  }
};
