import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { AppState } from '../store/root';
import { SessionState } from '../store/session/types';
import { AccountState } from '../store/account/types';
import {
  fetchAccountOrder as getAccountOrder,
  fetchOrder as getOrder
} from '../store/account/actions';
import BoostOrder from '../components/Order';
import OrderAuth from '../components/reusable/OrderAuth';
import { Request } from '../store/request/types';

interface Props {
  requireAuth?: boolean;
  session?: SessionState;
  account?: AccountState;
  fetchAccountOrder?: (trackingId: string) => void;
  fetchOrder?: (trackingId: string, email: string) => void;
  orderRequest?: Request;
}

const OrderContainer = (props: Props): JSX.Element => {
  const { requireAuth, account, session, fetchAccountOrder, fetchOrder, orderRequest } = props;

  const router = useRouter();

  const { trackingId } = router.query;

  useEffect(() => {
    if (!requireAuth && session.isLoggedIn && trackingId) {
      fetchAccountOrder(trackingId as string);
    }
  }, [trackingId, requireAuth, session.isLoggedIn, fetchAccountOrder]);

  const verifyOrder = (email: string): void => {
    const id = trackingId as string;
    fetchOrder(id, email);
  };

  return requireAuth ? (
    <OrderAuth trackingId={trackingId as string} onSubmit={verifyOrder} />
  ) : (
    <>
      {orderRequest && !orderRequest.isPending && account.selectedOrder && (
        <BoostOrder
          account={account}
          session={session}
          fetchAccountOrder={fetchAccountOrder}
          order={account.selectedOrder}
          orderRequest={orderRequest}
        />
      )}
    </>
  );
};

const mapState = (state: AppState): object => ({
  session: state.session,
  account: state.account,
  orderRequest: state.request.FETCH_ACCOUNT_ORDER
});

const mapDispatch = (dispatch): object => ({
  fetchAccountOrder: (trackingId: string): void => dispatch(getAccountOrder(trackingId)),
  fetchOrder: (trackingId: string, email: string): void => dispatch(getOrder(trackingId, email))
});

export default connect(
  mapState,
  mapDispatch
)(OrderContainer);
