import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import Link from 'next/link';

const propTypes = {};

const templates = {
  profile: {
    type: 'profile',
    title: 'Profile',
    fields: {},
    items: [
      { title: 'Dashboard', link: '/account/dashboard' },
      { title: 'Orders', link: '/account/orders' }
    ],
    logout: 'log out'
  }
};

const AuthProfile = props => {
  const { modalRef, updateModal, session, isOpen, type, handleAuth } = props;
  const classes = useStyes(props);

  const logout = () => {
    handleAuth({}, 'logout');
  };

  return (
    <div className={classes.root} ref={modalRef}>
      <div className={classes.container} onClick={() => updateModal('profile')}>
        <div className={classes.wrapper}>{session.user.username}</div>
        <div className={classes.portrait} />
      </div>
      {isOpen ? (
        <div className={classes.modal}>
          {type === 'profile' && (
            <>
              {templates[type].items.map((item, index) => (
                <Link key={index} href={item.link}>
                  <a>{item.title}</a>
                </Link>
              ))}
              <button onClick={() => logout()}>{templates[type].logout}</button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

const useStyes = createUseStyles(theme => ({
  root: {
    margin: '-20px 0 -22px auto',
    position: 'relative',
    height: 'auto',
    // width: '100%',
    maxWidth: '250px',
    '@media (min-width: 650px)': {
      margin: '-20px 0 -22px 0',
      flex: 1,
      display: 'grid',
      gridTemplateRows: '79px 1fr',
      gridTemplateColumns: '1fr',
      gridTemplateAreas: `
        'profile profile'
        'modal modal'
      `
    }
  },
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    maxWidth: '200px',
    height: '100%',
    margin: '0px 25px',
    borderBottom: '2px solid #999',
    '@media (min-width: 650px)': {
      flexGrow: 1,

    },
    '&:hover': {
      color: theme.accent,
      borderBottom: `2px solid ${theme.accent}`
    }
  },
  wrapper: {
    color: theme.white,
    height: '100%',
    display: 'none',
    padding: '8px 22px 8px 10px',
    maxHeight: '37px',
    alignItems: 'center',
    fontWeight: 600,
    marginRight: '-20px',
    borderRadius: '8px 0px 0px 8px',
    justifyContent: 'center',
    backgroundColor: theme.primary,
    '@media (min-width: 650px)': {
      display: 'flex',
      flexGrow: 1,
    }
  },
  portrait: {
    width: '44px',
    height: '44px',
    border: '2px solid #999',
    borderRadius: '50%',
    backgroundColor: theme.primary
  },
  modal: {
    display: 'flex',
    position: 'fixed',
    right: 0,
    width: '100vw',
    height: '100vh',
    flexDirection: 'column',
    // overflow: "hidden",
    zIndex: 1000,
    backgroundColor: theme.white,
    '@media (min-width: 650px)': {
      display: 'flex',
      position: 'relative',
      gridArea: 'modal',
      padding: '25px',
      margin: '0px 25px',
      width: 'auto',
      height: 'auto',
      boxShadow: '0px 4px 6px 0px rgba(0,0,0,.2)',
      borderRadius: '0px 0px 12px 12px',
      flexDirection: 'column',
      backgroundColor: theme.tertiary,
      transitionDuration: '.2s'
    }
  }
}));

AuthProfile.propTypes = propTypes;

export default AuthProfile;
