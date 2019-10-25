import { SessionState, SessionActionTypes, actions } from './types';

const initialState: SessionState = {
  isLoggedIn: null,
  user: {
    email: null,
    token: null,
    username: null,
    isAdmin: false
  }
};

const emptyUser = {
  email: null,
  token: null,
  username: null,
  isAdmin: false
};

const reducer = (state = initialState, action: SessionActionTypes): SessionState => {
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
        user: emptyUser
      };
    case actions.REFRESH:
      return {
        ...state,
        isLoggedIn: true,
        user: action.user
      };
    default:
      return state;
  }
};

export default reducer;
