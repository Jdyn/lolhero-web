import React, { useEffect, useState, useRef } from 'react';
import AuthProfile from '../AuthProfile';
import AuthMenu from '../AuthMenu';
import styles from './styles.css';
import { Request } from '../../../../store/request/types';

interface Props {
  children?: React.ReactNode;
  session: { isLoggedIn: boolean | null; user: object };
  handleAuth: (type: string, form: object) => void;
  sessionRequest: Request;
}

const AuthDisplay: React.FC<Props> = (props: Props) => {
  const { handleAuth, session, sessionRequest } = props;

  const [type, setType] = useState('');
  const [isOpen, setOpen] = useState(false);

  const modalRef: React.MutableRefObject<HTMLElement | undefined> = useRef();

  const updateModal = (newType: string): void => {
    if (isOpen) {
      if (newType === type) {
        setOpen(false);
        setType('');
      } else {
        setType(newType);
      }
    } else {
      setOpen(true);
      setType(newType);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: Event): void => {
      if (modalRef.current) {
        const { target } = event;
        if (!modalRef.current.contains(target as Node)) {
          document.removeEventListener('mousedown', handleClickOutside);
          setOpen(false);
          setType('');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, session]);

  useEffect(() => {
    if (sessionRequest.success) {
      setOpen(false);
      setType('');
    }
  }, [sessionRequest.success]);

  const renderContent = (isLoggedIn: boolean | null): JSX.Element => {
    switch (isLoggedIn) {
      case true:
        return (
          <AuthProfile
            handleAuth={handleAuth}
            modalRef={modalRef}
            isOpen={isOpen}
            updateModal={updateModal}
            session={session}
            type={type}
          />
        );

      case false:
        return (
          <AuthMenu
            handleAuth={handleAuth}
            modalRef={modalRef}
            isOpen={isOpen}
            updateModal={updateModal}
            session={session}
            sessionRequest={sessionRequest}
            type={type}
          />
        );

      default:
        return <div className={styles.loading} />;
    }
  };

  return renderContent(session.isLoggedIn);
};

export default AuthDisplay;
