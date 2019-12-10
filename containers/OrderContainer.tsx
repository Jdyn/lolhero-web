import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { SessionState } from '../store/session/types';
import { AccountState } from '../store/account/types';
import BoostOrder from '../components/Order';

interface Props {
  session?: SessionState;
  account?: AccountState;
}

const OrderContainer = (props: Props): JSX.Element => {
  const { account, session } = props;

  return <BoostOrder account={account} session={session} />;
};

const mapState = (state: AppState): object => ({
  session: state.session,
  account: state.account
});

const mapDispatch = (dispatch): object => ({});

export default connect(mapState, mapDispatch)(OrderContainer);
