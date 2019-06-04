import React, { Component } from "react";
import { connect } from "react-redux";
import CustomBoost from "../components/Boost";

class CustomBoostContainer extends Component {
  render() {
    return <CustomBoost {...this.props} />;
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomBoostContainer);
