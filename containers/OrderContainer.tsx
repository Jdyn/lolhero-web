import React from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { AppState } from '../store/root';
import { SessionState } from '../store/session/types';
import { AccountState } from '../store/account/types';
import { fetchOrder as getOrder } from '../store/account/actions';
import BoostOrder from '../components/Order';
import OrderAuth from '../components/reusable/OrderAuth';

interface Props {
  requireAuth?: boolean;
  session?: SessionState;
  account?: AccountState;
  fetchOrder?: (trackingId: string, email: string) => void;
}

const OrderContainer = (props: Props): JSX.Element => {
  const { requireAuth, account, session, fetchOrder } = props;

  const router = useRouter();
  const { trackingId } = router.query;

  const verifyOrder = (email: string): void => {
    fetchOrder(trackingId as string, email);
  };

  return requireAuth ? (
    <OrderAuth trackingId={trackingId as string} onSubmit={verifyOrder} />
  ) : (
    <BoostOrder account={account} session={session} />
  );
};

const mapState = (state: AppState): object => ({
  session: state.session,
  account: state.account
});

const mapDispatch = (dispatch): object => ({
  fetchOrder: (trackingId: string, email: string): void => dispatch(getOrder(trackingId, email))
});

export default connect(mapState, mapDispatch)(OrderContainer);
