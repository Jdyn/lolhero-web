import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const propTypes = {};

const templates = {
  login: {
    type: "log in",
    title: "Existing Account",
    fields: ["username", "password"]
  },
  signup: {
    type: "sign up",
    title: "New Account",
    fields: ["email", "username", "password"]
  }
};

const AuthModal = props => {
  const { type, handleAuth } = props;

  const classes = useStyles(props);

  const [form, setForm] = useState({});

  const submitForm = event => {
    event.preventDefault()
    handleAuth(form, type);
  };

  return (
    <div className={classes.root} style={{ display: props.isOpen ? "flex" : "none" }}>
      {type && (
        <form className={classes.form} onSubmit={submitForm}>
          <h3>{templates[type].title}</h3>
          {templates[type].fields.map((field, index) => (
            <React.Fragment key={index}>
              <span>{field}</span>
              <input
                className={classes.input}
                value={form[field] || ""}
                type={field}
                onChange={event => setForm({ ...form, [field]: event.target.value })}
              />
            </React.Fragment>
          ))}

          <button type="submit" className={classes.button}>
            {templates[type].type}
          </button>
        </form>
      )}
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  root: props => ({
    width: "100%",
    padding: "25px",
    position: "relative",
    gridArea: "modal",
    boxShadow: "0px 0px 20px 0px rgba(0,0,0,.4)",
    borderRadius: "0px 0px 12px 12px",
    flexDirection: "column",
    backgroundColor: theme.tertiary,
    transitionDuration: ".2s",
    "& span": {
      color: theme.white
    },
    "& h3": {
      color: theme.white
    }
  }),
  form: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    outline: "none",
    border: "none",
    borderRadius: 8,
    height: "30px",
    margin: "10px 0",
    padding: "10px",
    backgroundColor: theme.primary,
    color: theme.white
  },
  button: {
    outline: "none",
    border: "none",
    borderRadius: 8,
    backgroundColor: theme.accent,
    fontWeight: "600",
    color: theme.white,
    textTransform: "uppercase",
    marginTop: "10px",
    padding: "10px"
  }
}));

AuthModal.propTypes = propTypes;

export default AuthModal;
