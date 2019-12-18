import React from 'react';
import cookies from 'next-cookies';
import BoostContainer from '../containers/BoostContainer';
import { fetchBoostPrices } from '../store/boost/actions';

class CustomBoost extends React.PureComponent {
  public static async getInitialProps(ctx): Promise<object> {
    const {
      store: { dispatch, getState }
    } = ctx;

    const { token } = cookies(ctx);

    await fetchBoostPrices(ctx)(dispatch, getState);

    return { token };
  }

  render(): JSX.Element {
    return <BoostContainer />;
  }
}

export default CustomBoost;
