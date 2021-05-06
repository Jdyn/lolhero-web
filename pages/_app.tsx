import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useDispatch } from 'react-redux';
import cookies from 'js-cookie';
import ReactGA from 'react-ga';
import { authenticate } from '../store/session/actions';
import SEO from '../components/shared/SEO';
import { wrapper } from '../store';

import '../public/static/styles/global.css';
import '../public/static/styles/braintree.css';

((): void => {
  ReactGA.initialize('UA-135635293-2');
  ReactGA.pageview('/');
})();

interface Props {
  pageProps: Record<string, unknown>;
  Component: NextPage;
}

const Application = (props: Props): JSX.Element => {
  const { Component, pageProps } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const token = cookies.get('token');

    if (token) {
      dispatch(authenticate());
    } else {
      const payload = {
        type: 'session/REFRESH',
        isLoggedIn: false,
        user: null
      };

      dispatch(payload);
    }
  }, [dispatch]);

  return (
    <>
      <SEO />
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(Application);
