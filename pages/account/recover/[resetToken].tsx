import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/shared/Layout';
import ForgotAuth from '../../../components/Account/ForgotAuth';

const Forgot = (): JSX.Element => {
  const router = useRouter();
  const { resetToken } = router.query;

  return (
    <Layout stripe title="Forgot Password">
      <ForgotAuth resetToken={resetToken as string} />
    </Layout>
  );
};

export default Forgot;
