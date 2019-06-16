import React from "react";
import HomeContainer from "../containers/HomeContainer";
import Layout from "../components/Shared/Layout";

class index extends React.Component {
  render() {
    return (
      <Layout>
        <HomeContainer />
      </Layout>
    );
  }
}

export default index;
