import { combineReducers } from 'redux';
import boost from './BoostReducers';
import request from './request';
import session from './session';
import account from './account';

const root = combineReducers({
  account,
  session,
  request,
  boost
});

export type AppState = ReturnType<typeof root>;

export default root;
