import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Dashboard from '../components/Account/Dashboard';

class DashboardContainer extends PureComponent {
  render() {
    return <Dashboard {...this.props} />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
