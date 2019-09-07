import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import Button from '../../Shared/Button';
import Form from '../../Shared/Form';

const propTypes = {
  handleAuth: PropTypes.func.isRequired,
  session: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    user: PropTypes.object.isRequired
  }).isRequired
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
  }
};

let useStyles;

const DetailsView = props => {
  const { session, handleAuth } = props;
  const classes = useStyles();

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
              onClick={() => setType(prev => (prev === 'login' ? null : 'login'))}
            >
              {type === 'login' ? 'back' : 'log in'}
            </Button>
            <Button
              margin="0 0 20px 0"
              onClick={() => setType(prev => (prev === 'signup' ? null : 'signup'))}
            >
              {type === 'signup' ? 'back' : 'create account'}
            </Button>
            {type && (
              <Form
                template={templates[type]}
                onSubmit={(formType, form) => handleAuth(formType, form)}
              />
            )}
            {!type && (
              <form id="details-form" className={classes.authWrapper}>
                <b>or</b>
                <span>Email Address</span>
                <input className={classes.input} id="details-email" type="email" />
                <span>Confirm Email Adress</span>
                <input className={classes.input} id="details-email-confirmation" type="email" />
              </form>
            )}
          </>
        )}
      </div>
      <div className={classes.wrapper}>
        <div id="dropin-container" />
      </div>
      <div className={classes.wrapper}>
        <h3>Promotion Code</h3>
        <input className={classes.input} placeholder="Enter promo code"></input>
        <Button margin="10px 0 0 0">check</Button>
      </div>
    </>
  );
};

useStyles = createUseStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.tertiary,
    borderRadius: 12,
    padding: '25px',
    boxShadow: '0 0 15px 0 rgba(0,0,0,.2)',
    margin: '10px 10px 20px 10px',
    '& h3': {
      margin: '0 0 10px 0',
      fontSize: 16,
      fontWeight: 500
    }
  },
  authWrapper: {
    display: 'flex',
    flexDirection: 'column',
    '& b': {
      margin: '0 0 10px 0',
      textAlign: 'center'
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.white
  },
  group: {
    display: 'flex',
    flexDirection: 'row'
  },
  session: {
    '& b': {
      color: theme.accent
    }
  },
  input: {
    display: 'flex',
    flexGrow: 1,
    outline: 'none',
    border: 'none',
    borderRadius: 8,
    margin: '10px 0',
    padding: '10px',
    backgroundColor: theme.primary,
    color: theme.white
  }
}));

DetailsView.propTypes = propTypes;

export default DetailsView;
