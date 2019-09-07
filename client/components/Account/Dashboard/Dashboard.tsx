import React, { useEffect, useState } from 'react';
import { SessionState } from '../../../reducers/session/types';
import { AccountState } from '../../../reducers/account/types';
import DashboardHeader from './Header';
import DashboardCards from './Cards';
import DashboardList from './DashboardList';
import styles from './styles.css';

interface Props {
  session: SessionState;
  account: AccountState;
  fetchAccountOrders: () => void;
}

const Dashboard: React.FC<Props> = (props: Props): JSX.Element => {
  const { session, fetchAccountOrders, account } = props;

  const [filter, setFilter] = useState('active');

  useEffect(() => {
    fetchAccountOrders();
  }, [fetchAccountOrders]);

  return (
    <div className={styles.root}>
      <DashboardHeader session={session} />
      {/* <DashboardCards account={account} setFilter={setFilter} filter={filter} /> */}
      <DashboardList orders={account.orders} selectedFilter={filter} />
    </div>
  );
};

export default Dashboard;
