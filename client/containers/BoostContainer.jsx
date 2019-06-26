import React, { Component } from "react";
import { connect } from "react-redux";
import Boost from "../components/Boost";
import { fetchBoosts } from "../actions/MarketActions";

class BoostContainer extends Component {
  render() {
    return <Boost {...this.props} />;
  }
}

const mapStateToProps = state => ({
  boosts: state.market.boosting
});

const mapDispatchToProps = dispatch => ({
  fetchBoosts: () => dispatch(fetchBoosts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoostContainer);
