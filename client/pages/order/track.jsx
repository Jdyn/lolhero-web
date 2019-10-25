import React from 'react';
import Layout from '../../components/Shared/Layout';
import OrderContainer from '../../containers/OrderContainer';

const TrackOrder = () => {
  return (
    <Layout>
      <OrderContainer requireAuth />
    </Layout>
  );
};

export default TrackOrder;
