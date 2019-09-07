import React from 'react';
import { SessionState } from '../../../../reducers/session/types';
import styles from './styles.css';

interface Props {
  session: SessionState;
  order?: any;
}

const DashboardHeader: React.FC<Props> = (props: Props): JSX.Element => {
  const { session, order } = props;
  const {
    trackingId,
    status,
    details: { server, summonerName }
  } = order || {
    trackingId: null,
    status: null,
    details: { server: null, summonerName: null }
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.portrait} />
        <div className={styles.wrapper}>
          {session && <h3>{session.user.username}</h3>}
          {order && (
            <div className={styles.content}>
              <div>
                {trackingId} <span>Tracking ID</span>
              </div>
              <div>
                {status} <span>Order Status</span>
              </div>
              <div>
                {server} <span>Server</span>
              </div>
              <div>
                {summonerName || 'Not Set'} <span>Summoner Name</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
