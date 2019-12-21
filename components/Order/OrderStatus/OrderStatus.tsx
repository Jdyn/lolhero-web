import React from 'react';
import styles from './styles.css';
import Button from '../../Reusable/Button';
import { Order } from '../../../store/account/types';

interface Props {
  children?: React.ReactNode;
  onInitializeOrder: () => void;
  order: Order;
}

const OrderStatus: React.FC<Props> = (props: Props): JSX.Element => {
  const { order, onInitializeOrder } = props;

  // const onPauseOrder = () => {};

  // const onEditOrder = () => {};

  const orderStatus = (status: string): string => {
    switch (status) {
      case 'open':
        return 'Waiting for order setup...';
      case 'initialized':
        return 'Waiting for a booster...';
      default:
        return 'status';
    }
  };

  return (
    <div className={styles.root}>
      <h3 className={styles.status}>{orderStatus(order.status)}</h3>
      {order.isEditable ? (
        <div className={styles.wrapper}>
          <Button grow maxWidth="200px" margin="0px 5px" padding="15px" onClick={onInitializeOrder}>
            initialize order
          </Button>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <Button
            grow
            secondary
            maxWidth="200px"
            // onClick={onPauseOrder}
            margin="0px 5px"
            padding="15px"
          >
            Pause Order
          </Button>
          {/* <Button grow maxWidth="125px" margin="0px 5px" padding="15px">
            Edit Order
          </Button> */}
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
