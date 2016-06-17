import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../imports/containers/app.js';
import { Provider } from 'react-redux'
import store from '../imports/store';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Meteor.startup(() => {
  ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.getElementById('app'));
});
