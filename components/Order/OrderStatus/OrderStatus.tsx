import React from 'react';
import styles from './styles.module.css';
import Button from '../../shared/Button/Button';
import { Order } from '../../../store/account/types';
import Loader from '../../shared/Loader';

interface Props {
  children?: React.ReactNode;
  onInitializeOrder: () => void;
  updateOrderStatus?: (status: string, trackingId: string, email?: string) => void;
  authEmail?: string;
  order: Order;
}

const OrderStatus: React.FC<Props> = (props: Props): JSX.Element => {
  const { order, onInitializeOrder, updateOrderStatus, authEmail } = props;

  const onPauseOrder = (event: React.MouseEvent): void => {
    event.preventDefault();
    if (order.status !== 'completed') {
      const newStatus = order.status === 'paused' ? 'active' : 'paused';
      updateOrderStatus(newStatus, order.trackingId, authEmail);
    }
  };

  // const onEditOrder = () => {};

  const orderStatus = (status: string): JSX.Element => {
    switch (status) {
      case 'open':
        return (
          <>
            <h3>Waiting for order setup...</h3>
            <span>Complete your order details to begin the order!</span>
          </>
        );
      case 'initialized':
      case 'active':
        if (order.booster) {
          return (
            <>
              <h3>Your order is currently in progress!</h3>
              <span>
                Your current hero is <b>{order.booster.username}</b>
              </span>
            </>
          );
        }
        return (
          <>
            <h3>We are currently looking for a hero!</h3>
            <span>Hold tight! this will not take long.</span>
          </>
        );
      case 'paused':
        return (
          <>
            <h3>Your order is currently paused!</h3>
            <span>We will not continue while your order is paused.</span>
          </>
        );
      case 'completed':
        return (
          <>
            <h3>Your order is complete!</h3>
            <span>Thank you for choosing LoL Hero.</span>
          </>
        );
      default:
        return (
          <>
            <h3>Ooops, we cannot determine the status of your order.</h3>
            <span>If you are seeing this please contact support!</span>;
          </>
        );
    }
  };

  return (
    <div className={styles.root}>
      {order && (
        <>
          <div className={styles.container}>
            <Loader width="64px" height="64px" />
            <div className={styles.status}>{orderStatus(order?.status)}</div>
          </div>
          {order?.isEditable ? (
            <div className={styles.wrapper}>
              <Button grow maxWidth="200px" margin="5px" padding="15px" onClick={onInitializeOrder}>
                start order
              </Button>
            </div>
          ) : (
            <div className={styles.wrapper}>
              {order?.status !== 'completed' && (
                <Button
                  grow
                  green
                  maxWidth="200px"
                  onClick={onPauseOrder}
                  margin="10px 5px"
                  padding="15px"
                >
                  {order?.status === 'paused' ? 'unpause order' : 'pause order'}
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderStatus;
