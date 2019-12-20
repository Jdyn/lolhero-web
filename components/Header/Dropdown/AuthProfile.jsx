import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import Link from 'next/link';
import Button from '../../reusable/Button';

const propTypes = {
  handleAuth: PropTypes.func.isRequired,
  modalRef: PropTypes.shape({}).isRequired,
  isOpen: PropTypes.bool.isRequired,
  updateModal: PropTypes.func.isRequired,
  type: PropTypes.string,
  session: PropTypes.shape({}).isRequired
};

const templates = {
  profile: {
    type: 'profile',
    title: 'Profile',
    fields: {},
    items: [{ title: 'My Dashboard', link: '/account/dashboard' }],
    logout: 'log out'
  }
};

const AuthProfile = props => {
  const { modalRef, updateModal, session, isOpen, type, handleAuth } = props;
  const classes = useStyles(props);

  const logout = () => {
    handleAuth('logout', {});
  };

  return (
    <div className={classes.root} ref={modalRef}>
      <button className={classes.container} type="button" onClick={() => updateModal('profile')}>
        <div className={classes.wrapper}>{session.user.username}</div>
        <div className={classes.portrait} />
      </button>
      {isOpen ? (
        <div className={classes.modal}>
          {type === 'profile' && (
            <ul className={classes.modalList}>
              {templates[type].items.map(item => (
                <Link key={item.title} href={item.link}>
                  <li className={classes.modalListItem}>{item.title}</li>
                </Link>
              ))}
              <Button onClick={() => logout()}>{templates[type].logout}</Button>
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    // display: 'flex',
    position: 'absolute',
    height: '100%',
    maxWidth: '220px',
    right: 0,
    margin: '0px 0px 0px 25px',
    width: '64px',
    '@media (min-width: 650px)': {
      position: 'relative',
      flex: 1.5,
      display: 'grid',
      gridTemplateRows: '75px 1fr',
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
    justifyContent: 'center',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    height: '75px',
    maxWidth: '250px',
    width: '100%',
    margin: '0',
    padding: 0,
    borderBottom: '2px solid #999',
    '@media (min-width: 650px)': {
      flexGrow: 1,
      maxWidth: '250px',
      width: 'auto'
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
    flexGrow: 1,
    padding: '8px 22px 8px 10px',
    maxHeight: '37px',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 600,
    marginRight: '-20px',
    borderRadius: '8px 0px 0px 8px',
    justifyContent: 'center',
    backgroundColor: theme.primary,
    '@media (min-width: 650px)': {
      display: 'flex'
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
    zIndex: 50,
    padding: '15px',
    backgroundColor: theme.primary,
    '@media (min-width: 650px)': {
      display: 'flex',
      padding: '0',
      position: 'relative',
      gridArea: 'modal',
      width: 'auto',
      height: 'auto',
      boxShadow: '0px 4px 6px 0px rgba(0,0,0,.2)',
      borderRadius: '0px 0px 12px 12px',
      flexDirection: 'column',
      transitionDuration: '.2s'
    }
  },
  modalList: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.tertiary,
    boxShadow: '0px 2px 6px 0px rgba(0,0,0,.2)',
    padding: '25px',
    margin: 0,
    borderRadius: 12,
    listStyle: 'none',
    '@media (min-width: 650px)': {
      borderRadius: '0 0 12px 12px'
    }
  },
  modalListItem: {
    display: 'flex',
    padding: '10px',
    backgroundColor: theme.primary,
    borderRadius: 8,
    marginBottom: '10px',
    color: theme.white,
    cursor: 'pointer'
  }
}));

AuthProfile.propTypes = propTypes;

export default AuthProfile;
