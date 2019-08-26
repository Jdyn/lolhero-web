import React, { useEffect, useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import AuthProfile from './AuthProfile';
import AuthMenu from './AuthMenu';

interface Props {
  children?: React.ReactNode;
  session: { isLoggedIn: boolean | null; user: object };
  handleAuth: (type: string, form: object) => void;
  sessionRequest: { success: boolean; errored: boolean; error: string | null };
}

let useStyles;

const AuthDisplay: React.FC<Props> = (props: Props): JSX.Element => {
  const { handleAuth, session, sessionRequest } = props;
  const classes = useStyles();

  const [type, setType] = useState(null);
  const [isOpen, setOpen] = useState(false);

  const modalRef: React.RefObject<HTMLDivElement> = useRef();

  const updateModal = (newType: string): void => {
    if (isOpen) {
      if (newType === type) {
        setOpen(false);
        setType(null);
      } else {
        setType(newType);
      }
    } else {
      setOpen(true);
      setType(newType);
    }
  };

  useEffect((): void | (() => void) => {
    const handleClickOutside = (event: Event): void => {
      if (modalRef.current) {
        const { target } = event;
        if (!modalRef.current.contains(target as Node)) {
          document.removeEventListener('mousedown', handleClickOutside);
          setOpen(false);
          setType(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, session]);

  useEffect((): void | (() => void) => {
    if (sessionRequest.success) {
      setOpen(false);
      setType(null);
    }
  }, [sessionRequest]);

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
        return <div className={classes.loading} />;
    }
  };

  return renderContent(session.isLoggedIn);
};

useStyles = createUseStyles({
  loading: {
    display: 'flex',
    flexGrow: 1,
    maxWidth: '250px'
  }
});

export default AuthDisplay;
