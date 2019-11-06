import React from 'react';
import Layout from '../../components/reusable/Layout';
import withAuth from '../../lib/withAuth';
import OrderContainer from '../../containers/OrderContainer';
import { fetchAccountOrder } from '../../store/account/actions';

interface Props {
  trackingId: string;
}

class Order extends React.PureComponent<Props> {
  public static async getInitialProps(ctx): Promise<object> {
    const {
      reduxStore: { dispatch, getState },
      query: { trackingId }
    } = ctx;

    await fetchAccountOrder(trackingId, ctx)(dispatch, getState);
    return { trackingId };
  }

  public render(): JSX.Element {
    const { trackingId } = this.props;
    return (
      <Layout>
        <OrderContainer requireAuth={false} trackingId={trackingId} />
      </Layout>
    );
  }
}

export default withAuth(Order);
