import React, { useEffect, useState, useRef } from 'react';
import AuthProfile from '../AuthProfile';
import AuthMenu from '../AuthMenu/AuthMenu';
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

  const [type, setType] = useState<'login' | 'signup' | '' | 'profile'>('');
  const [isOpen, setOpen] = useState(false);

  const modalRef: React.RefObject<HTMLDivElement> = useRef();

  const updateModal = (newType: 'login' | 'signup' | '' | 'profile'): void => {
    console.log(isOpen);
    if (isOpen) {
      console.log('already open');
      if (newType === type) {
        console.log('new type is type');
        setOpen(false);
        setType('');
      } else {
        console.log('did set new');
        setType(newType);
      }
    } else {
      console.log('is now open');
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

    if (typeof window !== 'undefined') {
      if (isOpen) {
        if (window.innerWidth < 650) {
          document.body.style.position = 'fixed';
          if (typeof window !== 'undefined') {
            document.body.style.top = `-${window.scrollY}px`;
          }
        }
      } else {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        if (typeof window !== 'undefined') {
          window.scrollTo(0, parseInt(scrollY || '0', 0) * -1);
        }
      }
    }

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
