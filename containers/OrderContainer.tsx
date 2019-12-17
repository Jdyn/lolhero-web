import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { SessionState } from '../store/session/types';
import { AccountState, Order } from '../store/account/types';
import { orderUpdated } from '../store/account/reducers';
import BoostOrder from '../components/Order';
import { initializeOrder } from '../store/account/actions';

interface Props {
  session?: SessionState;
  account?: AccountState;
  updateOrder?: (order: object | null) => void;
  initializeOrder?: (payload: object, trackingId: string) => void;
  order?: Order;
}

const OrderContainer = (props: Props): JSX.Element => {
  const { account, session, order, initializeOrder } = props;

  return (
    <BoostOrder
      account={account}
      session={session}
      order={order}
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
  initializeOrder: (payload: object, trackingId: string): void =>
    dispatch(initializeOrder(payload, trackingId))
});

export default connect(mapState, mapDispatch)(OrderContainer);
