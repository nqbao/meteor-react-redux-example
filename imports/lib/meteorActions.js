import { Meteor } from 'meteor/meteor';
import { identity } from 'lodash';

export const createMeteorCallAction = (method, transform=identity) => (...args) => (dispatch) => {
  const actionName = `meteor/${method}`;
  const meta = { meteor: true, method };

  Meteor.call(method, transform(...args), (error, payload) => {
    if (error) {
      dispatch({ type: actionName, error: true, payload: error, meta });
    } else {
      dispatch({ type: actionName, payload, meta });
    }
  });
};
