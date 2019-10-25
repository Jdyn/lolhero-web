import React from 'react';
import nextCookie from 'next-cookies';
import { NextPageContext } from 'next';
import Layout from '../../components/Shared/Layout';
import withAuth from '../../store/withAuth';
import Api from '../../services/api';
import OrderContainer from '../../containers/OrderContainer';

interface OrderResponse {
  ok: boolean;
  error?: string;
  result: {
    order?: object;
  };
}

interface Props {
  trackingId: string | string[];
  response: OrderResponse;
}

class Order extends React.PureComponent<Props> {
  public static async getInitialProps(ctx: NextPageContext): Promise<Props> {
    const { token } = nextCookie(ctx);
    const { trackingId } = ctx.query;

    const response: OrderResponse = await Api.fetch(
      `/account/order/${trackingId}`,
      {},
      { Authorization: `bearer ${token}` }
    );

    if (response.ok) {
      return { trackingId, response };
    }

    return { trackingId, response };
  }

  public render(): JSX.Element {
    return (
      <Layout>
        <OrderContainer />
      </Layout>
    );
  }
}

export default withAuth(Order);
