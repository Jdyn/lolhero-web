import React from 'react';
import { connect } from 'react-redux';
import Dashboard from '../components/Account/Dashboard';
import { AccountState } from '../store/account/types';
import { SessionState } from '../store/session/types';
import { fetchAccountOrderList } from '../store/account/actions';
import { AppState } from '../store';
import { Request } from '../store/request/types';

interface Props {
  account?: AccountState;
  session?: SessionState;
  fetchOrderList?: () => void;
  OrderListRequest?: Request;
}

class DashboardContainer extends React.PureComponent<Props> {
  public render(): JSX.Element {
    const { session, account, fetchOrderList, OrderListRequest } = this.props;

    return (
      <Dashboard
        session={session}
        account={account}
        fetchOrderList={fetchOrderList}
        OrderListRequest={OrderListRequest}
      />
    );
  }
}

const mapState = (state: AppState): any => ({
  session: state.session,
  account: state.account,
  OrderListRequest: state.request.FETCH_ACCOUNT_ORDER_LIST || {}
});

const mapDispatch = (dispatch): object => ({
  fetchOrderList: (): void => dispatch(fetchAccountOrderList())
});

export default connect(mapState, mapDispatch)(DashboardContainer);
