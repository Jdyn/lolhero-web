import React from 'react';
import App from 'next/app';
import cookies from 'next-cookies';
import { init } from '@sentry/browser';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import { authenticate } from '../store/session/actions';
import withRedux from '../util/withRedux';
import SEO from '../components/shared/SEO';
import '../public/static/styles/global.css';
import '../public/static/styles/braintree.css';

if (process.env.IS_PROD) {
  init({
    dsn: 'https://c0a74d302c7d426ab2870d252635b9ba@sentry.io/1499991'
  });
}

((): void => {
  ReactGA.initialize('UA-135635293-2');
  ReactGA.pageview('/');
})();

interface Props {
  store: any;
  pageProps: any;
  token: string;
}

class Application extends App<Props> {
  // componentDidMount(): void {
  //   const { reduxStore, pageProps } = this.props;
  //   console.log(this.props);
  //   if (pageProps.token) {
  //     reduxStore.dispatch(authenticate());
  //   } else {
  //     const payload = {
  //       type: 'session/REFRESH',
  //       isLoggedIn: false,
  //       user: null
  //     };

  //     reduxStore.dispatch(payload);
  //   }
  // }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <>
        <SEO />
        <Component {...pageProps} />
      </>
    );
  }
}

export default Application;
