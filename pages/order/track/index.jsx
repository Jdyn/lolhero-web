import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Reusable/Layout';
import OrderAuth from '../../../components/Reusable/OrderAuth';

const Track = () => {
  const router = useRouter();

  const { email, trackingId } = router.query;

  return (
    <Layout title="Track Order">
      <OrderAuth fullAuth email={email} trackingId={trackingId} />
    </Layout>
  );
};

export default Track;
