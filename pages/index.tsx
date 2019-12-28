import React from 'react';
import HomeContainer from '../containers/HomeContainer';
import Layout from '../components/Reusable/Layout';

const index = (): JSX.Element => {
  return (
    <Layout title="Home - Professional Boosting Services">
      <HomeContainer />
    </Layout>
  );
};

export default index;