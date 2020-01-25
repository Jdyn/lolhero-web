import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import Header from '../../Header';
import Footer from '../../Footer';
import { handleAuth } from '../../../store/session/actions';
import styles from './styles.module.css';
import { SessionState } from '../../../store/session/types';
import { AppState } from '../../../store';
import { Request } from '../../../store/request/types';
import { orderUpdated } from '../../../store/account/reducers';
import { UpdateOrder } from '../../../store/boost/types';
import { pageview } from '../../../services/gtag';
import { useRouter } from 'next/router';

interface Props {
  children?: React.ReactNode;
  session?: SessionState;
  authenticate?: (type: string, form: object) => void;
  updateOrder?: UpdateOrder;
  sessionRequest?: Request;
  title?: string;
  description?: string;
}

const Layout = (props: Props): JSX.Element => {
  const {
    children,
    session,
    authenticate,
    sessionRequest,
    title,
    description,
    updateOrder
  } = props;

  const router = useRouter();
  const { pathname } = router;
  pageview(pathname);

  return (
    <div className={styles.root}>
      <Head>
        <title>{title || 'LoL Elo Boosting Services'} - LoL Hero</title>
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
      </Head>
      <Header
        session={session}
        handleAuth={authenticate}
        sessionRequest={sessionRequest}
        updateOrder={updateOrder}
      />
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
  authenticate: (type, form): void => dispatch(handleAuth(type, form)),
  updateOrder: (order): void => dispatch(orderUpdated({ order }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
