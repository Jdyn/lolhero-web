import React from "react";

class OrderSuccess extends React.Component {
  static async getInitialProps({query}) {
    console.log(query);

    return {}
  }

  render() {
    return <div>SUCCESS</div>;
  }
}

export default OrderSuccess;
