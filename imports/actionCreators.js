import { Meteor } from 'meteor/meteor';
import { createAction } from 'redux-actions';
import Tasks from './api/tasks/collection';

const createMeteorAction = (type, payloadTransfomer, meteorMeta) => (...args) => dispatch => {
  dispatch({
    type,
    payload: payloadTransfomer ? payloadTransfomer(...args) : args[0],
    meta: {
      meteor: meteorMeta
    }
  });
};

const createCollectionAction = (collection, type, payloadTransfomer) =>
  createMeteorAction(type, payloadTransfomer, {
    collection: typeof collection === 'object' ? collection._name : collection
  });

export const ADD_TODO = 'ADD_TODO';
export const addTodo = createCollectionAction(Tasks, ADD_TODO, (text) => ({ text }));

export const REMOVE_TODO = 'REMOVE_TODO';
export const removeTodo = createCollectionAction(Tasks, REMOVE_TODO);

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
