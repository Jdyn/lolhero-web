import React from 'react';
import { Provider } from 'react-redux';
import createStore from '../store';

let reduxStore;
const isServer = typeof window === 'undefined';

const initializeStore = (initialState = {}) => {
  if (isServer) {
    return createStore(initialState);
  }

  if (!reduxStore) {
    reduxStore = createStore(initialState);
  }

  return reduxStore;
};

export const withRedux = (PageComponent, { ssr = true } = {}) => {
  const WithRedux = ({ initialReduxState, ...props }) => {
    const store = initializeStore(initialReduxState);
    return (
      <Provider store={store}>
        <PageComponent {...props} />
      </Provider>
    );
  };

  if (process.env.NODE_ENV !== 'production') {
    WithRedux.displayName = `withRedux(${PageComponent.displayName ||
      PageComponent.name ||
      'Component'})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithRedux.getInitialProps = async context => {
      const reduxStore = initializeStore();

      // eslint-disable-next-line no-param-reassign
      context.reduxStore = reduxStore;

      const pageProps =
        typeof PageComponent.getInitialProps === 'function'
          ? await PageComponent.getInitialProps(context)
          : {};

      return {
        ...pageProps,
        initialReduxState: reduxStore.getState()
      };
    };
  }

  return WithRedux;
};

export default withRedux;
