import React from 'react';
import { connect } from 'react-redux';
import Dashboard from '../components/Account/Dashboard';
import { fetchAccountOrderList } from '../store/account/actions';
import { AccountState } from '../store/account/types';
import { SessionState } from '../store/session/types';
import { AppState } from '../store/root';

interface Props {
  account?: AccountState;
  session?: SessionState;
  fetchAccountOrders?: () => void;
}

class DashboardContainer extends React.PureComponent<Props, undefined> {
  public render(): JSX.Element {
    const { session, account, fetchAccountOrders } = this.props;

    return (
      <Dashboard session={session} account={account} fetchAccountOrders={fetchAccountOrders} />
    );
  }
}

const mapStateToProps = (state: AppState): any => ({
  session: state.session,
  account: state.account
});

const mapDispatchToProps = (dispatch): any => ({
  fetchAccountOrders: (): void => dispatch(fetchAccountOrderList())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
