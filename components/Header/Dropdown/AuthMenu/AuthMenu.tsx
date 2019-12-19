import React from 'react';
import Form from '../../../reusable/Form/Form';
import { Request } from '../../../../store/request/types';
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
  },
  profile: {
    type: 'login',
    title: 'Existing Account',
    fields: [],
    submit: 'log in'
  }
};

interface Props {
  handleAuth: (type: string, form: object) => void;
  modalRef: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  type: 'login' | 'signup' | '' | 'profile';
  updateModal: (newType: 'login' | 'signup' | '' | 'profile') => void;
  sessionRequest: Request;
}

const AuthMenu = (props: Props): JSX.Element => {
  const { modalRef, updateModal, isOpen, type, handleAuth, sessionRequest } = props;

  return (
    <>
      <div className={styles.mobileContainer} ref={modalRef} onClick={() => updateModal('login')}>
        <button type="button" className={styles.menuWrapper}>
          <div className={styles.menu} />
        </button>
        {isOpen ? (
          <div className={styles.modal}>
            {sessionRequest.errored && <span>{sessionRequest.error}</span>}
          </div>
        ) : null}
      </div>
      <div className={styles.container} ref={modalRef}>
        <button
          type="button"
          className={styles.button}
          style={{ gridArea: 'signup' }}
          onClick={(): void => updateModal('signup')}
        >
          sign up
        </button>
        <button
          type="button"
          className={styles.button}
          style={{ gridArea: 'login' }}
          onClick={(): void => updateModal('login')}
        >
          log in
        </button>
        {isOpen ? (
          <div className={styles.modal}>
            {type && (
              <Form
                template={templates[type]}
                onSubmit={(formType, form): void => handleAuth(formType, form)}
              />
            )}
            {sessionRequest.errored && <span>{sessionRequest.error}</span>}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default AuthMenu;
