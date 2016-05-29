import React from 'react';
import ReactDOM from 'react-dom';
import App from '../imports/components/app.jsx';
import { Provider } from 'react-redux'
import store from '../imports/store';
import Tasks from '../imports/api/tasks/collection';
import { subscribeToCursor } from '../imports/actionCreators';

Meteor.startup(() => {
  store.dispatch(subscribeToCursor(Tasks.find()));

  ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.getElementById('app'));
});
