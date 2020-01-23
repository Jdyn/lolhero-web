import React from 'react';
import HomeContainer from '../containers/HomeContainer';
import Layout from '../components/Reusable/Layout';

const content = {
  title: 'Home - Professional Boosting Services',
  description:
    'LoL Hero is a professional league boosting service who takes extreme care in delivering on the speed and performance promised with every boost.'
};

const index = (): JSX.Element => {
  return (
    <Layout title={content.title} description={content.description}>
      <HomeContainer />
    </Layout>
  );
};

export default index;
