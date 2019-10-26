import React from 'react';
import { connect } from 'react-redux';
import Boost from '../components/Boost';
import { fetchBoostPrices, updateOrder, submitOrder } from '../store/boost/actions';
import { handleAuth } from '../store/session/actions';

class BoostContainer extends React.PureComponent {
  render() {
    return <Boost {...this.props} />;
  }
}

const mapStateToProps = state => ({
  session: state.session,
  submitOrderRequest: state.request.SUBMIT_ORDER || {},
  currentOrder: state.boost.order.details,
  boost: state.boost
});

const mapDispatchToProps = dispatch => ({
  handleAuth: (type, form) => dispatch(handleAuth(type, form)),
  fetchBoostPrices: () => dispatch(fetchBoostPrices()),
  updateOrder: newUpdate => dispatch(updateOrder(newUpdate)),
  submitOrder: nonce => dispatch(submitOrder(nonce))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoostContainer);
