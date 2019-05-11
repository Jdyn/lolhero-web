import React from "react";
import { connect } from "react-redux";

class test extends React.Component {
  render() {
    return (
      <div>
        <span>Hello World</span>
      </div>
    );
  }
}

export default connect(state => state)(test);
