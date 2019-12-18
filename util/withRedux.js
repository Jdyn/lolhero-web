import React from 'react';
import createStore from '../store';

const isServer = typeof window === 'undefined';
const NEXT_STORE = '__NEXT_REDUX_STORE__';

const initializeStore = initialState => {
  if (isServer) {
    return createStore(initialState);
  }

  if (!window[NEXT_STORE]) {
    window[NEXT_STORE] = createStore(initialState);
  }
  return window[NEXT_STORE];
};

export default App => {
  return class WithRedux extends React.Component {
    constructor(props) {
      super(props);

      this.reduxStore = initializeStore(props.initialReduxState);
    }

    static async getInitialProps(appContext) {
      const reduxStore = initializeStore();

      appContext.ctx.store = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      };
    }

    render() {
      return <App {...this.props} store={this.reduxStore} />;
    }
  };
};
