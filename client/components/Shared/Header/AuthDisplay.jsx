import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import AuthModal from "./AuthModal";

const propTypes = {};

const AuthDisplay = props => {
  const { handleAuth, session } = props;
  const classes = useStyes();

  const [type, setType] = useState(null);
  const [isOpen, setOpen] = useState(false);

  const modalRef = useRef();

  const updateModal = newType => {
    if (isOpen) {
      if (newType === type) {
        setOpen(false);
        setType(null);
      } else {
        setType(newType);
      }
    } else {
      setOpen(true);
      setType(newType);
    }
  };

  useEffect(() => {
    const handleClickOutside = e => {
      if (!modalRef.current.contains(e.target)) {
        document.removeEventListener("mousedown", handleClickOutside);
        setOpen(false);
        setType(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return session.isLoggedIn ? (
    <div />
  ) : (
    <div
      className={classes.container}
      ref={modalRef}
      style={{
        display: "grid",
        gridTemplateRows: "79px 1fr",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateAreas: ` 
            'login signup'
            'modal modal'
            `
      }}
    >
      <button
        className={classes.button}
        style={{ gridArea: "signup" }}
        onClick={() => updateModal("signup")}
      >
        sign up
      </button>
      <button
        className={classes.button}
        style={{ gridArea: "login" }}
        onClick={() => updateModal("login")}
      >
        log in
      </button>
      <AuthModal isOpen={isOpen} type={type} handleAuth={handleAuth} />
    </div>
  );
};

const useStyes = createUseStyles(theme => ({
  container: {
    margin: "-20px 0 -22px 0",
    position: "relative",
    height: "auto"
  },
  button: {
    display: "flex",
    outline: "none",
    border: "none",
    position: "relative",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 16,
    height: "100%",
    padding: "0px 30px",
    textTransform: "uppercase",
    color: theme.grey,
    backgroundColor: theme.tertiary,
    borderBottom: "2px solid #999",
    transitionDuration: ".2s",
    "&:hover": {
      color: theme.accent,
      borderBottom: `2px solid ${theme.accent}`
    }
  }
}));

AuthDisplay.propTypes = propTypes;

export default AuthDisplay;
