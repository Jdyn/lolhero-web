import React from 'react';
import { SessionState } from '../../../../store/reducers/session/types';
import styles from './styles.css';

interface Props {
  session: SessionState;
}

const DashboardHeader: React.FC<Props> = (props: Props): JSX.Element => {
  const { session } = props;

  return (
    <div className={styles.root}>
      <div className={styles.portrait} />
      <h3 className={styles.container}>{session.user.username}</h3>
    </div>
  );
};

export default DashboardHeader;
