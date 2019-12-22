import React from 'react';
import styles from './styles.css';
import Form from '../Form';
import { Request } from '../../../store/request/types';
import Loader from '../Loader';

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
  type: 'login' | 'signup';
  authenticate: (type: string, form: object, redirect: boolean) => void;
  sessionRequest: Request;
}

const AccountAuth = (props: Props): JSX.Element => {
  const { authenticate, type, sessionRequest } = props;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Form
          template={templates[type]}
          onSubmit={(formType, form): void => authenticate(formType, form, true)}
        />
        <div className={styles.loader}>
          {sessionRequest.isPending && <Loader width="64px" height="64px" />}
          {sessionRequest.errored && <p>{sessionRequest.error}</p>}
        </div>
      </div>
    </div>
  );
};

export default AccountAuth;
