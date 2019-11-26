import React from 'react';
import { connect } from 'react-redux';
import Dashboard from '../components/Account/Dashboard';
import { AccountState } from '../store/account/types';
import { SessionState } from '../store/session/types';
import { AppState } from '../store';

interface Props {
  account?: AccountState;
  session?: SessionState;
}

class DashboardContainer extends React.PureComponent<Props> {
  public render(): JSX.Element {
    const { session, account } = this.props;

    return <Dashboard session={session} account={account} />;
  }
}

const mapStateToProps = (state: AppState): Partial<AppState> => ({
  session: state.session,
  account: state.account
});

const mapDispatchToProps = (): object => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
