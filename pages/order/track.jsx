import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/reusable/Layout';
import OrderAuth from '../../components/reusable/OrderAuth';

const TrackOrder = props => {
  const router = useRouter();
  const { trackingId } = router.query;

  return <Layout>tracking</Layout>;
};

export default TrackOrder;
