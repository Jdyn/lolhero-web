import React from 'react';
import { connect } from 'react-redux';
import { fetchAccountOrders } from '../actions/AccountActions';
import { AccountState } from '../reducers/account/types';
import { AppState } from '../reducers';
import Dashboard from '../components/Account/Dashboard';

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

const mapDispatchToProps = (dispatch: Function): object => ({
  fetchAccountOrders: (): Function => dispatch(fetchAccountOrders())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
