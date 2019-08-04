import React, { Component } from "react";
import { connect } from "react-redux";
import Account from "../components/Account";

class BoostContainer extends Component {
  static async getInitialProps({ req }) {
    // Inherit standard props from the Page (i.e. with session data)
    let props = await super.getInitialProps({ req });
    console.log(props, req)
    // If user is not signed in then redirect to access denied URL
    if (props) {
      this.props.url.push("/access-denied");
    }

    return props;
  }

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
