import React from 'react';
import DashboardContainer from '../../containers/DashboardContainer';
import Layout from '../../components/Reusable/Layout';
import withAuth from '../../util/withAuth';
import { fetchAccountOrderList } from '../../store/account/actions';

class Dashboard extends React.PureComponent<{}> {
  public static async getInitialProps(ctx): Promise<object> {
    const {
      store: { dispatch, getState }
    } = ctx;

    await fetchAccountOrderList(ctx)(dispatch, getState);

    return {};
  }

  render(): JSX.Element {
    return (
      <Layout title="Dashboard">
        <DashboardContainer />
      </Layout>
    );
  }
}

export default withAuth(Dashboard);
