import React, { Component } from "react";
import { connect } from "react-redux";
import Home from "../components/Home";

class HomeContainer extends Component {
  render() {
    return <Home {...this.props} />;
  }
}

const mapStateToProps = state => ({
  sessionRequest: state.request.AUTHENTICATE || {}
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
