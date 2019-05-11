import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";

const isWindow = typeof window !== "undefined";

export default initalState => {
  const composeEnhancers = isWindow && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(rootReducer, initalState, composeEnhancers(applyMiddleware(thunk)));
};
