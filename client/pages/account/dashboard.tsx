import React from 'react';
import DashboardContainer from '../../containers/DashboardContainer';
import Layout from '../../components/Shared/Layout';
import withAuth from '../../store/withAuth';

const Dashboard = props => {
  return (
    <Layout>
      <DashboardContainer />
    </Layout>
  );
};

export default withAuth(Dashboard);
