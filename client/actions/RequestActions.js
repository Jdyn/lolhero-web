import keyMirror from "../util/keyMirror";

export const actions = keyMirror("SET_REQUEST_IN_PROCESS");

export const setRequestInProcess = (inProcess, requestType, errorObject) => ({
  type: actions.SET_REQUEST_IN_PROCESS,
  requestType,
	inProcess,
	errorObject
});
