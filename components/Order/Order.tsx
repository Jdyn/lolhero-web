import React from 'react';
import styles from './styles.css';
import OrderHeader from './OrderHeader/OrderHeader';
import OrderDetails from './OrderDetails/OrderDetails';
import OrderStatus from './OrderStatus';
import { SessionState } from '../../store/session/types';
import { AccountState } from '../../store/account/types';

interface Props {
  account: AccountState;
  session: SessionState;
}

const BoostOrder: React.FC<Props> = (props: Props): JSX.Element => {
  const { session, account } = props;

  return (
    <div className={styles.root}>
      {account.selectedOrder ? (
        <>
          <OrderHeader session={session} order={account.selectedOrder} />
          <OrderStatus order={account.selectedOrder} />
          <OrderDetails order={account.selectedOrder} />
        </>
      ) : (
        <div>Order does not exist</div>
      )}
    </div>
  );
};

export default BoostOrder;
