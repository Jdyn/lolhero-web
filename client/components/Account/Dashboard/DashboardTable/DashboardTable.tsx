import React from 'react';
import Link from 'next/link';
import formatTime from '../../../../util/formatTime';
import { Orders } from '../../../../reducers/account/types';
import styles from './styles.css';

interface Props {
  orders: Orders;
  filter: string;
}

const DashboardTable: React.FC<Props> = (props: Props): JSX.Element => {
  const { orders, filter } = props;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span>tracking ID</span>
          <span>Service</span>
          <span>status</span>
          <span>Order Date</span>
        </div>
        {orders && (
          <div className={styles.grid}>
            {orders[filter].orders.map(order => (
              <Link
                key={order.trackingId}
                href={{
                  pathname: '/account/order',
                  query: { trackingId: order.trackingId }
                }}
                as={`/account/order/${order.trackingId}`}
              >
                <div
                  className={styles.gridItem}
                  key={order.trackingId}
                  // style={{
                  //   backgroundColor:
                  //     index % 2 === 0 ? theme.tertiary : theme.primary
                  // }}
                >
                  <span>{order.trackingId}</span>
                  <span>{order.title}</span>
                  <span>{order.status}</span>
                  <span>{formatTime(order.createdAt)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTable;
