import React from 'react';
import { connect } from 'react-redux';
import Dashboard from '../components/Account/Dashboard';
import { fetchAccountOrders } from '../actions/AccountActions';
import { AppState } from '../reducers';
import { AccountState } from '../reducers/account/types';

interface Props {
  account: AccountState;
  session: object;
  fetchAccountOrders: typeof fetchAccountOrders;
}

class DashboardContainer extends React.PureComponent<Props> {
  public render(): JSX.Element {
    return <Dashboard {...this.props} />;
  }
}

const mapStateToProps = (state: AppState): object => ({
  session: state.session,
  account: state.account
});

const mapDispatchToProps = (dispatch): object => ({
  fetchAccountOrders: (): (() => void) => dispatch(fetchAccountOrders())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
