import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
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

interface Props {
  children?: React.ReactNode;
  session?: SessionState;
  handleAuth?: (type: string, form: object) => void;
  updateOrder?: UpdateOrder;
  sessionRequest?: Request;
  title?: string;
  description?: string;
}

const Layout = (props: Props): JSX.Element => {
  const { children, session, handleAuth, sessionRequest, title, description, updateOrder } = props;

  const router = useRouter();
  const { pathname } = router;
  pageview(pathname);

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

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
