interface SessionActions {
  LOG_IN: string;
  SIGN_UP: string;
  LOG_OUT: string;
  REFRESH: string;
}

export const actions: SessionActions = {
  LOG_IN: 'LOG_IN',
  SIGN_UP: 'SIGN_UP',
  LOG_OUT: 'LOG_OUT',
  REFRESH: 'REFRESH'
};

export interface SessionRequests {
  AUTHENTICATE: 'AUTHENTICATE';
}

export const requests: SessionRequests = {
  AUTHENTICATE: 'AUTHENTICATE'
};

export interface User {
  email: string | null;
  token: string | null;
  username: string | null;
  isAdmin: boolean;
}

export interface SessionState {
  isLoggedIn: boolean;
  user: User;
}

export interface SetLogin {
  type: typeof actions.LOG_IN;
  user: User;
}

export interface SetLogout {
  type: typeof actions.LOG_OUT;
}

export interface SetSignup {
  type: typeof actions.SIGN_UP;
  user: User;
}

export interface SetRefresh {
  type: typeof actions.REFRESH;
  user: User;
}

export type SessionActionTypes = SetLogout | SetLogin | SetSignup | SetRefresh;
