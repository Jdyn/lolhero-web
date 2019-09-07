import cookie from 'js-cookie';
import Router from 'next/router';
import Api from '../services/api';
import { setRequest } from './RequestActions';
import { AppState } from '../reducers';
import {
  actions,
  requests,
  SessionActionTypes,
  User
} from '../reducers/session/types';

const setCurrentSession = (user: { token: string }): void => {
  if (user.token) {
    const jsonToken = user.token;
    cookie.set('token', jsonToken, { expires: 7 });
  }
};

const setLogin = (user: User): SessionActionTypes => ({
  type: actions.LOG_IN,
  user
});

const login = (
  form: object
): ((dispatch: Function, getState: () => AppState) => void) => (
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
        const message = 'An Error has occurred logging in. Please try again.';
        const error = response.error || message;
        dispatch(
          setRequest(false, requestType, {
            errored: true,
            error
          })
        );
      }
    })
    .catch((): void => {
      dispatch(
        setRequest(false, requestType, {
          errored: true,
          error: 'Error connecting to server. Try again later.'
        })
      );
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
      dispatch(setRequest(false, requestType, { errored: true, error: '' }));
      dispatch(setLogout());
      cookie.remove('token');
      window.localStorage.setItem('logout', JSON.stringify(Date.now()));
      Router.push('/');
    });
};

const setSignup = (user: User): SessionActionTypes => ({
  type: actions.SIGN_UP,
  user
});

const signup = (form: object): Function => (
  dispatch: Function,
  getState: () => AppState
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

        dispatch(
          setRequest(false, requestType, {
            errored: true,
            error: errors || {}
          })
        );
      }
    })
    .catch((): void => {
      dispatch(
        setRequest(false, requestType, {
          errored: true,
          error: 'An error has occurred. Try again later.'
        })
      );
    });
};

export const handleAuth = (
  type: string,
  form: object
): ((dispatch: Function) => void) => (dispatch): void => {
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

const setRefresh = (update: {
  user: User;
  isLoggedIn: boolean;
}): SessionActionTypes => ({
  type: actions.REFRESH,
  user: update.user,
  isLoggedIn: update.isLoggedIn
});

export const authenticate = (): ((
  dispatch: Function,
  getState: () => AppState
) => void) => (dispatch, getState): void => {
  const requestType = requests.AUTHENTICATE;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  Api.fetch('/session')
    .then((response): void => {
      if (response.ok) {
        const { user } = response.result;
        setCurrentSession(user);

        const payload = {
          isLoggedIn: true,
          user
        };

        dispatch(setRefresh(payload));
        dispatch(setRequest(false, requestType));
      } else {
        cookie.remove('token');

        const payload = {
          isLoggedIn: false,
          user: {
            email: null,
            token: null,
            username: null
          }
        };

        dispatch(setRefresh(payload));
        dispatch(setRequest(false, requestType));
      }
    })
    .catch((): void => {
      cookie.remove('token');

      const update = {
        isLoggedIn: false,
        user: {
          email: null,
          token: null,
          username: null
        }
      };

      dispatch(setRefresh(update));
      dispatch(setRequest(false, requestType));
    });
};

export const clearSessionErrors = (): object => ({
  type: 'CLEAR_SESSION_ERRORS',
  payload: {
    error: '',
    errors: {},
    errored: false
  }
});
