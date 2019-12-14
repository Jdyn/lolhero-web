import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { SessionState } from '../store/session/types';
import { AccountState, Order } from '../store/account/types';
import { orderUpdated } from '../store/account/reducers';
import BoostOrder from '../components/Order';

interface Props {
  session?: SessionState;
  account?: AccountState;
  updateOrder?: (order: object | null) => void;
  order?: Order;
}

const OrderContainer = (props: Props): JSX.Element => {
  const { account, session, updateOrder, order } = props;

  useEffect(() => {
    return (): void => {
      updateOrder(null);
    };
  }, [updateOrder]);

  return <BoostOrder account={account} session={session} order={order} />;
};

const mapState = (state: AppState): object => ({
  session: state.session,
  account: state.account
});

const mapDispatch = (dispatch): object => ({
  updateOrder: (order): void => dispatch(orderUpdated({ order }))
});

export default connect(mapState, mapDispatch)(OrderContainer);
