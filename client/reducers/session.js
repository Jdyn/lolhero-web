import { actions } from "../actions/SessionActions";

const initialState = {
  isLoggedIn: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.user
      };
    default:
      return state;
  }
};
