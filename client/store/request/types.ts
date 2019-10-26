export interface ErrorObject {
  errored: boolean;
  error: string;
}

interface RequestActions {
  SET_REQUEST: 'request/SET_REQUEST';
}

export const requestActions: RequestActions = {
  SET_REQUEST: 'request/SET_REQUEST'
};

export interface Request {
  type: typeof requestActions.SET_REQUEST;
  requestType: string;
  isPending: boolean;
  errorObject: ErrorObject;
}

export interface RequestState {
  [requestType: string]: Request;
}

export type RequestActionTypes = Request;
