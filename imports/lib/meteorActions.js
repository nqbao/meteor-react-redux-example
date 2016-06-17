import { Meteor } from 'meteor/meteor';
import { identity } from 'lodash';

export const createMeteorAction = (method, transform=identity) => (...args) => (dispatch) => {
  const actionName = `meteor/${method}`;

  Meteor.call(method, transform(...args), (error, payload) => {
    if (error) {
      dispatch({ type: actionName, error: true, payload });
    } else {
      dispatch({ type: actionName, payload });
    }
  });
};
