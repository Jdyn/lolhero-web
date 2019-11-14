import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import Footer from './Footer';
import { handleAuth } from '../../store/session/actions';

const Layout = props => {
  const { children, session, handleAuth, sessionRequest } = props;

  return (
    <div
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
      <Header session={session} handleAuth={handleAuth} sessionRequest={sessionRequest} />
      {children}
      <Footer />
    </div>
  );
};

const mapStateToProps = state => ({
  sessionRequest: state.request.AUTHENTICATE || {},
  session: state.session
});

const mapDispatchToProps = dispatch => ({
  handleAuth: (type, form) => dispatch(handleAuth(type, form))
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
