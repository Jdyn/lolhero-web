import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import Button from '../../reusable/Button';
import Form from '../../reusable/Form';

const templates = {
  signup: {
    type: 'signup',
    title: 'New Account',
    fields: ['Email', 'Username', 'Password'],
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
      {/* <div className={classes.wrapper}>
        <h3>Promotion Code</h3>
        <input className={classes.input} />
        <Button margin="10px 0 0 0">check</Button>
      </div> */}
      <div className={classes.wrapper}>
        <div id="dropin-container" />
      </div>
    </>
  );
};

useStyles = createUseStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.tertiary,
    borderRadius: 8,
    padding: '25px',
    boxShadow: '0 0 15px 0 rgba(0,0,0,.2)',
    margin: '10px 10px 10px 10px',
    '& h3': {
      margin: '0 0 10px 0',
      // textAlign: 'center',
      fontSize: 16,
      fontWeight: 700
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

export default DetailsView;
