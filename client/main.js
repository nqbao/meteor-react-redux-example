import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../imports/containers/app.js';
import { Provider } from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import store from '../imports/store';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Meteor.startup(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app'));
});
