import { combineReducers } from 'redux';
import login from './login';
import table from './table';

export default combineReducers({ login, table });
