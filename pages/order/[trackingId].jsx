import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../../components/reusable/Layout';
import OrderContainer from '../../containers/OrderContainer';
import OrderAuth from '../../components/reusable/OrderAuth';
import { fetchOrder } from '../../store/account/actions';

const TrackOrder = props => {
  const { store, orderRequest } = props;

  const router = useRouter();
  const [authorized, set] = useState(false);
  const { trackingId } = router.query;

  useEffect(() => {
    if (orderRequest && orderRequest.success) {
      set(true);
    }
  }, [orderRequest]);

  const onSubmit = (id, email) => {
    fetchOrder(id, email)(store.dispatch, store.getState);
  };

  return (
    <Layout>
      {authorized ? <OrderContainer /> : <OrderAuth onSubmit={onSubmit} trackingId={trackingId} />}
    </Layout>
  );
};

const mapState = state => ({
  orderRequest: state.request.FETCH_ORDER
});

export default connect(mapState, {})(TrackOrder);
