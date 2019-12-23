import React from 'react';
import Layout from '../../../components/Reusable/Layout';
import withAuth from '../../../util/withAuth';
import OrderContainer from '../../../containers/OrderContainer';
import { fetchOrder } from '../../../store/account/actions';

interface Props {
  trackingId: string;
}

class Order extends React.PureComponent<Props> {
  public static async getInitialProps(ctx): Promise<object> {
    const {
      store: { dispatch, getState },
      query: { trackingId }
    } = ctx;

    await fetchOrder(trackingId, null, ctx)(dispatch, getState);

    return { trackingId };
  }

  public render(): JSX.Element {
    const { trackingId } = this.props;
    return (
      <Layout title={`Order ${trackingId}`}>
        <OrderContainer />
      </Layout>
    );
  }
}

export default withAuth(Order);
