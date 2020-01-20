import React from 'react';
import cookies from 'next-cookies';
import Head from 'next/head';
import BoostContainer from '../../containers/BoostContainer';
import { updateOrder } from '../../store/boost/actions';
import boosts from '../../lib/boosts';

const Boost = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Custom Order - LoL Hero</title>
      </Head>
      <BoostContainer />
    </>
  );
};

Boost.getInitialProps = async (ctx): Promise<object> => {
  const {
    store: { dispatch },
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

export default Boost;
