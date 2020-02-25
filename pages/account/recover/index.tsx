import React from 'react';
import Layout from '../../../components/Reusable/Layout';
import ForgotAuth from '../../../components/Account/ForgotAuth';

class Forgot extends React.PureComponent<{}> {
  render(): JSX.Element {
    return (
      <Layout title="Forgot Password">
        <ForgotAuth />
      </Layout>
    );
  }
}

export default Forgot;
