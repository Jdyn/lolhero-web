import React from 'react';
import Head from 'next/head';
import cookies from 'next-cookies';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { pageview } from '../../services/gtag';
import { fetchBoostPrices, updateOrder, submitOrder } from '../../store/boost/actions';
import { handleAuth } from '../../store/session/actions';
import { AppState } from '../../store';
import Boost from '../../components/Boost';
import boosts from '../../lib/boosts';
import withRedux from '../../util/withRedux';

const content = {
  title: 'Order Boost - LoL Boosting | lolhero.gg',
  desc:
    'Build your League Of Legends boost from the ground up with an immense amount of customization options to fit your goals'
};

const BoostContainer = (props): JSX.Element => {
  const router = useRouter();
  pageview(router.pathname);

  return (
    <>
      <Head>
        <title>{content.title}</title>
        <meta name="description" content={content.desc} />
        <meta property="og:description" content={content.desc} />
      </Head>
      <Boost {...props} />
    </>
  );
};

BoostContainer.getInitialProps = async (ctx): Promise<object> => {
  const {
    reduxStore: { dispatch },
    query: { type }
  } = ctx;

  const { token } = cookies(ctx);

  let match = null;

  Object.keys(boosts).forEach(key => {
    boosts[key].items.forEach(item => {
      if (item.type === type) {
        match = item;
      }
    });
  });

  if (typeof match === 'object' && match !== null) {
    dispatch(
      updateOrder({
        collectionId: match.id,
        collectionName: match.title,
        boostType: match.tag
      })
    );
  }

  return { token };
};

const emptyPurchaseOrderRequest = { error: { errored: false, message: '' } };

const mapStateToProps = (state: AppState): object => ({
  session: state.session,
  purchaseOrderRequest: state.request.PURCHASE_ORDER || emptyPurchaseOrderRequest,
  currentOrder: state.boost.order.details,
  boost: state.boost
});

const mapDispatchToProps = dispatch => ({
  handleAuth: (type, form): void => dispatch(handleAuth(type, form)),
  fetchBoostPrices: (): void => dispatch(fetchBoostPrices()),
  updateOrder: (details, order): void => dispatch(updateOrder(details, order)),
  submitOrder: (): void => dispatch(submitOrder())
});


export default withRedux(connect(mapStateToProps, mapDispatchToProps)(BoostContainer));
