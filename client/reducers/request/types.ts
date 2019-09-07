interface RequestActions {
  SET_REQUEST: string;
}

export const actions: RequestActions = {
  SET_REQUEST: 'SET_REQUEST'
};

export interface ErrorObject {
  errored: boolean;
  error: string;
}

export interface Request {
  type: typeof actions.SET_REQUEST;
  requestType: string;
  isPending: boolean;
  errorObject: ErrorObject;
}

export interface RequestState {
  [requestType: string]: Request;
}

export type RequestActionTypes = Request;
