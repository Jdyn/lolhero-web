import React, { Component } from "react";
import { connect } from "react-redux";
import CustomBoost from "../components/Boost";
import { fetchBoosts } from "../actions/MarketActions";

class CustomBoostContainer extends Component {
  render() {
    return <CustomBoost {...this.props} />;
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
)(CustomBoostContainer);
