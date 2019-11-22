import React, { useState } from 'react';
import { SessionState } from '../../../store/session/types';
import { AccountState } from '../../../store/account/types';
import DashboardHeader from './DashboardHeader';
import DashboardFilter from './DashboardFilter';
import DashboardTable from './DashboardTable';
import styles from './styles.css';

interface Props {
  session: SessionState;
  account: AccountState;
}

const Dashboard: React.FC<Props> = (props: Props): JSX.Element => {
  const { session, account } = props;

  const [filter, setFilter] = useState('active');

  return (
    <div className={styles.root}>
      <DashboardHeader session={session} />
      <DashboardFilter orders={account.orders} setFilter={setFilter} filter={filter} />
      <DashboardTable orders={account.orders} filter={filter} />
    </div>
  );
};

export default Dashboard;
