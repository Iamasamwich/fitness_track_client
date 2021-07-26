import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import pageReducer from './pageReducer';
import sessionReducer from './sessionReducer';
import appStatusReducer from './appStatusReducer';

export default combineReducers({
  login: loginReducer,
  page: pageReducer,
  sessions: sessionReducer,
  appStatus: appStatusReducer
});