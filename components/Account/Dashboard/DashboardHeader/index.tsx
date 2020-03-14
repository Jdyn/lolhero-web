import React from 'react';
import { SessionState } from '../../../../store/session/types';
import styles from './index.module.css';

interface Props {
  session: SessionState;
}

const DashboardHeader: React.FC<Props> = (props: Props): JSX.Element => {
  const { session } = props;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.portrait} />
        <h3 className={styles.username}>{session.user.username}</h3>
      </div>
    </div>
  );
};

export default DashboardHeader;
