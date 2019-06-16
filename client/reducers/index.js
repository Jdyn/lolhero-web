import { combineReducers } from "redux";
import request from "../reducers/request";
import market from "../reducers/market";

export default combineReducers({
  request,
  market
});
