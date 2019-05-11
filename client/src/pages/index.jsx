import React from "react";
import { connect } from "react-redux";
import Stripes from "../components/Stripes";

class test extends React.Component {
  render() {
    return (
      <div>
        <Stripes />
      </div>
    );
  }
}

export default connect(state => state)(test);
