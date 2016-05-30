import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import todoApp from './reducers';
import meteorMiddleware from '../lib/meteorMiddleware';

const logger = createLogger();

const store = createStore(
  todoApp,
  applyMiddleware(thunk, promise, logger, meteorMiddleware)
);

export default store;
