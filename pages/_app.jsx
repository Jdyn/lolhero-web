import React from 'react';
import App from 'next/app';
import cookies from 'next-cookies';
import * as Sentry from '@sentry/browser';
import { Provider } from 'react-redux';
import { authenticate } from '../store/session/actions';
import withRedux from '../util/withRedux';
import SEO from '../components/Reusable/SEO';
import '../public/static/styles/global.css';
import '../public/static/styles/braintree.css';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://c0a74d302c7d426ab2870d252635b9ba@sentry.io/1499991'
  });
}

class Application extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = cookies(ctx);

    let pageProps = { token };

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    const {
      pageProps: { token },
      store: { dispatch, getState }
    } = this.props;

    if (token) {
      authenticate(token)(dispatch, getState);
    } else {
      const payload = {
        type: 'session/REFRESH',
        isLoggedIn: false,
        user: null
      };

      dispatch(payload);
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
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <SEO />
        <Component {...pageProps} store={store} />
      </Provider>
    );
  }
}

export default withRedux(Application);
