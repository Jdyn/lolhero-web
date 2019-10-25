import keyMirror from '../../util/keyMirror';
import { ErrorObject, Request } from './types';

export const actions = keyMirror('SET_REQUEST');

export const setRequest = (
  isPending: boolean,
  requestType: string,
  errorObject?: ErrorObject
): Request => ({
  type: actions.SET_REQUEST,
  requestType,
  isPending,
  errorObject
});
