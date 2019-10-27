import React from 'react';
import App from 'next/app';
import nextCookie from 'next-cookies';
import * as Sentry from '@sentry/browser';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-jss';
import { authenticate } from '../store/session/actions';
import withRedux from '../store/withRedux';
import Baseline from '../components/reusable/Baseline';
import theme from '../lib/theme';
import SEO from '../components/reusable/SEO';
import '../static/styles/empty.css';

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
    const { pageProps, store } = this.props;

    if (pageProps.token) {
      authenticate(pageProps.token)(store.dispatch, store.getState);
    } else {
      const payload = {
        type: 'session/REFRESH',
        isLoggedIn: false,
        user: null
      };

      store.dispatch(payload);
    }

    // function onTidioChatApiReady() {
    //   const { user } = store.getState().session;

    //   const metadata = {
    //     email: user.email,
    //     name: user.username,
    //     distinct_id: user.id
    //   };

    //   document.tidioIdentify = metadata;
    //   tidioChatApi.setVisitorData(metadata);
    // }

    // if (window.tidioChatApi) {
    //   setTimeout(() => {
    //     window.tidioChatApi.on('ready', onTidioChatApiReady);
    //   }, 10000);
    // } else {
    //   setTimeout(() => {
    //     document.addEventListener('tidioChat-ready', onTidioChatApiReady);
    //   }, 10000);
    // }

    const style = document.getElementById('server-side-styles');
    if (style) {
      style.parentNode.removeChild(style);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme.dark}>
          <Baseline>
            <SEO />
            <Component token={pageProps.token} />
          </Baseline>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withRedux(Application);
