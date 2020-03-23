import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import Layout from '../../../components/shared/Layout';
import withAuth from '../../../util/withAuth';
import { AppState } from '../../../store';
import { SessionState } from '../../../store/session/types';
import { AccountState } from '../../../store/account/types';
import { orderUpdated } from '../../../store/account/reducers';
import BoostOrder from '../../../components/Order';
import { UpdateOrder } from '../../../store/boost/types';
import { initializeOrder, updateOrderStatus, fetchOrder } from '../../../store/account/actions';

interface Props {
  session?: SessionState;
  account?: AccountState;
  updateOrder?: UpdateOrder;
  updateOrderStatus?: (status: string, trackingId: string, email?: string) => void;
  initializeOrder?: (payload: object, trackingId: string, email?: string) => void;
  fetchOrder?: (trackingId: string, email?: string) => void;
}

const OrderContainer = (props: Props): JSX.Element => {
  const { account, session, fetchOrder, updateOrder, initializeOrder } = props;
  const router = useRouter();
  const { trackingId } = router.query;

  return (
    <Layout stripe title={`Order ${trackingId}`}>
      <BoostOrder
        trackingId={trackingId as string}
        fetchOrder={fetchOrder}
        updateOrder={updateOrder}
        account={account}
        session={session}
        updateOrderStatus={updateOrderStatus}
        initializeOrder={initializeOrder}
      />
    </Layout>
  );
};

const mapState = (state: AppState): object => ({
  session: state.session,
  account: state.account
});

const mapDispatch = (dispatch): object => ({
  updateOrder: order => dispatch(orderUpdated({ order })),
  initializeOrder: (payload: object, trackingId: string, email?: string): void =>
    dispatch(initializeOrder(payload, trackingId, email)),
  fetchOrder: (trackingId: string, email?: string): void => dispatch(fetchOrder(trackingId, email)),
  updateOrderStatus: (newStatus: string, trackingId: string, email?: string): void =>
    dispatch(updateOrderStatus(newStatus, trackingId, email))
});

export default withAuth(connect(mapState, mapDispatch)(OrderContainer));
