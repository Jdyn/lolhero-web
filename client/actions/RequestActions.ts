import keyMirror from '../util/keyMirror';
export const actions = keyMirror('SET_REQUEST');

export const setRequest = (
  isPending: boolean,
  requestType: string,
  errorObject?: object
): any => ({
  type: actions.SET_REQUEST,
  requestType,
  isPending,
  errorObject
});
