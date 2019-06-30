import React, { Component } from "react";
import { connect } from "react-redux";
import Boost from "../components/Boost";
import { fetchBoostPrices, updateOrder } from "../actions/BoostActions";

class BoostContainer extends Component {
  render() {
    return <Boost {...this.props} />;
  }
}

const mapStateToProps = state => ({
  currentOrder: state.boost.order,
  boost: state.boost
});

const mapDispatchToProps = dispatch => ({
  fetchBoostPrices: () => dispatch(fetchBoostPrices()),
  updateOrder: newUpdate => dispatch(updateOrder(newUpdate))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoostContainer);
