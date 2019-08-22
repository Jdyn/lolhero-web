import React from 'react';
import Layout from '../../components/Shared/Layout';
import OrderContainer from '../../containers/OrderContainer';

class Order extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <Layout>
        <OrderContainer></OrderContainer>
      </Layout>
    );
  }
}

export default Order;
