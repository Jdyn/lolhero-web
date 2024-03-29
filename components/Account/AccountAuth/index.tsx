import React from 'react';
import Link from 'next/link';
import styles from './index.module.css';
import Form from '../../shared/Form';
import { FormTemplate } from '../../shared/Form/types';
import { Request } from '../../../store/request/types';

const templates: { [name: string]: FormTemplate } = {
  signup: {
    type: 'signup',
    title: 'New Account',
    fields: [
      { name: 'email', type: 'email' },
      { name: 'username', type: 'username' },
      { name: 'password', type: 'password' }
    ],
    submit: 'sign up'
  },
  login: {
    type: 'login',
    title: 'Existing Account',
    fields: [
      { name: 'username', type: 'username', placeholder: '' },
      { name: 'password', type: 'password' }
    ],
    submit: 'log in'
  }
};

interface Props {
  type: 'login' | 'signup';
  authenticate: (type: string, form: object, redirect?: string) => void;
  sessionRequest: Request;
}

const AccountAuth = (props: Props): JSX.Element => {
  const { authenticate, type, sessionRequest } = props;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Form
          template={templates[type]}
          onSubmit={(formType, form): void => authenticate(formType, form, '/account/dashboard')}
          isPending={sessionRequest.isPending}
        />
        <div className={styles.error}>{sessionRequest.errored && sessionRequest.error}</div>
        <Link href="/account/recover">
          <a className={styles.link} href="/account/recover">
            Forgot Password?
          </a>
        </Link>
      </div>
    </div>
  );
};

export default AccountAuth;
