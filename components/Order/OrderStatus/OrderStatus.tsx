import React from 'react';
import styles from './styles.css';

interface Props {
  children?: React.ReactNode;
}

const OrderStatus: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h3>ok</h3>
      </div>
    </div>
  );
};

export default OrderStatus;
