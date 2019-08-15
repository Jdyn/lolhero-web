import keyMirror from '../../util/keyMirror';

interface Actions {
  LOG_IN: string;
  SIGN_UP: string;
  LOG_OUT: string;
  REFRESH: string;
}

export const actions: Actions = {
  LOG_IN: 'LOG_IN',
  SIGN_UP: 'SIGN_UP',
  LOG_OUT: 'LOG_OUT',
  REFRESH: 'REFRESH'
};

export const requests = keyMirror('AUTHENTICATE');

export interface User {
  email: string | null;
  token: string | null;
  username: string | null;
}

export interface SessionState {
  isLoggedIn: boolean;
  user: User;
}

interface SetLogin {
  type: typeof actions.LOG_IN;
  user: User;
  isLoggedIn: never;
}

interface SetLogout {
  type: typeof actions.LOG_OUT;
  user: never;
  isLoggedIn: never;
}

interface SetSignup {
  type: typeof actions.SIGN_UP;
  user: never;
  isLoggedIn: never;
}

interface SetRefresh {
  type: typeof actions.REFRESH;
  user: User;
  isLoggedIn: boolean;
}

export type SessionActionTypes = SetLogout | SetLogin | SetSignup | SetRefresh;
