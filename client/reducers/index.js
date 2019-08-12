import boost from './BoostReducers';
import request from './RequestReducers';
import session from './SessionReducers';
import account from './AccountReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  account,
  session,
  request,
  boost
});
