import Api from "../services/api";
import keyMirror from "../util/keyMirror";
import { setRequestInProcess } from "./RequestActions";

export const actions = keyMirror("SET_BOOSTS");

export const requests = keyMirror("BOOSTS");

const setBoosts = boosts => ({
    type: actions.SET_BOOSTS,
    boosts
})

export const fetchBoosts = () => (dispatch, getState) => {
  const requestType = requests.BOOSTS;
  const requestIsInProcess = getState().request[requestType];

  if (requestIsInProcess) return;

  dispatch(setRequestInProcess(true, requestType));

  Api.fetch("/categories").then(response => {
    if (response.ok) {
        dispatch(setBoosts(response.result.categories))
      dispatch(setRequestInProcess(false, requestType));
    } else {
      dispatch(
        setRequestInProcess(false, requestType, {
          errored: true,
          error: "Failed to Fetch"
        })
      );
    }
  });
};
