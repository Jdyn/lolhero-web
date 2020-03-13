import React from 'react';
import { ListOrder, OrderList } from '../../../../store/account/types';
import styles from './styles.module.css';

interface Props {
  orders: OrderList;
  filterUpdated: Function;
  filter: string;
}

const DashboardFilter: React.FC<Props> = (props: Props): JSX.Element => {
  const { orders, filterUpdated, filter } = props;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {Object.keys(orders).map(orderKey => {
          const order: ListOrder = orders[orderKey];

          return (
            <button
              type="button"
              key={orderKey}
              className={`${styles.filter} ${filter === orderKey ? styles.selected : ''}`}
              onClick={(): void => filterUpdated({ filter: orderKey })}
            >
              <h3>{order.title}</h3>
              <span>{order.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardFilter;
