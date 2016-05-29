import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import todoApp from './reducers';

const logger = createLogger();

const store = createStore(
  todoApp,
  applyMiddleware(thunk, promise, logger)
);

export default store;
