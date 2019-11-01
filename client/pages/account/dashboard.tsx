import React from 'react';
import DashboardContainer from '../../containers/DashboardContainer';
import Layout from '../../components/reusable/Layout';
import withAuth from '../../lib/withAuth';

const Dashboard = props => {
  return (
    <Layout>
      <DashboardContainer />
    </Layout>
  );
};

export default withAuth(Dashboard);
