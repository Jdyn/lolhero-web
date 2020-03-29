import React from 'react';
import styles from './index.module.css';

interface Props {
  children?: React.ReactNode;
}

const OrderMatches: React.FC<Props> = (props: Props): JSX.Element => {
  return <div className={styles.root}>

  </div>;
};

export default OrderMatches;
