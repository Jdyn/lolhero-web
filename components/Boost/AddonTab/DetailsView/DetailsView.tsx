import React, { useState } from 'react';
import Button from '../../../Reusable/Button/Button';
import Form from '../../../Reusable/Form';
import { SessionState } from '../../../../store/session/types';
import styles from './styles.module.css';

const templates = {
  signup: {
    type: 'signup',
    title: 'New Account',
    fields: [
      { name: 'Email', type: 'email', key: 'email' },
      { name: 'Username', type: 'username', key: 'username' },
      { name: 'Password', type: 'password', key: 'password' }
    ],
    submit: 'sign up'
  },
  login: {
    type: 'login',
    title: 'Existing Account',
    fields: [
      { name: 'Username', type: 'username', key: 'username' },
      { name: 'Password', type: 'password', key: 'password' }
    ],
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
            You are currently logged in as <span>{session?.user?.username}</span>.
          </div>
        ) : (
          <>
            <Button
              margin="0 0 10px 0"
              onClick={(): void => setType(prev => (prev === 'login' ? null : 'login'))}
            >
              {type === 'login' ? 'back' : 'log in'}
            </Button>
            <Button
              margin="0 0 20px 0"
              green
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
