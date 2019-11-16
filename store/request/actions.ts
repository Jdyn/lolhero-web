import { ErrorObject, Request, requestActions } from './types';

export const setRequest = (
  isPending: boolean,
  requestType: string,
  error?: ErrorObject
): Request => ({
  type: requestActions.SET_REQUEST,
  requestType,
  isPending,
  error
});
