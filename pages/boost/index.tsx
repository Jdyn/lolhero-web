import React from 'react';
import cookies from 'next-cookies';
import Head from 'next/head';
import BoostContainer from '../../containers/BoostContainer';
import { fetchBoostPrices, updateOrder } from '../../store/boost/actions';
import boosts from '../../lib/boosts';

interface Props {
  type?: string;
}

class CustomBoost extends React.Component<Props> {
  public static async getInitialProps(ctx): Promise<object> {
    const {
      store: { dispatch, getState },
      query: { type }
    } = ctx;

    const { token } = cookies(ctx);

    await fetchBoostPrices(ctx)(dispatch, getState);

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
  }

  render(): JSX.Element {
    return (
      <>
        <Head>
          <title>Custom Order - LoL Hero</title>
        </Head>
        <BoostContainer />
      </>
    );
  }
}

export default CustomBoost;
