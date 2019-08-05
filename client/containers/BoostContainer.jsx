import React, { Component } from "react";
import { connect } from "react-redux";
import Boost from "../components/Boost";
import { fetchBoostPrices, updateOrder, submitOrder } from "../actions/BoostActions";
import { handleAuth } from "../actions/SessionActions";

class BoostContainer extends Component {
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
  handleAuth: (form, type) => dispatch(handleAuth(form, type)),
  fetchBoostPrices: () => dispatch(fetchBoostPrices()),
  updateOrder: newUpdate => dispatch(updateOrder(newUpdate)),
  submitOrder: nonce => dispatch(submitOrder(nonce))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoostContainer);
