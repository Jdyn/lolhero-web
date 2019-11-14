import { combineReducers } from 'redux';
import boost from './boost/reducers';
import request from './request/reducers';
import session from './session/reducers';
import account from './account/reducers';

const root = combineReducers({
  account,
  session,
  request,
  boost
});

export type AppState = ReturnType<typeof root>;

export default root;
