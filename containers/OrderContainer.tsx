import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { SessionState } from '../store/session/types';
import { AccountState } from '../store/account/types';
import { orderUpdated } from '../store/account/reducers';
import BoostOrder from '../components/Order';
import { UpdateOrder } from '../store/boost/types';
import {
  initializeOrder as initialize,
  updateOrderStatus as updateStatus,
  fetchOrder
} from '../store/account/actions';

interface Props {
  session?: SessionState;
  account?: AccountState;
  authEmail?: string;
  updateOrder?: UpdateOrder;
  trackingId?: string;
  updateOrderStatus?: (status: string, trackingId: string, email?: string) => void;
  initializeOrder?: (payload: object, trackingId: string, email?: string) => void;
  getOrder?: (trackingId: string) => void;
}

const OrderContainer = (props: Props): JSX.Element => {
  const {
    account,
    session,
    initializeOrder,
    authEmail,
    updateOrder,
    updateOrderStatus,
    getOrder,
    trackingId
  } = props;

  useEffect(() => {
    getOrder(trackingId);
    return () => {
      updateOrder(null);
    };
  }, [getOrder, trackingId, updateOrder]);

  return (
    <BoostOrder
      account={account}
      session={session}
      authEmail={authEmail}
      updateOrderStatus={updateOrderStatus}
      initializeOrder={initializeOrder}
    />
  );
};

const mapState = (state: AppState): object => ({
  session: state.session,
  account: state.account
});

const mapDispatch = (dispatch): object => ({
  updateOrder: (order): void => dispatch(orderUpdated({ order })),
  initializeOrder: (payload: object, trackingId: string, email?: string): void =>
    dispatch(initialize(payload, trackingId, email)),
  getOrder: (trackingId: string): void => dispatch(fetchOrder(trackingId)),
  updateOrderStatus: (newStatus: string, trackingId: string, email?: string): void =>
    dispatch(updateStatus(newStatus, trackingId, email))
});

export default connect(mapState, mapDispatch)(OrderContainer);
