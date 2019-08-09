import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from '../store/withRedux';
import Baseline from '../components/Shared/Baseline';
import { ThemeProvider } from 'react-jss';
import theme from '../lib/theme';
import SEO from '../components/Shared/SEO';
import * as Sentry from '@sentry/browser';
import nextCookie from 'next-cookies';
import { authenticate } from '../actions/SessionActions';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://c0a74d302c7d426ab2870d252635b9ba@sentry.io/1499991'
  });
}

class Application extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = nextCookie(ctx);

    let pageProps = { token: token || null };

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    const style = document.getElementById('server-side-styles');

    const { pageProps, store } = this.props;
    
    if (pageProps.token) {
      authenticate(pageProps.token)(store.dispatch, store.getState);
    } else {
      store.dispatch({ type: 'REFRESH', update: { isLoggedIn: false, user: {} } });
    }

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
              <Component {...pageProps} {...this.state} />
            </Baseline>
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(Application);
