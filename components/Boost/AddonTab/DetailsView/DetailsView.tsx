import React, { useState } from 'react';
import Button from '../../../Reusable/Button';
import Form from '../../../Reusable/Form';
import { SessionState } from '../../../../store/session/types';
import styles from './styles.css';

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

interface Props {
  session: SessionState;
  handleAuth: (type: string, form: object) => void;
}

const DetailsView = (props: Props): JSX.Element => {
  const { session, handleAuth } = props;

  const [type, setType] = useState(null);

  return (
    <>
      <div className={styles.root}>
        {session.isLoggedIn ? (
          <div className={styles.session}>
            You are currently logged in as <b>{session.user.username}</b>.
          </div>
        ) : (
          <>
            <Button
              secondary
              margin="0 0 10px 0"
              onClick={(): void => setType(prev => (prev === 'login' ? null : 'login'))}
            >
              {type === 'login' ? 'back' : 'log in'}
            </Button>
            <Button
              margin="0 0 20px 0"
              onClick={(): void => setType(prev => (prev === 'signup' ? null : 'signup'))}
            >
              {type === 'signup' ? 'back' : 'create account'}
            </Button>
            {type && (
              <Form
                template={templates[type]}
                onSubmit={(formType, form): void => handleAuth(formType, form)}
              />
            )}
            {!type && (
              <form id="details-form" className={styles.authWrapper}>
                <b>or</b>
                <span>Email Address</span>
                <input className={styles.input} id="details-email" type="email" />
                <span>Confirm Email Adress</span>
                <input className={styles.input} id="details-email-confirmation" type="email" />
              </form>
            )}
          </>
        )}
      </div>
      <div className={styles.root}>
        <div id="dropin-container" />
      </div>
    </>
  );
};

export default DetailsView;