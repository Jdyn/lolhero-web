import React from 'react';
import styles from './styles.module.css';
import { formatTime } from '../../../util/helpers';
import { Order } from '../../../store/account/types';

interface Props {
  order: Order;
}

const OrderHeader: React.FC<Props> = (props: Props): JSX.Element => {
  const { order } = props;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.portrait} />
        <div className={styles.wrapper}>
          {order?.user && order?.user?.username}
          {order && (
            <div className={styles.content}>
              <div>
                {order.trackingId} <span>Tracking ID</span>
              </div>
              <div>
                {order.status} <span>Order Status</span>
              </div>
              <div>
                {formatTime(order.createdAt)} <span>Created</span>
              </div>
              <div>
                {order.details.summonerName || 'Not Set'} <span>Summoner Name</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;
