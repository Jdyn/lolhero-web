import React from 'react';
import Layout from '../../../components/Reusable/Layout';
import withAuth from '../../../util/withAuth';
import OrderContainer from '../../../containers/OrderContainer';
import { fetchOrder } from '../../../store/account/actions';

interface Props {
  trackingId: string;
}

const Order = (props: Props): JSX.Element => {
  const { trackingId } = props;

  return (
    <Layout title={`Order ${trackingId || ''}`}>
      <OrderContainer />
    </Layout>
  );
};

Order.getInitialProps = async (ctx): Promise<object> => {
  const {
    store: { dispatch },
    query: { trackingId }
  } = ctx;

  await dispatch(fetchOrder(trackingId, null, ctx));

  return { trackingId };
};

export default withAuth(Order);
