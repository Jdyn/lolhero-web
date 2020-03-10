import {
  configureStore,
  getDefaultMiddleware,
  EnhancedStore,
  combineReducers
} from '@reduxjs/toolkit';

import boost from './boost/reducers';
import request from './request/reducers';
import session from './session/reducers';
import account from './account/reducers';

export const reducer = combineReducers({
  account,
  session,
  request,
  boost
});

const store = (preloadedState: object = {}): EnhancedStore =>
  configureStore({
    reducer,
    middleware: [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState
  });

export type AppState = ReturnType<typeof reducer>;

export default store;
