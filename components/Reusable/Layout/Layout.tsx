import React from 'react';
import { connect } from 'react-redux';
import Header from '../../Header';
import Footer from '../../Footer';
import { handleAuth } from '../../../store/session/actions';
import styles from './styles.css';
import { SessionState } from '../../../store/session/types';
import { AppState } from '../../../store';
import { Request } from '../../../store/request/types';

interface Props {
  children?: React.ReactNode;
  session?: SessionState;
  authenticate?: (type: string, form: object) => void;
  sessionRequest?: Request;
}

const Layout = (props: Props): JSX.Element => {
  const { children, session, authenticate, sessionRequest } = props;

  return (
    <div className={styles.root}>
      <Header session={session} handleAuth={authenticate} sessionRequest={sessionRequest} />
      {children}
      <Footer />
    </div>
  );
};

const mapStateToProps = (state: AppState): object => ({
  sessionRequest: state.request.AUTHENTICATE || {},
  session: state.session
});

const mapDispatchToProps = dispatch => ({
  authenticate: (type, form): void => dispatch(handleAuth(type, form))
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
