import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer/root';
import thunk from 'redux-thunk';

const createLogger = require('redux-logger').createLogger;
const logger = createLogger({ collapsed: true });

// 设置调试工具
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

// 设置中间件
const enhancer = composeEnhancers(applyMiddleware(thunk, logger));

// Create store
const store = createStore(reducer, enhancer);

export default store;
