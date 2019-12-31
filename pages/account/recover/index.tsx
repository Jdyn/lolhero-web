import React from 'react';
import Layout from '../../../components/Reusable/Layout';
import ForgotAuth from '../../../components/Account/ForgotAuth';

class Forgot extends React.PureComponent<{}> {
  // public static async getInitialProps(ctx): Promise<object> {
  //   const {
  //     store: { dispatch, getState }
  //   } = ctx;

  //   await fetchAccountOrderList(ctx)(dispatch, getState);

  //   return {};
  // }

  render(): JSX.Element {
    return (
      <Layout title="Forgot Password">
        <ForgotAuth />
      </Layout>
    );
  }
}

export default Forgot;
