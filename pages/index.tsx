import React from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';
import Layout from '../components/Reusable/Layout';

const content = {
  title: 'Home - Professional Boosting Services',
  description:
    'LoLHero is the first modern league of legends boosting service that focuses on delivering advanced features and functionality while maintaing the highest level players.'
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

export default connect(mapStateToProps)(HomeContainer);
