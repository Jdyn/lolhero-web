import keyMirror from '../../util/keyMirror';
import { ErrorObject, Request, requestActions } from './types';

export const setRequest = (
  isPending: boolean,
  requestType: string,
  errorObject?: ErrorObject
): Request => ({
  type: requestActions.SET_REQUEST,
  requestType,
  isPending,
  errorObject
});
