import React, { Component } from "react";
import { connect } from "react-redux";
import Boost from "../components/Boost";
import { fetchBoostPrices, updateOrder, submitOrder } from "../actions/BoostActions";

class BoostContainer extends Component {
  render() {
    return <Boost {...this.props} />;
  }
}

const mapStateToProps = state => ({
  submitOrderRequest: state.request.SUBMIT_ORDER || {},
  currentOrder: state.boost.order.details,
  boost: state.boost
});

const mapDispatchToProps = dispatch => ({
  fetchBoostPrices: () => dispatch(fetchBoostPrices()),
  updateOrder: newUpdate => dispatch(updateOrder(newUpdate)),
  submitOrder: () => dispatch(submitOrder())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoostContainer);
