import React from 'react';
import { SessionState } from '../../../store/session/types';
import styles from './styles.module.css';
import { formatTime } from '../../../util/helpers';
import { Order } from '../../../store/account/types';

interface Props {
  session: SessionState;
  order: Order;
}

const OrderHeader: React.FC<Props> = (props: Props): JSX.Element => {
  const { session, order } = props;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.portrait} />
        <div className={styles.wrapper}>
          {order && order.user.username}
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
