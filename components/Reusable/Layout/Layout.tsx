import React from 'react';
import Head from 'next/head';
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
  title?: string;
  description?: string;
}

const Layout = (props: Props): JSX.Element => {
  const { children, session, authenticate, sessionRequest, title, description } = props;

  return (
    <div className={styles.root}>
      <Head>
        <title>{title || 'LOL ELO Boosting Services'} - LoLHero</title>
        <meta
          name="description"
          content={`${description || ''}Professional League Of Legends Ranked Boosting Services`}
        />
      </Head>
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
