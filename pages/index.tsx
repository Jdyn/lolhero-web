import React from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';
import Layout from '../components/shared/Layout';

const content = {
  title: 'Home - A Modern Boosting Experience',
  description:
    'LoLHero is a modern league of legends boosting service focused on providing the fastest delivery times on the market and the greatest user experience.'
};

const HomeContainer = (props): JSX.Element => {
  return (
    <Layout title={content.title} description={content.description}>
      <Home {...props} />
    </Layout>
  );
};

const mapStateToProps = state => ({
  sessionRequest: state.request.AUTHENTICATE || {}
});

export default HomeContainer;
