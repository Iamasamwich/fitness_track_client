import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import pageReducer from './pageReducer';
import sessionReducer from './sessionReducer';

export default combineReducers({
  login: loginReducer,
  page: pageReducer,
  sessions: sessionReducer
});