import React from 'react';
import ReactDOM from 'react-dom';
import App from '../imports/containers/app.js';
import { Provider } from 'react-redux'
import store from '../imports/store';

Meteor.startup(() => {
  ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.getElementById('app'));
});
