import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/reusable/Layout';
import OrderAuth from '../../components/reusable/OrderAuth';

const TrackOrder = props => {
  const router = useRouter();
  const { trackingId, email } = router.query;

  return (
    <Layout>
      <OrderAuth trackingId={trackingId} email={email} />
    </Layout>
  );
};

export default TrackOrder;
