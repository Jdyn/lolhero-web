import { combineReducers } from 'redux';
import boost from './BoostReducers';
import request from './RequestReducers';
import session from './session/session';
import account from './account';

const root = combineReducers({
  account,
  session,
  request,
  boost
});

export type AppState = ReturnType<typeof root>;

export default root;
