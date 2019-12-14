import React from 'react';
import styles from './styles.css';
import OrderHeader from './OrderHeader/OrderHeader';
import OrderDetails from './OrderDetails/OrderDetails';
import OrderStatus from './OrderStatus';
import { SessionState } from '../../store/session/types';
import { AccountState, Order } from '../../store/account/types';

interface Props {
  account: AccountState;
  session: SessionState;
  order?: Order;
}

const BoostOrder: React.FC<Props> = (props: Props): JSX.Element => {
  const { session, account, order } = props;

  return (
    <div className={styles.root}>
      {order || account.selectedOrder ? (
        <>
          <OrderHeader session={session} order={order || account.selectedOrder} />
          <OrderStatus order={order || account.selectedOrder} />
          <OrderDetails order={order || account.selectedOrder} />
        </>
      ) : (
        <div>Order does not exist</div>
      )}
    </div>
  );
};

export default BoostOrder;
