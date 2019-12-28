import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { SessionState } from '../store/session/types';
import { AccountState, Order } from '../store/account/types';
import { orderUpdated } from '../store/account/reducers';
import BoostOrder from '../components/Order';
import {
  initializeOrder as initialize,
  updateOrderStatus as updateStatus
} from '../store/account/actions';

interface Props {
  session?: SessionState;
  account?: AccountState;
  authEmail?: string;
  updateOrder?: (order: object | null) => void;
  updateOrderStatus?: (status: string, trackingId: string, email?: string) => void;
  initializeOrder?: (payload: object, trackingId: string, email?: string) => void;
}

const OrderContainer = (props: Props): JSX.Element => {
  const { account, session, initializeOrder, authEmail, updateOrder, updateOrderStatus } = props;

  useEffect(() => {
    return () => {
      updateOrder(null);
    };
  }, [updateOrder]);

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
  updateOrderStatus: (newStatus: string, trackingId: string, email?: string): void =>
    dispatch(updateStatus(newStatus, trackingId, email))
});

export default connect(mapState, mapDispatch)(OrderContainer);
