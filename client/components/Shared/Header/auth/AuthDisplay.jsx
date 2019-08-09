import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import AuthProfile from './AuthProfile';
import AuthMenu from './AuthMenu';
const propTypes = {};

const AuthDisplay = props => {
  const { handleAuth, session, sessionRequest } = props;
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
    if (sessionRequest.success) {
      setOpen(false);
      setType(null);
    }
  }, [sessionRequest]);

  // useEffect(() => {
  //   handleAuth({ username: "test", password: "password" }, "login");
  // }, []);

  useEffect(() => {
    const handleClickOutside = e => {
      if (!modalRef.current.contains(e.target)) {
        document.removeEventListener('mousedown', handleClickOutside);
        setOpen(false);
        setType(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, session]);

  return session.isLoggedIn === null ? (
    <div className={classes.loading}></div>
  ) : session.isLoggedIn ? (
    <AuthProfile
      handleAuth={handleAuth}
      modalRef={modalRef}
      isOpen={isOpen}
      updateModal={updateModal}
      session={session}
      type={type}
    />
  ) : (
    <AuthMenu
      handleAuth={handleAuth}
      modalRef={modalRef}
      isOpen={isOpen}
      updateModal={updateModal}
      session={session}
      type={type}
    />
  );
};

const useStyes = createUseStyles(theme => ({
  container: {
    margin: '-20px 0 -22px 0',
    position: 'relative',
    height: 'auto',
    width: '100%',
    maxWidth: '250px'
  },
  loading: {
    display: "flex",
    flexGrow: 1,
    maxWidth: "250px"
  },
  button: {
    display: 'flex',
    outline: 'none',
    border: 'none',
    position: 'relative',
    cursor: 'pointer',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: 16,
    flexGrow: 1,
    maxWidth: '125px',
    height: '100%',
    padding: 0,
    textTransform: 'uppercase',
    color: theme.grey,
    backgroundColor: theme.tertiary,
    borderBottom: '2px solid #999',
    transitionDuration: '.2s',
    '&:hover': {
      color: theme.accent,
      borderBottom: `2px solid ${theme.accent}`
    }
  }
}));

AuthDisplay.propTypes = propTypes;

export default AuthDisplay;
