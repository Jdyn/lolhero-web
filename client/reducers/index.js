import boost from "./boost";
import request from "./request";
import session from "./session";
import { combineReducers } from "redux";

export default combineReducers({
  session,
  request,
  boost
});
