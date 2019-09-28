import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import { createUseStyles } from 'react-jss';
import Header from './Header';
import Footer from './Footer';
import { handleAuth } from '../../store/actions/SessionActions';

const propTypes = {
  children: PropTypes.object.isRequired
};

const Layout = props => {
  const { children, session, handleAuth, sessionRequest } = props;

  const classes = useStyles(props);

  return (
    <div
      className={classes.root}
      style={{
        display: 'grid',
        gridTemplateRows: 'min-content 1fr min-content',
        gridTemplateColumns: '1fr',
        gridTemplateAreas: `
    'header'
    'component'
    'footer'
    `
      }}
    >
      {/* <Head>
        {process.env.NODE_ENV !== 'production' && (
          <link
            rel="stylesheet"
            type="text/css"
            href={'/_next/static/css/styles.chunk.css?v=' + Date.now()}
          />
        )}
      </Head> */}
      <Header session={session} handleAuth={handleAuth} sessionRequest={sessionRequest} />
      {children}
      <Footer />
    </div>
  );
};

Layout.propTypes = propTypes;

const useStyles = createUseStyles(theme => ({
  root: {
    // display: 'grid',
    // gridTemplateRows: 'min-content 1fr min-content',
    // gridTemplateColumns: '1fr',
    // gridTemplateAreas: `
    // 'header'
    // 'component'
    // 'footer'
    // `
  }
}));

const mapStateToProps = state => ({
  sessionRequest: state.request.AUTHENTICATE || {},
  session: state.session
});

const mapDispatchToProps = dispatch => ({
  handleAuth: (type, form) => dispatch(handleAuth(type, form))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
