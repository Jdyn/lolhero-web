import React from 'react';
import styles from './styles.css';

interface Props {
  orderForm: any;
  setOrderForm: (update: object) => void;
}

const OrderChat = (props: Props): JSX.Element => {
  const { orderForm, setOrderForm } = props;
  return (
    <div className={styles.root}>
      <h3>Champions</h3>
      <h3>{orderForm.details.primaryRole}</h3>
      <div className={styles.container}>
        {orderForm.champions.map(champion =>
          champion.position === orderForm.details.primaryRole ? <div>{champion.name}</div> : null
        )}
      </div>
      <h3>{orderForm.details.secondaryRole}</h3>
      <div className={styles.container}>
        {orderForm.champions.map(champion =>
          champion.position === orderForm.details.secondaryRole ? <div>{champion.name}</div> : null
        )}
      </div>
    </div>
  );
};

export default OrderChat;
