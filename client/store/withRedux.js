import React from "react";
import initializeStore from ".";

const isServer = typeof window === "undefined";
const NEXT_STORE = "__NEXT_REDUX_STORE__";

const createStore = initialState => {
  if (isServer) {
    return initializeStore(initialState);
  }

  if (!window[NEXT_STORE]) {
    window[NEXT_STORE] = initializeStore(initialState);
  }
  return window[NEXT_STORE];
};

export default App => {
  return class WithRedux extends React.Component {
    constructor(props) {
      super(props);
      this.reduxStore = createStore(props.initialReduxState);
    }

    static async getInitialProps(appContext) {
      const reduxStore = createStore();

      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === "function") {
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
