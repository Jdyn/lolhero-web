import React from 'react';
import BoostContainer from '../containers/BoostContainer';
import { fetchBoostPrices } from '../store/boost/actions';

class CustomBoost extends React.PureComponent {
  public static async getInitialProps(ctx): Promise<object> {
    const {
      store: { dispatch, getState }
    } = ctx;

    await fetchBoostPrices(ctx)(dispatch, getState);

    return {};
  }

  render(): JSX.Element {
    return <BoostContainer />;
  }
}

export default CustomBoost;
