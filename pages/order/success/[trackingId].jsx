import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Reusable/Layout';

const OrderSuccess = props => {
  const router = useRouter();

  const { trackingId } = router.query;

  return (
    <Layout>
      <div>
        <h1>Thank you for your purchase.</h1>
        <h3>
          Your Tracking ID is <b>{trackingId || 'unknown'}</b>.
        </h3>
        <p>Please check the email associated with your order for further instructions.</p>
      </div>
    </Layout>
  );
};

export default OrderSuccess;
