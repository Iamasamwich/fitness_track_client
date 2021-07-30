import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import pageReducer from './pageReducer';
import sessionReducer from './sessionReducer';
import appStatusReducer from './appStatusReducer';
import fetchReducer from './fetchReducer';

export default combineReducers({
  login: loginReducer,
  page: pageReducer,
  sessions: sessionReducer,
  appStatus: appStatusReducer,
  fetchAll: fetchReducer
});