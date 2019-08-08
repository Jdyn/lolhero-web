import Api from "../services/api";
import keyMirror from "../util/keyMirror";
import { setRequestInProcess } from "./RequestActions";

export const actions = keyMirror("LOG_IN", "SIGN_UP", "LOG_OUT");
export const requests = keyMirror("AUTHENTICATE");

export const handleAuth = (form, type) => dispatch => {
  switch (type) {
    case "login":
      dispatch(login(form));
      break;
    case "logout":
      dispatch(logout());
      break;
    case "signup":
      dispatch(signup(form));
      break;
    default:
      break;
  }
};

const setSignup = user => ({
  type: actions.SIGN_UP,
  user
});

const setLogin = user => ({
  type: actions.LOG_IN,
  user
});

const setLogout = () => ({
  type: actions.LOG_OUT
});

const login = form => (dispatch, getState) => {
  const requestType = requests.AUTHENTICATE;
  const requestInProcess = getState().request[requestType] || {};

  if (requestInProcess.isPending) return;

  dispatch(setRequestInProcess(true, requestType));

  Api.post("/session", form)
    .then(response => {
      const { ok, result } = response;

      if (ok) {
        const { user } = result;
        setCurrentSession(user);
        dispatch(setLogin(user));
        dispatch(setRequestInProcess(false, requestType));
      } else {
        const message = "An Error has occurred logging in. Please try again.";
        const error = response.error || message;
        dispatch(
          setRequestInProcess(false, requestType, {
            errored: true,
            error
          })
        );
      }
    })
    .catch(error => {
      dispatch(
        setRequestInProcess(false, requestType, {
          errored: true,
          error: "Error connecting to server. Try again later."
        })
      );
    });
};

const logout = () => (dispatch, getState) => {
  const requestType = requests.AUTHENTICATE;
  const requestInProcess = getState().request[requestType] || {};

  if (requestInProcess.isPending) return;

  dispatch(setRequestInProcess(true, requestType));

  Api.delete("/session")
    .then(() => {
      dispatch(setRequestInProcess(false, requestType));
      dispatch(setLogout());
      localStorage.removeItem("token");
    })
    .catch(() => {
      dispatch(setRequestInProcess(false, requestType, { errored: true, error: "" }));
      dispatch(setLogout());
      localStorage.removeItem("token");
    });
};

const signup = form => (dispatch, getState) => {
  const requestType = requests.AUTHENTICATE;
  const requestInProcess = getState().request[requestType] || {};

  if (requestInProcess.isPending) return;

  dispatch(setRequestInProcess(true, requestType));

  Api.post("/users", form)
    .then(response => {
      console.log(response);
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
      console.log("ERROR", error);
      dispatch(
        setRequestInProcess(false, requestType, {
          errored: true,
          error: "An error has occurred. Try again later."
        })
      );
    });
};

const authenticate = () => dispatch => {
  dispatch({ type: actions.AUTHENTICATION_REQUEST });
  Api.fetch("/refresh")
    .then(response => {
      if (response.ok) {
        if (response.result.token) {
          const jsonToken = response.result.token;
          localStorage.setItem("token", JSON.stringify(jsonToken));
        }
        dispatch({
          type: actions.AUTHENTICATION_SUCCESS,
          response
        });
      } else {
        localStorage.removeItem("token");
        dispatch({
          type: actions.AUTHENTICATION_FAILURE,
          response: { error: "invalid token" }
        });
      }
    })
    .catch(error => {
      localStorage.removeItem("token");
      dispatch({
        type: actions.AUTHENTICATION_FAILURE,
        response: { error: "Error Connecting to server" }
      });
    });
};

export const clearSessionErrors = () => ({
  type: "CLEAR_SESSION_ERRORS",
  payload: {
    error: "",
    errors: {},
    errored: false
  }
});

const setCurrentSession = user => {
  if (user.token) {
    const jsonToken = user.token;
    localStorage.setItem("token", JSON.stringify(jsonToken));
  }
};
