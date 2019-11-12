import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import AuthDisplay from './auth/AuthDisplay/AuthDisplay';
import { Request } from '../../store/request/types';
import { SessionState } from '../../store/session/types';
import styles from './styles.css';

interface Props {
  handleAuth: () => void;
  session: SessionState;
  sessionRequest: Request;
}

const Header = (props: Props): JSX.Element => {
  const { handleAuth, session, sessionRequest } = props;

  const [trackingId, setId] = useState('');

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    Router.push({ pathname: '/order/order', query: { trackingId } }, `/track/${trackingId}`);
  };

  return (
    <header className={styles.root}>
      <Link href="/">
        <div className={styles.logo}>LoL Hero</div>
      </Link>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          value={trackingId}
          onChange={(event): void => setId(event.target.value)}
          className={styles.searchInput}
          aria-label="search"
          placeholder="Enter Tracking ID"
        />
      </form>

      <AuthDisplay handleAuth={handleAuth} session={session} sessionRequest={sessionRequest} />
    </header>
  );
};

export default Header;
