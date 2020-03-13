import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/shared/Layout';
import withAuth from '../../util/withAuth';
import Dashboard from '../../components/Account/Dashboard';
import { AccountState } from '../../store/account/types';
import { SessionState } from '../../store/session/types';
import { fetchAccountOrderList } from '../../store/account/actions';
import { filterUpdated } from '../../store/account/reducers';
import { AppState } from '../../store';

interface Props {
  account?: AccountState;
  session?: SessionState;
  fetchOrderList?: () => void;
  filterUpdated?: (newFilter: string) => void;
}

const DashboardContainer = (props: Props): JSX.Element => {
  const { session, account, fetchOrderList, filterUpdated } = props;
  return (
    <Layout title="Dashboard">
      <Dashboard
        session={session}
        account={account}
        fetchOrderList={fetchOrderList}
        filterUpdated={filterUpdated}
      />
    </Layout>
  );
};

const mapState = (state: AppState): any => ({
  session: state.session,
  account: state.account,
  orderListRequest: state.request.FETCH_ACCOUNT_ORDER_LIST || {}
});

const mapDispatch = (dispatch): object => ({
  fetchOrderList: (): void => dispatch(fetchAccountOrderList()),
  filterUpdated: (newFilter): void => dispatch(filterUpdated(newFilter))
});

export default withAuth(connect(mapState, mapDispatch)(DashboardContainer));
