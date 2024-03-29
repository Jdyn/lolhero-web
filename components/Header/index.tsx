import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Dropdown from './Dropdown/AuthDisplay';
import { Request } from '../../store/request/types';
import { SessionState } from '../../store/session/types';
import styles from './index.module.css';
import ProgressBar from '../shared/ProgressBar';
import { UpdateOrder } from '../../store/boost/types';
import Filter from '../shared/Filter';

interface Props {
  handleAuth: (type: string, form: object, redirect?: string) => void;
  updateOrder?: UpdateOrder;
  session: SessionState;
  sessionRequest: Request;
}

const filters = {
  home: {
    title: 'home',
    url: '/'
  },
  pricing: {
    title: 'order now',
    url: '/boost'
  },
  demo: {
    title: 'demo',
    url: '/demo'
  }
};

const filterArray = Object.keys(filters);

const Header = (props: Props): JSX.Element => {
  const { handleAuth, session, sessionRequest, updateOrder } = props;

  const [trackingId, setId] = useState('');

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    Router.push('/order/track/[trackingId]', `/order/track/${trackingId}`);
    updateOrder(null);
  };

  const handleClick = (_: number, filter: string): void => {
    Router.push(filters[filter].url);
  };

  return (
    <header className={styles.header}>
      <ProgressBar options={{ showSpinner: false }} />
      <Link href="/">
        <div className={styles.logo}>LoLHero</div>
      </Link>
      <div className={styles.nav}>
        <Filter noSelect extended filters={filterArray} onClick={handleClick} />
      </div>
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
