import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Dashboard from '../components/Account/Dashboard';
import { fetchAccountOrders } from '../actions/AccountActions';

class DashboardContainer extends PureComponent {
  render() {
    return <Dashboard {...this.props} />;
  }
}

const mapStateToProps = state => ({
  session: state.session,
  account: state.account
});

const mapDispatchToProps = dispatch => ({
  fetchAccountOrders: () => dispatch(fetchAccountOrders())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
