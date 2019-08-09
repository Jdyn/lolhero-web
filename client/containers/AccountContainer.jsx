import React, { Component } from "react";
import { connect } from "react-redux";
import Account from "../components/Account";

class BoostContainer extends Component {
  render() {
    return <Account {...this.props} />;
  }
}

const mapStateToProps = state => ({
  session: state.session
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoostContainer);
