interface RequestActions {
  SET_REQUEST: string;
}

export const actions: RequestActions = {
  SET_REQUEST: 'SET_REQUEST'
};

interface ErrorObject {
  errored: boolean;
  erorr: string;
}

interface Request {
  type: typeof actions.SET_REQUEST;
  requestType: string;
  isPending: boolean;
  errorObject: ErrorObject;
}

export interface RequestState {
  [requestType: string]: Request;
}

export type RequestActionTypes = Request;
