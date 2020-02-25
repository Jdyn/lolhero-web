import React from 'react';
import { useRouter } from 'next/router';
import cookies from 'next-cookies';
import Head from 'next/head';
import BoostContainer from '../../containers/BoostContainer';
import { updateOrder } from '../../store/boost/actions';
import boosts from '../../lib/boosts';
import { pageview } from '../../services/gtag';

const content = {
  title: 'Custom Order - LoL Boosting | lolhero.gg',
  desc:
    'Build your League Of Legends boost from the ground up with an immense amount of customization options to fit your goals'
};

const Boost = (): JSX.Element => {
  const router = useRouter();
  const { pathname } = router;
  pageview(pathname);

  return (
    <>
      <Head>
        <title>{content.title}</title>
        <meta name="description" content={content.desc} />
        <meta property="og:description" content={content.desc} />
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
