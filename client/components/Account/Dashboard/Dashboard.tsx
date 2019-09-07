import React, { useEffect, useState } from 'react';
import { SessionState } from '../../../reducers/session/types';
import { AccountState } from '../../../reducers/account/types';
import DashboardHeader from './DashboardHeader';
import DashboardFilter from './DashboardFilter';
import DashboardTable from './DashboardTable/DashboardTable';
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
      <DashboardFilter
        orders={account.orders}
        setFilter={setFilter}
        filter={filter}
      />
      <DashboardTable orders={account.orders} filter={filter} />
    </div>
  );
};

export default Dashboard;
