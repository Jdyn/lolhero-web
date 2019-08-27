import React, { Component } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';

const auth = (ctx, opts) => {
  const { token } = nextCookie(ctx);
  const { requireAdmin } = opts;

  if (requireAdmin === true) {
    //TODO
  }
  /*
   * If `ctx.req` is available it means we are on the server.
   * Additionally if there's no token it means the user is not logged in.
   */
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    Router.push('/');
  }

  return token;
};

function withAuth(Child, opts = {}) {
  return class extends Component {
    static async getInitialProps(ctx) {
      const token = auth(ctx, opts);

      const componentProps = Child.getInitialProps && (await Child.getInitialProps(ctx));

      return { ...componentProps, token };
    }

    constructor(props) {
      super(props);

      this.syncLogout = this.syncLogout.bind(this);
    }

    componentDidMount() {
      window.addEventListener('storage', this.syncLogout);
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.syncLogout);
      window.localStorage.removeItem('logout');
    }

    syncLogout(event) {
      if (event.key === 'logout') {
        Router.push('/');
      }
    }

    render() {
      return <Child {...this.props} />;
    }
  };
}

export default withAuth;
