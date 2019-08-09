import { actions } from '../actions/SessionActions';

const initialState = {
  isLoggedIn: null,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGN_UP:
      return {
        ...state,
        isLoggedIn: true,
        user: action.user
      };
    case actions.LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.user
      };
    case actions.LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: {}
      };
    case actions.REFRESH:
      return {
        ...state,
        isLoggedIn: action.update.isLoggedIn,
        user: action.update.user
      };
    default:
      return state;
  }
};
