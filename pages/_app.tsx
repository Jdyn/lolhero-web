import React from 'react';
import App from 'next/app';
import cookies from 'next-cookies';
import { init } from '@sentry/browser';
import { Provider } from 'react-redux';
import { authenticate } from '../store/session/actions';
import withRedux from '../util/withRedux';
import SEO from '../components/Reusable/SEO';
import '../public/static/styles/global.css';
import '../public/static/styles/braintree.css';

if (process.env.IS_PROD) {
  init({
    dsn: 'https://c0a74d302c7d426ab2870d252635b9ba@sentry.io/1499991'
  });
}

interface Props {
  store: any;
  pageProps: any;
  token: string;
}

class Application extends App<Props> {
  static async getInitialProps({ Component, ctx }): Promise<any> {
    const { token } = cookies(ctx);

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { ...pageProps, token };
  }

  componentDidMount(): void {
    const { token, store } = this.props;

    if (token) {
      store.dispatch(authenticate());
    } else {
      const payload = {
        type: 'session/REFRESH',
        isLoggedIn: false,
        user: null
      };

      store.dispatch(payload);
    }
  }

  render(): JSX.Element {
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
