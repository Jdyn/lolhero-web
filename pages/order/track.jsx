import React from 'react';
import Layout from '../../components/Reusable/Layout';
import OrderAuth from '../../components/Reusable/OrderAuth';

const TrackOrder = () => {
  return (
    <Layout title="Track Order">
      <OrderAuth fullAuth />
    </Layout>
  );
};

export default TrackOrder;
