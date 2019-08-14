import { actions } from '../actions/RequestActions';

const initialState = {};

const setRequest = (state, action) => {
  const { isPending, requestType, errorObject } = action;
  const requestObject = {};

  requestObject[requestType] = {
    isPending,
    success: !!(!errorObject && !isPending),
    ...(!errorObject ? { errored: false, error: null } : errorObject)
  };

  return { ...state, ...requestObject };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_REQUEST:
      return setRequest(state, action);
    default:
      return state;
  }
};
