import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import Form from '../../Form';

const propTypes = {
  handleAuth: PropTypes.func.isRequired,
  modalRef: PropTypes.shape({}).isRequired,
  isOpen: PropTypes.bool.isRequired,
  type: PropTypes.string,
  session: PropTypes.shape({}).isRequired,
  updateModal: PropTypes.func.isRequired
};

const templates = {
  signup: {
    type: 'signup',
    title: 'New Account',
    fields: ['email', 'username', 'password'],
    submit: 'sign up'
  },
  login: {
    type: 'login',
    title: 'Existing Account',
    fields: ['username', 'password'],
    submit: 'log in'
  },
  profile: {}
};

let useStyles;

const AuthMenu = props => {
  const { modalRef, updateModal, isOpen, type, handleAuth } = props;
  const classes = useStyles(props);

  return (
    <div
      className={classes.container}
      ref={modalRef}
      style={{
        display: 'grid',
        gridTemplateRows: '79px 1fr',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateAreas: ` 
            'login signup'
            'modal modal'
            `
      }}
    >
      <button
        type="button"
        className={classes.button}
        style={{ gridArea: 'signup' }}
        onClick={() => updateModal('signup')}
      >
        sign up
      </button>
      <button
        type="button"
        className={classes.button}
        style={{ gridArea: 'login' }}
        onClick={() => updateModal('login')}
      >
        log in
      </button>
      {isOpen ? (
        <div className={classes.modal}>
          {type && (
            <Form
              template={templates[type]}
              onSubmit={(formType, form) => handleAuth(formType, form)}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

useStyles = createUseStyles(theme => ({
  container: {
    margin: '-20px 0 -22px 0',
    position: 'relative',
    height: 'auto',
    width: '100%',
    maxWidth: '250px'
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
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.white
  },
  input: {
    outline: 'none',
    border: 'none',
    borderRadius: 8,
    height: '30px',
    margin: '10px 0',
    padding: '10px',
    backgroundColor: theme.primary,
    color: theme.white
  },
  submitButton: {
    outline: 'none',
    border: 'none',
    borderRadius: 8,
    backgroundColor: theme.accent,
    fontWeight: '600',
    color: theme.white,
    textTransform: 'uppercase',
    marginTop: '10px',
    padding: '10px'
  },
  modal: {
    display: 'flex',
    padding: '25px',
    position: 'relative',
    gridArea: 'modal',
    boxShadow: '0px 4px 6px 0px rgba(0,0,0,.2)',
    borderRadius: '0px 0px 12px 12px',
    flexDirection: 'column',
    backgroundColor: theme.tertiary,
    transitionDuration: '.2s'
  }
}));

AuthMenu.propTypes = propTypes;

export default AuthMenu;
