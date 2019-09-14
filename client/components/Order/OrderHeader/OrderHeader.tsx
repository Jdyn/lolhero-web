import React from 'react';
import { SessionState } from '../../../store';
import styles from './styles.css';

interface Props {
  session: SessionState;
  order: any;
}

const DashboardHeader: React.FC<Props> = (props: Props): JSX.Element => {
  const { session, order } = props;

  return (
    <div className={styles.root}>
      <div className={styles.portrait} />
      <h3 className={styles.container}>
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
  );
};

export default DashboardHeader;
