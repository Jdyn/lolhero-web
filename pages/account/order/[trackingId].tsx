import React from 'react';
import Layout from '../../../components/shared/Layout';
import withAuth from '../../../util/withAuth';
import OrderContainer from '../../../containers/OrderContainer';

interface Props {
  trackingId: string;
}

const Order = (props: Props): JSX.Element => {
  const { trackingId } = props;

  return (
    <Layout title={`Order ${trackingId}`}>
      <OrderContainer trackingId={trackingId} />
    </Layout>
  );
};

Order.getInitialProps = async (ctx): Promise<object> => {
  const {
    query: { trackingId }
  } = ctx;

  return { trackingId };
};

export default withAuth(Order);
