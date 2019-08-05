import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
// import dropin from "braintree-web-drop-in";
import Button from "../../Shared/Button";
import Form from "../../Shared/Form";

const propTypes = {};

const templates = {
  signup: {
    type: "signup",
    title: "New Account",
    fields: ["email", "username", "password"],
    submit: "sign up"
  },
  login: {
    type: "login",
    title: "Existing Account",
    fields: ["username", "password"],
    submit: "log in"
  }
};

const NewView = props => {
  const { session, handleAuth, setForm, form } = props;
  const classes = useStyes();

  const [type, setType] = useState(null);

  return (
    <>
      <div className={classes.wrapper}>
        {session.isLoggedIn ? (
          <div className={classes.session}>
            You are currently logged in as <b>{session.user.username}</b>.
          </div>
        ) : (
          <>
            <Button
              secondary
              margin="0 0 10px 0"
              onClick={() => setType(prev => (prev === "login" ? null : "login"))}
            >
              {type === "login" ? "back" : "log in  "}
            </Button>
            <Button onClick={() => setType(prev => (prev === "signup" ? null : "signup"))}>
              {type === "signup" ? "back" : "create account"}
            </Button>
            {type && (
              <Form template={templates[type]} onSubmit={(form, type) => handleAuth(form, type)} />
            )}
            {!type && (
              <div className={classes.authWrapper}>
                <b>or</b>
                <span>Email Address</span>
                <input
                  className={classes.input}
                  value={form["email"] || ""}
                  type="email"
                  onChange={event => setForm(prev => ({ ...prev, email: event.target.value }))}
                />
                <span>Confirm Email Adress</span>
                <input
                  className={classes.input}
                  value={form["email_confirmation"] || ""}
                  type="email"
                  onChange={event =>
                    setForm(prev => ({ ...prev, email_confirmation: event.target.value }))
                  }
                />
              </div>
            )}
          </>
        )}
      </div>
      <div className={classes.wrapper}>
        <div id="dropin-container" />
      </div>
    </>
  );
};

const useStyes = createUseStyles(theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.tertiary,
    borderRadius: 12,
    padding: "25px",
    boxShadow: "0 0 15px 0 rgba(0,0,0,.2)",
    margin: "10px 10px 20px 10px"
  },
  authWrapper: {
    display: "flex",
    flexDirection: "column",
    "& b": {
      margin: "10px 0",
      textAlign: "center"
    }
  },
  form: {
    display: "flex",
    flexDirection: "column",
    color: theme.white
  },
  group: {
    display: "flex",
    flexDirection: "row"
  },
  session: {
    "& b": {
      color: theme.accent
    }
  },
  input: {
    outline: "none",
    border: "none",
    borderRadius: 8,
    margin: "10px 0",
    padding: "10px",
    backgroundColor: theme.primary,
    color: theme.white
  }
}));

NewView.propTypes = propTypes;

export default NewView;
