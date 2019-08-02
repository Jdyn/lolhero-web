import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";

const isWindow = typeof window !== "undefined";

const composeEnhancers =
  (isWindow && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default initalState =>
  createStore(rootReducer, initalState, composeEnhancers(applyMiddleware(thunk)));
