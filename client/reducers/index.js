import { combineReducers } from "redux";
import request from "./request";
import boost from "./boost";

export default combineReducers({
  request,
  boost
});
