import React from 'react';
import { connect } from 'react-redux';
import { AccountState } from '../reducers/account/types';
import { SessionState } from '../reducers/session/types';
import { AppState } from '../reducers';
import Dashboard from '../components/Account/Dashboard';
import actions from '../actions/account';

interface Props {
  account?: AccountState;
  session?: SessionState;
  fetchAccountOrders?: () => void;
}

class DashboardContainer extends React.PureComponent<Props, undefined> {
  public render(): JSX.Element {
    const { session, account, fetchAccountOrders } = this.props;

    return (
      <Dashboard
        session={session}
        account={account}
        fetchAccountOrders={fetchAccountOrders}
      />
    );
  }
}

const mapStateToProps = (state: AppState): any => ({
  session: state.session,
  account: state.account
});

const mapDispatchToProps = (dispatch): any => ({
  fetchAccountOrders: (): void => dispatch(actions.fetchAccountOrders())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
