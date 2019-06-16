import { actions } from "../../actions/RequestActions";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_REQUEST_IN_PROCESS:
      return setRequestInProcess(state, action);
    default:
      return state;
  }
};

const setRequestInProcess = (state, action) => {
  const { inProcess, requestType, errorObject } = action;
  const requestObject = {};

  requestObject[requestType] = {
    isPending: inProcess,
    success: !errorObject && !inProcess ? true : false,
    ...(!errorObject ? { errored: false, error: null } : errorObject)
  };

  return { ...state, ...requestObject };
};
