import React from 'react';
import { Order, Orders } from '../../../../store/reducers/account/types';
import styles from './styles.css';

interface Props {
  orders: Orders;
  setFilter: Function;
  filter: string;
}

const DashboardFilter: React.FC<Props> = (props: Props): JSX.Element => {
  const { orders, setFilter, filter } = props;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {Object.keys(orders).map(orderKey => {
          const order: Order = orders[orderKey];
          return (
            <button
              type="button"
              key={orderKey}
              className={`${styles.filter} ${filter === orderKey ? styles.selected : ''}`}
              onClick={(): void => setFilter(orderKey)}
            >
              <h3>{order.title || '...'}</h3>
              <span>{order.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardFilter;
