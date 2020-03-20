import React from 'react';
import styles from './index.module.css';
import { Order } from '../../../store/account/types';

interface Props {}

const OrderChat: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div className={styles.root}>
      <div className={styles.container}></div>
      <input />
    </div>
  );
};

export default OrderChat;
