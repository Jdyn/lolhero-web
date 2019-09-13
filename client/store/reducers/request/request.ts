import { Reducer } from 'redux';
import { RequestState, RequestActionTypes, actions } from './types';

const initialState = {};

const setRequest = (
  state: RequestState,
  action: RequestActionTypes
): RequestState => {
  const { isPending, requestType, errorObject } = action;
  const requestObject = {};

  requestObject[requestType] = {
    isPending,
    success: !errorObject && !isPending,
    ...(!errorObject ? { errored: false, error: null } : errorObject)
  };

  return { ...state, ...requestObject };
};

const reducer: Reducer<RequestState, RequestActionTypes> = (
  state: RequestState = initialState,
  action: RequestActionTypes
): RequestState => {
  switch (action.type) {
    case actions.SET_REQUEST:
      return setRequest(state, action);
    default:
      return state;
  }
};

export default reducer;
