import {
  configureStore,
  getDefaultMiddleware,
  EnhancedStore,
  combineReducers
} from '@reduxjs/toolkit';

import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import boost from './boost/reducers';
import request from './request/reducers';
import session from './session/reducers';
import account from './account/reducers';

const appReducer = combineReducers({
  account,
  session,
  request,
  boost
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload // apply delta from hydration
    };
    // if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  }

  return appReducer(state, action);
};

const store = (preloadedState: object = {}): EnhancedStore =>
  configureStore({
    reducer,
    middleware: [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState
  });

export type AppState = ReturnType<typeof appReducer>;

export const wrapper = createWrapper(store, { debug: true });

export default store;
