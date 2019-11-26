import cookie from 'js-cookie';
import Router from 'next/router';
import Api from '../../services/api';
import { setRequest } from '../request/actions';
import { AppState } from '..';
import { actions, requests, User, SessionActionTypes } from './types';

const setCurrentSession = (user: { token: string }): void => {
  if (user.token) {
    const jsonToken = user.token;
    cookie.set('token', jsonToken, { expires: 7 });
  }
};

const setLogin = (user: User): SessionActionTypes => ({
  type: actions.LOG_IN,
  isLoggedIn: true,
  user
});

const login = (form: object): ((dispatch: Function, getState: () => AppState) => void) => (
  dispatch,
  getState
): void => {
  const requestType = requests.AUTHENTICATE;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  Api.post('/session', form)
    .then((response): void => {
      const { ok, result } = response;

      if (ok) {
        const { user } = result;
        setCurrentSession(user);
        dispatch(setLogin(user));
        dispatch(setRequest(false, requestType));
      } else {
        const error = 'An Error has occurred logging in. Please try again.';
        const message = response.error || error;
        dispatch(setRequest(false, requestType, message));
      }
    })
    .catch((): void => {
      dispatch(setRequest(false, requestType, 'Error connecting to server. Try again later.'));
    });
};

const setLogout = (): SessionActionTypes => ({
  type: actions.LOG_OUT
});

const logout = (): ((dispatch: Function, getState: () => AppState) => void) => (
  dispatch,
  getState
): void => {
  const requestType = requests.AUTHENTICATE;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  Api.delete('/session')
    .then((): void => {
      dispatch(setRequest(false, requestType));
      dispatch(setLogout());
      cookie.remove('token');
      window.localStorage.setItem('logout', JSON.stringify(Date.now()));
      Router.push('/');
    })
    .catch((): void => {
      dispatch(setRequest(false, requestType, ''));
      dispatch(setLogout());
      cookie.remove('token');
      window.localStorage.setItem('logout', JSON.stringify(Date.now()));
      Router.push('/');
    });
};

const setSignup = (user: User): SessionActionTypes => ({
  type: actions.SIGN_UP,
  isLoggedIn: true,
  user
});

const signup = (form: object): ((dispatch: Function, getState: () => AppState) => void) => (
  dispatch,
  getState
): void => {
  const requestType = requests.AUTHENTICATE;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  Api.post('/users', form)
    .then((response): void => {
      if (response.ok) {
        const { user } = response.result;
        setCurrentSession(user);
        dispatch(setSignup(user));
        dispatch(setRequest(false, requestType));
      } else {
        const { errors } = response;

        // Fix this
        dispatch(setRequest(false, requestType, errors));
      }
    })
    .catch((): void => {
      dispatch(setRequest(false, requestType, 'An error has occurred. Try again later.'));
    });
};

export const handleAuth = (type: string, form: object): ((dispatch: Function) => void) => (
  dispatch
): void => {
  switch (type) {
    case 'login':
      dispatch(login(form));
      break;
    case 'logout':
      dispatch(logout());
      break;
    case 'signup':
      dispatch(signup(form));
      break;
    default:
      break;
  }
};

const setRefresh = (user: User | null, isLoggedIn: boolean): SessionActionTypes => ({
  type: actions.REFRESH,
  isLoggedIn,
  user
});

export const authenticate = (): ((dispatch: Function, getState: () => AppState) => void) => (
  dispatch,
  getState
): void => {
  const requestType = requests.AUTHENTICATE;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  Api.fetch('/session')
    .then((response): void => {
      if (response.ok) {
        const { user } = response.result;
        setCurrentSession(user);

        dispatch(setRefresh(user, true));
        dispatch(setRequest(false, requestType));
      } else {
        cookie.remove('token');

        dispatch(setRefresh(null, false));
        dispatch(setRequest(false, requestType));
      }
    })
    .catch((): void => {
      cookie.remove('token');

      dispatch(setRefresh(null, false));
      dispatch(setRequest(false, requestType));
    });
};

export const clearSessionErrors = (): object => ({
  type: 'CLEAR_SESSION_ERRORS',
  payload: {
    message: '',
    errors: {},
    errored: false
  }
});
