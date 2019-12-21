import React, { useState } from 'react';
import styles from './styles.css';
import OrderHeader from './OrderHeader/OrderHeader';
import OrderDetails from './OrderDetails/OrderDetails';
import OrderStatus from './OrderStatus';
import { SessionState } from '../../store/session/types';
import { AccountState, Order } from '../../store/account/types';
import OrderDisplay from './OrderDisplay';
import OrderChat from './OrderChat';

interface Props {
  account: AccountState;
  session: SessionState;
  order?: Order;
  initializeOrder: (payload: object, trackingId: string) => void;
}

const BoostOrder: React.FC<Props> = (props: Props): JSX.Element => {
  const { session, account, order, initializeOrder } = props;

  const [orderForm, setOrderForm] = useState({
    champions: [],
    note: '',
    details: {
      primaryRole: 'Middle',
      secondaryRole: 'Bottom',
      summonerName: ''
    },
    accountDetails: {
      username: '',
      password: ''
    }
  });

  console.log(orderForm);

  return (
    <div className={styles.root}>
      {order || account.selectedOrder ? (
        <>
          <OrderHeader session={session} order={order || account.selectedOrder} />
          <div className={styles.container}>
            <div className={styles.wrapper}>
              <OrderStatus order={order || account.selectedOrder} />
              <OrderDetails
                orderForm={orderForm}
                setOrderForm={setOrderForm}
                order={order || account.selectedOrder}
              />
              <OrderDisplay
                order={order || account.selectedOrder}
                orderForm={orderForm}
                setOrderForm={setOrderForm}
              />
              <OrderChat orderForm={orderForm} setOrderForm={setOrderForm} />
            </div>
          </div>
        </>
      ) : (
        <div>Order does not exist</div>
      )}
    </div>
  );
};

export default BoostOrder;
