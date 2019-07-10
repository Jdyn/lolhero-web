import React from "react";
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import withRedux from "../store/withRedux";
import Baseline from "../components/Shared/Baseline";
import { ThemeProvider } from "react-jss";
import theme from "../lib/theme";
import SEO from "../components/Shared/SEO";
import * as Sentry from "@sentry/browser";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://c0a74d302c7d426ab2870d252635b9ba@sentry.io/1499991"
  });
}

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
          <ThemeProvider theme={theme.dark}>
            <Baseline>
              <SEO />
              <Component {...pageProps} />
            </Baseline>
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(Application);
