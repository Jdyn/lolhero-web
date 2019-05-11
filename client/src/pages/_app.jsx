import React from "react";
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import withRedux from "../store/withRedux";
import Layout from "../components/Layout";
import Baseline from "../components/Baseline";

class Application extends App {
  componentDidMount() {
    const style = document.getElementById("server-side-styles");

    if (style) {
      style.parentNode.removeChild(style);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Baseline>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Baseline>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(Application);
