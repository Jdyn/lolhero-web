import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Dropdown from './Dropdown/AuthDisplay';
import { Request } from '../../store/request/types';
import { SessionState } from '../../store/session/types';
import styles from './styles.css';
import ProgressBar from '../Reusable/ProgressBar';
import Filter from '../Reusable/Filter';

interface Props {
  handleAuth: (type: string, form: object) => void;
  session: SessionState;
  sessionRequest: Request;
}

const Header = (props: Props): JSX.Element => {
  const { handleAuth, session, sessionRequest } = props;

  const [trackingId, setId] = useState('');

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    Router.push('/order/[trackingId]', `/order/${trackingId}`);
  };

  return (
    <header className={styles.root}>
      <ProgressBar options={{ showSpinner: false }} />
      <Link href="/">
        <div className={styles.logo}>LoLHero</div>
      </Link>
      {/* <div className={styles.nav}>
        <Filter filters={['home']} />
      </div> */}
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          value={trackingId}
          onChange={(event): void => setId(event.target.value)}
          className={styles.searchInput}
          aria-label="search"
          placeholder="Enter Tracking ID"
        />
      </form>
      <Dropdown handleAuth={handleAuth} session={session} sessionRequest={sessionRequest} />
    </header>
  );
};

export default Header;
