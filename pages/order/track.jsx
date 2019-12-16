import React from 'react';
import Layout from '../../components/reusable/Layout';
import OrderAuth from '../../components/reusable/OrderAuth';

const TrackOrder = () => {
  return (
    <Layout>
      <OrderAuth fullAuth />
    </Layout>
  );
};

export default TrackOrder;
