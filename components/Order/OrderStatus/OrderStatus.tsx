import React from 'react';
import styles from './styles.css';
import Button from '../../reusable/Button';
import { Order } from '../../../store/account/types';

interface Props {
  children?: React.ReactNode;
  order: Order;
}

const OrderStatus: React.FC<Props> = (props: Props): JSX.Element => {
  const { order } = props;
  const onPauseOrder = () => {};

  const onEditOrder = () => {};

  const orderStatus = (status: string): string => {
    switch (status) {
      case 'open':
        return 'Waiting for a booster';
      default:
        return 'status';
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h3 className={styles.status}>{orderStatus(order.status)}</h3>
        <Button
          grow
          secondary
          maxWidth="125px"
          onClick={onPauseOrder}
          margin="0px 5px"
          padding="15px"
        >
          Pause Order
        </Button>
        <Button grow maxWidth="125px" onClick={onEditOrder} margin="0px 5px" padding="15px">
          Edit Order
        </Button>
      </div>
    </div>
  );
};

export default OrderStatus;
