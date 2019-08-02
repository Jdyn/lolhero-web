import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import Link from "next/link";
import AuthModal from "./AuthModal";

const propTypes = {};

const Header = props => {
  const { handleAuth, session } = props;
  const classes = useStyles(props);

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

  return (
    <header className={classes.root}>
      <Link href="/">
        <div className={classes.logo}>LoL Hero</div>
      </Link>
      <input className={classes.orderSearch} placeholder="Enter Tracking ID" />
      {!session.isLoggedIn ? <div
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
      </div> : <div>yo</div>}
    </header>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    display: "flex",
    position: "relative",
    backgroundColor: theme.tertiary,
    width: "100%",
    height: "79px",
    borderBottom: `2px solid #999`,
    padding: "20px 100px 20px 0px",
    top: 0,
    left: 0,
    zIndex: 5
  },
  container: {
    margin: "-20px 0 -22px 0",
    position: "relative",
    height: "auto"
    // display: "grid",
    // gridTemplateRows: "79px 1fr",
    // gridTemplateColumns: "1fr 1fr",
    // gridTemplateAreas: `
    // 'login signup'
    // 'modal modal'
    // `
  },
  logo: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0 45px",
    margin: "-20px 0 -20px 0",
    cursor: "pointer",
    transitionDuration: ".2s",
    borderBottom: "2px solid #999",
    color: theme.white,
    bottom: -2,
    fontSize: 30,
    "&:hover": {
      borderColor: `${theme.accent} !important`,
      color: `${theme.accent} !important`
    }
  },
  orderSearch: {
    display: "flex",
    flexGrow: 1,
    maxWidth: "250px",
    marginLeft: "auto",
    border: "none",
    outline: "none",
    borderRadius: 8,
    margin: "0 15px",
    padding: "15px",
    color: theme.white,
    backgroundColor: theme.primary
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

Header.propTypes = propTypes;

export default Header;
