import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { connect, useDispatch } from 'react-redux';
import Header from '../../Header';
import Footer from '../../Footer';
import { handleAuth, authenticate } from '../../../store/session/actions';
import styles from './index.module.css';
import { SessionState } from '../../../store/session/types';
import { AppState } from '../../../store';
import { Request } from '../../../store/request/types';
import { orderUpdated } from '../../../store/account/reducers';
import { UpdateOrder } from '../../../store/boost/types';
import { pageview } from '../../../services/gtag';
import withRedux from '../../../util/withRedux';

interface Props {
  children?: React.ReactNode;
  session?: SessionState;
  handleAuth?: (type: string, form: object) => void;
  updateOrder?: UpdateOrder;
  sessionRequest?: Request;
  title?: string;
  description?: string;
  stripe?: boolean;
}

const Layout = (props: Props): JSX.Element => {
  const {
    children,
    session,
    handleAuth,
    sessionRequest,
    title,
    description,
    updateOrder,
    stripe
  } = props;

  const router = useRouter();
  const dispatch = useDispatch();
  const { pathname } = router;
  pageview(pathname);

  useEffect(() => {
    if (session.user.token) {
      dispatch(authenticate());
    } else {
      const payload = {
        type: 'session/REFRESH',
        isLoggedIn: false,
        user: null
      };

      dispatch(payload);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{`${title} - LoL Boosting | lolhero.gg`}</title>
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
      </Head>
      <Header
        session={session}
        handleAuth={handleAuth}
        sessionRequest={sessionRequest}
        updateOrder={updateOrder}
      />
      {stripe && <div className={styles.stripe} />}
      {children}
      <Footer />
    </>
  );
};

const mapStateToProps = (state: AppState): object => ({
  sessionRequest: state.request.AUTHENTICATE || {},
  session: state.session
});

const mapDispatchToProps = dispatch => ({
  handleAuth: (type, form, redirect): void => dispatch(handleAuth(type, form, redirect)),
  updateOrder: (order): void => dispatch(orderUpdated({ order }))
});

export default withRedux(connect(mapStateToProps, mapDispatchToProps)(Layout));
