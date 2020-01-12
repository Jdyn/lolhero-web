import React from 'react';
import { connect } from 'react-redux';
import Dashboard from '../components/Account/Dashboard';
import { AccountState } from '../store/account/types';
import { SessionState } from '../store/session/types';
import { fetchAccountOrderList } from '../store/account/actions';
import { AppState } from '../store';

interface Props {
  account?: AccountState;
  session?: SessionState;
  fetchOrderList?: () => void;
}

class DashboardContainer extends React.PureComponent<Props> {
  public render(): JSX.Element {
    const { session, account, fetchOrderList } = this.props;

    return <Dashboard session={session} account={account} fetchOrderList={fetchOrderList} />;
  }
}

const mapState = (state: AppState): Partial<AppState> => ({
  session: state.session,
  account: state.account
});

const mapDispatch = (dispatch): object => ({
  fetchOrderList: (): void => dispatch(fetchAccountOrderList())
});

export default connect(mapState, mapDispatch)(DashboardContainer);
