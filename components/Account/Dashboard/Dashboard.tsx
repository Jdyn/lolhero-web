import React, { useState, useEffect } from 'react';
import { SessionState } from '../../../store/session/types';
import { AccountState } from '../../../store/account/types';
import DashboardHeader from './DashboardHeader';
import DashboardFilter from './DashboardFilter';
import DashboardTable from './DashboardTable';
import styles from './styles.module.css';
import { Request } from '../../../store/request/types';

interface Props {
  session: SessionState;
  account: AccountState;
  OrderListRequest: Request;
  fetchOrderList: () => void;
}

const Dashboard: React.FC<Props> = (props: Props): JSX.Element => {
  const { session, account, fetchOrderList, OrderListRequest } = props;

  const [filter, setFilter] = useState('active');

  useEffect(() => {
    if (!OrderListRequest.success) {
      fetchOrderList();
    }
  }, [fetchOrderList, OrderListRequest]);

  return (
    <div className={styles.root}>
      <DashboardHeader session={session} />
      <DashboardFilter orders={account.orders} setFilter={setFilter} filter={filter} />
      <DashboardTable orders={account.orders} filter={filter} session={session} />
    </div>
  );
};

export default Dashboard;
