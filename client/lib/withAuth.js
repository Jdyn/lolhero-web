import React from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';

const auth = ctx => {
  const { token } = nextCookie(ctx);

  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
  }

  // Client-side Check
  if (!token) {
    Router.push({ pathname: '/' });
  }

  return token;
};

function withAuth(Child) {
  return class extends React.Component {
    static async getInitialProps(ctx) {
      const token = auth(ctx);

      const componentProps = Child.getInitialProps && (await Child.getInitialProps(ctx));

      return { ...componentProps, token };
    }

    static syncLogout(event) {
      if (event.key === 'logout') {
        Router.push('/');
      }
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

    render() {
      return <Child {...this.props} />;
    }
  };
}

export default withAuth;
