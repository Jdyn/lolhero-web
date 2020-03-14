import React, { useState, useEffect } from 'react';
import { SessionState } from '../../../store/session/types';
import { AccountState } from '../../../store/account/types';
import DashboardHeader from './DashboardHeader';
import DashboardFilter from './DashboardFilter';
import DashboardTable from './DashboardTable';
import styles from './index.module.css';

interface Props {
  session: SessionState;
  account: AccountState;
  fetchOrderList: () => void;
  filterUpdated: (newFilter: string) => void;
}

const Dashboard: React.FC<Props> = (props: Props): JSX.Element => {
  const { session, account, fetchOrderList, filterUpdated } = props;

  useEffect(() => {
    fetchOrderList();
  }, [fetchOrderList]);

  return (
    <div className={styles.root}>
      <div className={styles.stripe} />
      <DashboardHeader session={session} />
      <DashboardFilter
        orders={account.orders}
        filterUpdated={filterUpdated}
        filter={account.currentFilter}
      />
      <DashboardTable orders={account.orders} filter={account.currentFilter} session={session} />
    </div>
  );
};

export default Dashboard;
