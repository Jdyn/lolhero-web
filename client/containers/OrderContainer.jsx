import React from 'react';
import { connect } from 'react-redux';
import Order from '../components/Order';

const OrderContainer = props => {
  return <Order {...props} />;
};

const mapStateToProps = state => ({
  session: state.session,
  OrderRequest: state.request
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderContainer);
