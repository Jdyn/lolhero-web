import React from 'react';
import { SessionState } from '../../../store/session/types';
import styles from './styles.css';

interface Props {
  session: SessionState;
  order: any;
}

const OrderHeader: React.FC<Props> = (props: Props): JSX.Element => {
  const { session, order } = props;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.portrait} />
        <h3 className={styles.wrapper}>
          {session.user.username}
          {order && (
            <div className={styles.content}>
              <div>
                {order.trackingId} <span>Tracking ID</span>
              </div>
              <div>
                {order.status} <span>Order Status</span>
              </div>
              <div>
                {order.details.server} <span>Server</span>
              </div>
              <div>
                {order.details.summonerName || 'Not Set'} <span>Summoner Name</span>
              </div>
            </div>
          )}
        </h3>
      </div>
    </div>
  );
};

export default OrderHeader;
