import { SessionState, SessionActionTypes, actions, User } from './types';

const initialState: SessionState = {
  isLoggedIn: null,
  user: {
    email: null,
    token: null,
    username: null,
    role: null,
    isAdmin: false
  }
};

const emptyUser: User = {
  email: null,
  token: null,
  username: null,
  role: null,
  isAdmin: false
};

const reducer = (state = initialState, action: SessionActionTypes): SessionState => {
  switch (action.type) {
    case actions.SIGN_UP:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        user: action.user
      };
    case actions.LOG_IN:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
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
        isLoggedIn: action.isLoggedIn,
        user: action.user || emptyUser
      };
    default:
      return state;
  }
};

export default reducer;
