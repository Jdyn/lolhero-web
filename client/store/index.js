import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const isWindow = typeof window !== 'undefined';

const composeEnhancers = (isWindow && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default initalState =>
  createStore(rootReducer, initalState, composeEnhancers(applyMiddleware(thunk)));
