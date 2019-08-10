import cookie from 'js-cookie';
import Api from '../services/api';
import keyMirror from '../util/keyMirror';
import { setRequestInProcess } from './RequestActions';
import Router from 'next/router';

export const actions = keyMirror('LOG_IN', 'SIGN_UP', 'LOG_OUT', 'REFRESH');
export const requests = keyMirror('AUTHENTICATE');

const setCurrentSession = user => {
  if (user.token) {
    const jsonToken = user.token;
    cookie.set('token', jsonToken, { expires: 7 });
  }
};

const setLogin = user => ({
  type: actions.LOG_IN,
  user
});

const login = form => (dispatch, getState) => {
  const requestType = requests.AUTHENTICATE;
  const requestInProcess = getState().request[requestType] || {};

  if (requestInProcess.isPending) return;

  dispatch(setRequestInProcess(true, requestType));

  Api.post('/session', form)
    .then(response => {
      const { ok, result } = response;

      if (ok) {
        const { user } = result;
        setCurrentSession(user);
        dispatch(setLogin(user));
        dispatch(setRequestInProcess(false, requestType));
      } else {
        const message = 'An Error has occurred logging in. Please try again.';
        const error = response.error || message;
        dispatch(
          setRequestInProcess(false, requestType, {
            errored: true,
            error
          })
        );
      }
    })
    .catch(() => {
      dispatch(
        setRequestInProcess(false, requestType, {
          errored: true,
          error: 'Error connecting to server. Try again later.'
        })
      );
    });
};

const setLogout = () => ({
  type: actions.LOG_OUT
});

const logout = () => (dispatch, getState) => {
  const requestType = requests.AUTHENTICATE;
  const requestInProcess = getState().request[requestType] || {};

  if (requestInProcess.isPending) return;

  dispatch(setRequestInProcess(true, requestType));

  Api.delete('/session')
    .then(() => {
      dispatch(setRequestInProcess(false, requestType));
      dispatch(setLogout());
      cookie.remove('token');
      window.localStorage.setItem('logout', Date.now());
      Router.push('/');
    })
    .catch(() => {
      dispatch(setRequestInProcess(false, requestType, { errored: true, error: '' }));
      dispatch(setLogout());
      cookie.remove('token');
      window.localStorage.setItem('logout', Date.now());
      Router.push('/');
    });
};

const setSignup = user => ({
  type: actions.SIGN_UP,
  user
});

const signup = form => (dispatch, getState) => {
  const requestType = requests.AUTHENTICATE;
  const requestInProcess = getState().request[requestType] || {};

  if (requestInProcess.isPending) return;

  dispatch(setRequestInProcess(true, requestType));

  Api.post('/users', form)
    .then(response => {
      if (response.ok) {
        const { user } = response.result;
        setCurrentSession(user);
        dispatch(setSignup(user));
        dispatch(setRequestInProcess(false, requestType));
      } else {
        const { errors } = response;

        dispatch(
          setRequestInProcess(false, requestType, {
            errored: true,
            error: errors || {}
          })
        );
      }
    })
    .catch(error => {
      console.log('ERROR', error);
      dispatch(
        setRequestInProcess(false, requestType, {
          errored: true,
          error: 'An error has occurred. Try again later.'
        })
      );
    });
};

export const handleAuth = (form, type) => dispatch => {
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

const setRefresh = update => ({
  type: actions.REFRESH,
  update
});

export const authenticate = givenToken => (dispatch, getState) => {
  const requestType = requests.AUTHENTICATE;
  const requestInProcess = getState().request[requestType] || {};

  if (requestInProcess.isPending) return;

  dispatch(setRequestInProcess(true, requestType));

  Api.fetch('/session/refresh')
    .then(response => {
      if (response.ok) {
        const { user } = response.result;
        setCurrentSession(user);

        const update = {
          isLoggedIn: true,
          user
        };

        dispatch(setRefresh(update));
        dispatch(setRequestInProcess(false, requestType));
      } else {
        cookie.remove('token');

        const update = {
          isLoggedIn: false,
          user: {}
        };

        dispatch(setRefresh(update));
        dispatch(setRequestInProcess(false, requestType));
      }
    })
    .catch(() => {
      cookie.remove('token');

      const update = {
        isLoggedIn: false,
        user: {}
      };

      dispatch(setRefresh(update));
      dispatch(setRequestInProcess(false, requestType));
    });
};

export const clearSessionErrors = () => ({
  type: 'CLEAR_SESSION_ERRORS',
  payload: {
    error: '',
    errors: {},
    errored: false
  }
});
